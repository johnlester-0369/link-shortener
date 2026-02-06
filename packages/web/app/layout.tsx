
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'LinkShort - Free URL Shortener | Shorten Long Links Instantly',
  description:
    'Transform long URLs into short, shareable links instantly. Free, fast, and reliable URL shortener with custom link management. No signup required.',
  keywords: [
    'url shortener',
    'link shortener',
    'short link',
    'shorten url',
    'free url shortener',
    'link management',
    'custom short links',
  ],
  authors: [{ name: 'LinkShort' }],
  creator: 'LinkShort',
  publisher: 'LinkShort',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
