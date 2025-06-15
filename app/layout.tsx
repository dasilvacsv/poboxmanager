import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pobox Manager',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
