import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'

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
  // Generated icon replaces static favicon.ico for consistent branding
  icons: {
    icon: '/icon',
    apple: '/icon',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 
          next-themes ThemeProvider automatically injects a script that:
          1. Runs BEFORE React hydration (blocking script in <head>)
          2. Reads localStorage and applies theme class to <html>
          3. Prevents FOUC (Flash of Unstyled Content)
          
          Configuration:
          - attribute="class": Uses class attribute for Tailwind CSS compatibility
          - storageKey="theme": Matches your existing localStorage key
          - defaultTheme="system": Defaults to system preference (light/dark)
          - enableSystem: Enables system theme detection
        */}
        <ThemeProvider
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
