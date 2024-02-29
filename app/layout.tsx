import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/Toasts/toaster'

import NavBar from '../components/ui/Navbar/'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'untitled sample library',
  description: 'equanimous sample sharing. are.na for audio.',
}

export default ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="en">
    <body className={`${inter.className} px-16`}>
      <NavBar />
      {children}
      <Suspense>
        <Toaster />
      </Suspense>
    </body>
  </html>
)
