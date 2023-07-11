import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Urbanist } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
const urban = Urbanist({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce Store',
  description: 'Ecommerce application built with Next.js, Drizzle and Stripe.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={urban.className}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
