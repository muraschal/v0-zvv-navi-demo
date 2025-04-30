"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { Search, Menu, ChevronDown, User, ShoppingBag, MessageCircle, Globe } from "lucide-react"
import MobileMenu from "./mobile-menu"
import MegaMenu from "./mega-menu"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainNavItems = [
    { name: "Abos & Tickets", href: "/tickets", id: "tickets" },
    { name: "Fahrplan & Informationen", href: "/schedule", id: "schedule" },
    { name: "Freizeit & Events", href: "/events", id: "events", active: true },
    { name: "Service", href: "/service", id: "service" },
    { name: "Über uns", href: "/about", id: "about" },
  ]

  const handleMegaMenuToggle = (id: string) => {
    if (activeMegaMenu === id) {
      setActiveMegaMenu(null)
    } else {
      setActiveMegaMenu(id)
    }
  }

  const closeMegaMenu = () => {
    setActiveMegaMenu(null)
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-3",
        )}
      >
        {/* Top utility bar */}
        <div className="hidden lg:block border-b border-gray-100">
          <div className="container mx-auto px-4 py-2 flex justify-end items-center gap-6">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <Search size={16} />
              <span>Suche</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <MessageCircle size={16} />
              <span>Kundendienst</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingBag size={16} />
              <span>Ticketshop</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <User size={16} />
              <span>Kundenkonto</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <Globe size={16} />
              <span>Deutsch</span>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 relative">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" stroke="#000" strokeWidth="5" />
                    <path d="M30 50L70 30M30 50L70 70" stroke="#000" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold">ZVV</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <ul className="flex space-x-1">
                {mainNavItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMegaMenuToggle(item.id)}
                      className={cn(
                        "px-4 py-2 rounded-md flex items-center gap-1 transition-colors",
                        activeMegaMenu === item.id ? "text-blue-600" : "text-gray-700 hover:text-blue-600",
                        item.active && "text-blue-600",
                      )}
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={cn("transition-transform", activeMegaMenu === item.id && "rotate-180")}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {activeMegaMenu && !isMobile && <MegaMenu activeMenu={activeMegaMenu} onClose={closeMegaMenu} />}
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Backdrop for mega menu */}
      {activeMegaMenu && !isMobile && <div className="fixed inset-0 bg-black/20 z-40" onClick={closeMegaMenu}></div>}

      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </>
  )
}
