import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import NavBar from '@/components/organisms/NavBar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({children}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="bg-slate-100">
          <Providers>
            <NavBar />
            <main className="container mx-auto p-10 min-h-screen">
              {children}
            </main>
          </Providers>
      </body>
    </html>
  )
}
