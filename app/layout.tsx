import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './react-datepicker.css';
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
      url: 'https://travel-trucks-rental-app-git-main-artem-pobehailos-projects.vercel.app/',
    },
  ],
  icons: {
    icon: '/TravelTrucks.png',
  },
  openGraph: {
    title: 'TravelTrucks - Camper Rental Service',
    description:
      'TravelTrucks is a modern camper rental platform with a full catalog, advanced filters, detailed camper pages, reviews, and a booking form.',
    url: 'https://travel-trucks-rental-app-git-main-artem-pobehailos-projects.vercel.app/',
    siteName: 'Travel Trucks',
    images: [
      {
        url: 'https://travel-trucks-rental-app-git-main-artem-pobehailos-projects.vercel.app/TravelTrucks.png',
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
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
