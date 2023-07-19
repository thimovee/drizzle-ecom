import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Urbanist } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from '@/components/modal-provider'

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
      <html className={urban.className} lang="en">
        <body>
          <ModalProvider />
          <Navbar />
          <main className='min-h-screen'>{children}</main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
