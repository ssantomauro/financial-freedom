import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'  // ← Make sure this line is here!
import { PostHogProvider } from '@/lib/posthog/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Financial Freedom - Smart Financial Calculators',
  description: 'Free financial calculators to help you make smarter decisions',
  icons: {
    icon: '/financial_freedom.ico',
  },
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
      </html>
  )
}