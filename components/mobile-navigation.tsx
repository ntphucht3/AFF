"use client"

import { Home, CreditCard, DollarSign, Wallet } from "lucide-react"
import Link from "next/link"

interface NavbarLink {
  id: string
  title: string
  url: string
}

interface MobileNavigationProps {
  navbarLinks: NavbarLink[]
}

export default function MobileNavigation({ navbarLinks }: MobileNavigationProps) {
  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes("muadee") || lowerTitle.includes("thẻ")) {
      return <CreditCard className="w-5 h-5 mb-1" />
    }
    if (lowerTitle.includes("tnex")) {
      return <Wallet className="w-5 h-5 mb-1" />
    }
    if (lowerTitle.includes("cub") || lowerTitle.includes("fe")) {
      return <DollarSign className="w-5 h-5 mb-1" />
    }
    return <DollarSign className="w-5 h-5 mb-1" />
  }

  // Take first 3 navbar links for mobile bottom navigation
  const mobileLinks = navbarLinks.slice(0, 3)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 md:hidden z-50">
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        {/* Home Link */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center py-2 px-1 text-xs text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Home className="w-5 h-5 mb-1" />
          <span>Trang chủ</span>
        </Link>

        {/* Dynamic Links from Admin */}
        {mobileLinks.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="flex flex-col items-center justify-center py-2 px-1 text-xs text-gray-600 hover:text-blue-600 transition-colors"
          >
            {getIcon(link.title)}
            <span className="truncate w-full text-center">{link.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
