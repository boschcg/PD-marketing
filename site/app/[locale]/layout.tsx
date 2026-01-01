import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConsentBanner from "../components/ConsentBanner";
import AnalyticsProvider from "../components/AnalyticsProvider";
import { getValidLocale } from "@/lib/locale-utils";
import { t } from "@/lib/i18n";

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
  
  return (
    <html lang={validLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsProvider />
        <Header locale={validLocale} />
        {children}
        <Footer locale={validLocale} />
        <ConsentBanner locale={validLocale} />
      </body>
    </html>
  );
}

