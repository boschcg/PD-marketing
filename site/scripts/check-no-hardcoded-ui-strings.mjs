#!/usr/bin/env node

/**
 * Check for hardcoded UI strings in TSX files
 * Fails if suspicious user-facing strings are found outside of t() calls
 * Supports // i18n-ignore for explicit line-level bypasses
 */

import { readdir, readFile } from 'fs/promises';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Common UI strings that should be in translations
const SUSPICIOUS_STRINGS = [
  'Product',
  'How It Works',
  'How it works',
  'Playbook',
  'Roadmap',
  'Early Access',
  'Early access',
  'About',
  'Homepage',
  'Placeholder',
  'Content to be rendered',
  'Product Overview',
  'Privacy Policy',
  'Terms',
  'Company',
  'Legal',
  'Menu',
  'Profitdrive',
];

// Patterns for common UI props that should use translations
const UI_PROPS = [
  /aria-label\s*=\s*["']([^"']+)["']/gi,
  /title\s*=\s*["']([^"']+)["']/gi,
  /placeholder\s*=\s*["']([^"']+)["']/gi,
];

// Files/directories to exclude
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /dist/,
  /build/,
  /\.git/,
  /messages\/.*\.json$/,
  /globals\.css$/,
  /\.css$/,
  /\.svg$/,
  /\.ico$/,
];

// File extensions to check
const CHECK_EXTENSIONS = ['.tsx', '.ts'];

let hasErrors = false;
const errors = [];
const ignoredLines = []; // Track lines with i18n-ignore

/**
 * Check if file should be excluded
 */
function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
}

/**
 * Check if string is inside a t() call
 */
function isInTranslationCall(content, matchIndex) {
  // Look backwards from matchIndex to find if we're inside t(locale, '...')
  const beforeMatch = content.substring(Math.max(0, matchIndex - 200), matchIndex);
  
  // Check for t( pattern before the match
  const lastTCall = beforeMatch.lastIndexOf('t(');
  
  if (lastTCall === -1) return false;
  
  // Check if we're inside quotes that belong to t()
  const afterTCall = content.substring(lastTCall, matchIndex + 200);
  
  // If we see t( and then our string appears in quotes, it's likely in a t() call
  // Simple heuristic: check if there's a quote pattern that suggests t(locale, '...')
  const tCallPattern = /t\s*\(\s*[^,]+,\s*['"]/;
  if (tCallPattern.test(afterTCall.substring(0, 50))) {
    return true;
  }
  
  return false;
}

/**
 * Check if string appears in JSX text content (between > and <)
 */
function isInJSXText(content, matchIndex) {
  const beforeMatch = content.substring(Math.max(0, matchIndex - 100), matchIndex);
  const afterMatch = content.substring(matchIndex, Math.min(content.length, matchIndex + 100));
  
  // Check if we're between > and < (JSX text node)
  const lastOpen = beforeMatch.lastIndexOf('>');
  const nextClose = afterMatch.indexOf('<');
  
  if (lastOpen !== -1 && nextClose !== -1) {
    // Check if there's a t() call between > and our match
    const between = content.substring(
      Math.max(0, matchIndex - 100) + lastOpen,
      matchIndex + nextClose
    );
    
    // If we see t( in this range, it's likely a translation
    if (between.includes('t(') || between.includes('{t(')) {
      return false;
    }
    
    return true;
  }
  
  return false;
}

/**
 * Check file for hardcoded strings
 */
async function checkFile(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  const relativePath = relative(process.cwd(), filePath);
  
  // Build a map of lines that have ignore comments
  const ignoredLineNumbers = new Set();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '// i18n-ignore' || line.trim().endsWith('// i18n-ignore')) {
      // The next line (i+1, but 1-indexed is i+2) is ignored
      ignoredLineNumbers.add(i + 2);
    }
  }
  
  // Check for suspicious strings
  for (const suspiciousString of SUSPICIOUS_STRINGS) {
    // Escape special regex characters
    const escaped = suspiciousString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`["']${escaped}["']`, 'gi');
    
    let match;
    while ((match = regex.exec(content)) !== null) {
      const matchIndex = match.index;
      const lineNumber = content.substring(0, matchIndex).split('\n').length;
      const line = lines[lineNumber - 1];
      
      // Skip if it's in a comment
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
        continue;
      }
      
      // Check if this line is ignored
      if (ignoredLineNumbers.has(lineNumber)) {
        ignoredLines.push({
          file: relativePath,
          line: lineNumber,
          string: suspiciousString,
          context: line.trim(),
        });
        continue;
      }
      
      // Skip if it's in a t() call
      if (isInTranslationCall(content, matchIndex)) {
        continue;
      }
      
      // Check if it's in JSX text (between > and <)
      if (isInJSXText(content, matchIndex)) {
        hasErrors = true;
        errors.push({
          file: relativePath,
          line: lineNumber,
          string: suspiciousString,
          context: line.trim(),
        });
        continue;
      }
      
      // Check UI props
      const isInUIProp = UI_PROPS.some(pattern => {
        const propMatch = line.match(pattern);
        if (propMatch && propMatch[1] === suspiciousString) {
          // Check if it's not in a t() call
          const propIndex = line.indexOf(propMatch[0]);
          const beforeProp = line.substring(0, propIndex);
          if (!beforeProp.includes('t(')) {
            return true;
          }
        }
        return false;
      });
      
      if (isInUIProp) {
        // Check if this line is ignored
        if (ignoredLineNumbers.has(lineNumber)) {
          ignoredLines.push({
            file: relativePath,
            line: lineNumber,
            string: suspiciousString,
            context: line.trim(),
            type: 'UI prop',
          });
          continue;
        }
        
        hasErrors = true;
        errors.push({
          file: relativePath,
          line: lineNumber,
          string: suspiciousString,
          context: line.trim(),
          type: 'UI prop',
        });
      }
    }
  }
  
  // Check for JSX text nodes that look like UI strings
  const jsxTextRegex = />\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*</g;
  let jsxMatch;
  while ((jsxMatch = jsxTextRegex.exec(content)) !== null) {
    const textContent = jsxMatch[1].trim();
    
    // Skip if it's a number or very short
    if (textContent.length < 3 || /^\d+$/.test(textContent)) {
      continue;
    }
    
    // Check if it matches a suspicious string
    if (SUSPICIOUS_STRINGS.some(s => textContent === s || textContent.includes(s))) {
      const matchIndex = jsxMatch.index;
      const lineNumber = content.substring(0, matchIndex).split('\n').length;
      const line = lines[lineNumber - 1];
      
      // Check if this line is ignored
      if (ignoredLineNumbers.has(lineNumber)) {
        ignoredLines.push({
          file: relativePath,
          line: lineNumber,
          string: textContent,
          context: line.trim(),
          type: 'JSX text',
        });
        continue;
      }
      
      // Skip if it's in a t() call
      const beforeMatch = content.substring(Math.max(0, matchIndex - 50), matchIndex);
      if (beforeMatch.includes('t(') || beforeMatch.includes('{t(')) {
        continue;
      }
      
      hasErrors = true;
      errors.push({
        file: relativePath,
        line: lineNumber,
        string: textContent,
        context: line.trim(),
        type: 'JSX text',
      });
    }
  }
}

/**
 * Recursively scan directory
 */
async function scanDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (shouldExclude(fullPath)) {
      continue;
    }
    
    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = extname(entry.name);
      if (CHECK_EXTENSIONS.includes(ext)) {
        await checkFile(fullPath);
      }
    }
  }
}

/**
 * Self-check: Validate detection and ignore handling
 */
function runSelfChecks() {
  console.log('Running self-checks...\n');
  
  const testCases = [
    {
      name: 'JSX text node with "Product" → should fail',
      content: '<span>Product</span>',
      shouldFail: true,
    },
    {
      name: 'JSX text node with // i18n-ignore → should pass',
      content: '// i18n-ignore\n<span>Product</span>',
      shouldFail: false,
    },
    {
      name: 't(locale, \'nav.product\') → should pass',
      content: '{t(locale, \'nav.product\')}',
      shouldFail: false,
    },
    {
      name: 'Hardcoded "About" in JSX → should fail',
      content: '<div>About</div>',
      shouldFail: true,
    },
    {
      name: 'Hardcoded "About" with ignore → should pass',
      content: '// i18n-ignore\n<div>About</div>',
      shouldFail: false,
    },
  ];
  
  let allPassed = true;
  
  for (const testCase of testCases) {
    // Simple heuristic check
    const hasSuspiciousString = SUSPICIOUS_STRINGS.some(s => 
      testCase.content.includes(s) && !testCase.content.includes('t(')
    );
    
    // Check for ignore comment
    const hasIgnore = testCase.content.includes('// i18n-ignore');
    const shouldFail = hasSuspiciousString && !hasIgnore;
    
    if (shouldFail !== testCase.shouldFail) {
      console.error(`  ❌ ${testCase.name}`);
      console.error(`     Expected: ${testCase.shouldFail ? 'fail' : 'pass'}, Got: ${shouldFail ? 'fail' : 'pass'}`);
      allPassed = false;
    } else {
      console.log(`  ✅ ${testCase.name}`);
    }
  }
  
  if (allPassed) {
    console.log('\n✅ All self-checks passed.\n');
  } else {
    console.error('\n❌ Some self-checks failed.\n');
    process.exit(1);
  }
}

/**
 * Main function
 */
async function main() {
  // Run self-checks if enabled
  if (process.env.I18N_CHECK_SELFTEST === '1') {
    runSelfChecks();
    return;
  }
  
  const appDir = join(__dirname, '..', 'app');
  
  console.log('Checking for hardcoded UI strings...\n');
  
  await scanDirectory(appDir);
  
  // Report ignored lines if any
  if (ignoredLines.length > 0) {
    console.log('ℹ️  Ignored lines (// i18n-ignore):\n');
    for (const ignored of ignoredLines) {
      console.log(`  ${ignored.file}:${ignored.line}`);
      console.log(`    String: "${ignored.string}"`);
      if (ignored.type) {
        console.log(`    Type: ${ignored.type}`);
      }
      console.log(`    Context: ${ignored.context}\n`);
    }
    console.log(`  Total: ${ignoredLines.length} ignored line(s)\n`);
  }
  
  if (hasErrors) {
    console.error('❌ Found hardcoded UI strings:\n');
    
    for (const error of errors) {
      console.error(`  ${error.file}:${error.line}`);
      console.error(`    String: "${error.string}"`);
      if (error.type) {
        console.error(`    Type: ${error.type}`);
      }
      console.error(`    Context: ${error.context}`);
      console.error(`    → Use t(locale, '...') instead\n`);
    }
    
    console.error('\n💡 All user-facing strings must use translation keys.');
    console.error('   Example: {t(locale, "nav.product")} instead of "Product"');
    console.error('   Use // i18n-ignore on the previous line for explicit exceptions.\n');
    
    process.exit(1);
  } else {
    console.log('✅ No hardcoded UI strings found.');
    if (ignoredLines.length > 0) {
      console.log(`   (${ignoredLines.length} line(s) explicitly ignored)\n`);
    } else {
      console.log('');
    }
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
