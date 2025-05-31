import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://your-ecommerce-domain.com'),
  title: {
    default: 'dPinus Shop',
    template: '%s | dPinus Shop'
  },
  description: 'Temukan berbagai produk berkualitas dengan harga terbaik. Belanja online aman, nyaman dan terpercaya dengan pengiriman cepat ke seluruh Indonesia.',
  keywords: ['e-commerce', 'belanja online', 'toko online', 'produk', 'shopping'],
  authors: [{ name: 'Your Company Name' }],
  creator: 'Your Company Name',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://your-ecommerce-domain.com',
    siteName: 'dPinus Shop',
    title: 'dPinus Shop - Belanja Online Terpercaya',
    description: 'Temukan berbagai produk berkualitas dengan harga terbaik. Belanja online aman, nyaman dan terpercaya dengan pengiriman cepat ke seluruh Indonesia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'dPinus Shop'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dPinus Shop',
    description: 'Temukan berbagai produk berkualitas dengan harga terbaik. Belanja online aman, nyaman dan terpercaya dengan pengiriman cepat ke seluruh Indonesia.',
    images: ['/og-image.jpg'],
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
        {children}
      </body>
    </html>
  );
}
