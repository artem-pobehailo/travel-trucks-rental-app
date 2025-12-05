import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'TravelTrucks - Camper Rental Service',
  description:
    'TravelTrucks is a modern camper rental platform with a full catalog, advanced filters, detailed camper pages, reviews, and a booking form.',
  keywords: [
    'truck',
    'traveltrucks',
    'camper rental',
    'campers catalog',
  ],
  authors: [
    {
      name: 'Travel Trucks',
      url: '', // <--  / сайт
    },
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'TravelTrucks - Camper Rental Service',
    description:
      'TravelTrucks is a modern camper rental platform with a full catalog, advanced filters, detailed camper pages, reviews, and a booking form.',
    url: '', // <-- заміни на робочий URL
    siteName: 'Travel Trucks',
    images: [
      {
        url: '/og-image.png', // <-- заміни на шлях до ог-зображення або абсолютний URL
        width: 1200,
        height: 630,
        alt: 'TravelTrucks - Camper Rental Serviceв',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
