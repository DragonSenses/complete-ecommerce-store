import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import './globals.css';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store',
  description: 'Ecommerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
