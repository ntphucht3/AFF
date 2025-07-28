import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nền tảng Affiliate giúp bạn tìm kiếm, so sánh và lựa chọn thẻ tín dụng phù hợp",
  description: "Nơi bạn an tâm sở hữu thẻ tín dụng với nhu cầu mua sắm online, thanh toán quốc tế.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
