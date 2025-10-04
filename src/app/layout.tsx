import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CouplePlan - カップル向けデートプランニングアプリ',
  description: 'AIが提案する、あなただけのデートプラン。カップルの絆を深める特別な体験を提供します。',
  keywords: ['カップル', 'デート', 'プラン', 'AI', '恋愛', '関係性'],
  authors: [{ name: 'CouplePlan Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ff6b6b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
