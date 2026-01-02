import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConsentBanner from "../components/ConsentBanner";
import AnalyticsProvider from "../components/AnalyticsProvider";
import DevOverrides from "../components/DevOverrides";
import { getValidLocale } from "@/lib/locale-utils";
import { t } from "@/lib/i18n";
import { getAnalyticsConfig } from "@/lib/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);
  
  // Default metadata for locale segment (homepage)
  return {
    title: t(validLocale, 'meta.pages.home.title'),
    description: t(validLocale, 'meta.pages.home.description'),
    icons: {
      icon: [
        { url: '/images/favicon/favicon.ico', sizes: 'any' },
        { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/images/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);
  
  // Check if analytics is enabled
  const analyticsConfig = getAnalyticsConfig();
  const isAnalyticsEnabled = analyticsConfig.enabled;
  
  return (
    <html lang={validLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DevOverrides />
        {isAnalyticsEnabled && <AnalyticsProvider />}
        <Header locale={validLocale} />
        {children}
        <Footer locale={validLocale} />
        {isAnalyticsEnabled && <ConsentBanner locale={validLocale} />}
      </body>
    </html>
  );
}

