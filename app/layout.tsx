import type { Metadata } from "next";
import { Kalam } from "next/font/google";
import "./globals.css";
import './themify-icons.css'
import Navbar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";
import { SessionProvider } from "next-auth/react";
import Providers from "./ui/Providers";
import { Toaster } from "react-hot-toast";

const kalam = Kalam({ subsets: ['latin'], weight: ['300', '400', '700'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Super Chef',
    default: 'Super Chef'
  },
  description: "Full of delicious recipes",
  icons: {
    apple: {
      url: '/icons/apple-icon.png',
      type: 'image/png'
    },
    icon: [
      {
        url: '/icons/icon-92x92.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        url: '/icons/icon-512x512.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ]
  }
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: any
}>) {
  return (
      <html data-color-mode='light' lang="en">
        <body className={kalam.className}>
          <Providers params={params}>
            <Navbar />
          </Providers>
          <Toaster />
            {children}
            <Footer />
        </body>
      </html>

  );
}
