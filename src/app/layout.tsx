import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dpinus.vercel.app'),
  title: {
    default: 'dPinus Shop',
    template: '%s | dPinus Shop'
  },
  description: 'Temukan berbagai produk berkualitas dengan harga terbaik. Belanja online aman, nyaman dan terpercaya dengan pengiriman cepat ke seluruh Indonesia.',
  keywords: ['e-commerce', 'belanja online', 'toko online', 'produk', 'shopping', 'dPinus Shop'],
  authors: [{ name: 'dPinus Shop' }],
  creator: 'dPinus Shop',
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/jpeg' },
      { url: '/logo.png', sizes: '16x16', type: 'image/jpeg' }
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/jpeg' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.png'
      }
    ]
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://dpinus.vercel.app',
    siteName: 'dPinus Shop',
    title: 'dPinus Shop - Belanja Online Terpercaya',
    description: 'Temukan berbagai produk berkualitas dengan harga terbaik. Belanja online aman, nyaman dan terpercaya dengan pengiriman cepat ke seluruh Indonesia.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'dPinus Shop Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dPinus Shop',
    description: 'Temukan berbagai produk berkualitas dengan harga terbaik. Belanja online aman, nyaman dan terpercaya dengan pengiriman cepat ke seluruh Indonesia.',
    images: ['/logo.png'],
    creator: '@dpinusshop'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
