"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ChevronRight, ChevronDown, Search, User, ShoppingBag, MessageCircle, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  // Close mobile menu when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const mainNavItems = [
    {
      name: "Abos & Tickets",
      id: "tickets",
      submenu: [
        { name: "ZVV-App", href: "/app" },
        { name: "ZVV-Freizeit-App", href: "/freizeit-app" },
        { name: "ZVV-GreenBonus", href: "/green-bonus" },
        { name: "Kontaktformular", href: "/kontakt" },
        { name: "Kundencenter", href: "/kundencenter" },
      ],
    },
    {
      name: "Fahrplan & Informationen",
      id: "schedule",
      submenu: [
        { name: "Reisen mit Gehbehinderung", href: "/gehbehinderung" },
        { name: "Reisen mit Hörbehinderung", href: "/hoerbehinderung" },
        { name: "Reisen mit Sehbehinderung", href: "/sehbehinderung" },
        { name: "Stand Hindernisfreiheit", href: "/hindernisfreiheit" },
      ],
    },
    {
      name: "Freizeit & Events",
      id: "events",
      active: true,
      submenu: [
        { name: "Ausflugsziele", href: "/ausflugsziele" },
        { name: "Events", href: "/events" },
        { name: "Freizeittickets", href: "/freizeittickets" },
      ],
    },
    {
      name: "Service",
      id: "service",
      submenu: [
        { name: "Individuelle Fahrgastinfo", href: "/fahrgastinfo" },
        { name: "Infos für Neueinsteigende", href: "/neueinsteigende" },
        { name: "Linienfahrpläne", href: "/fahrplaene" },
        { name: "Schulangebote", href: "/schulangebote" },
      ],
    },
    {
      name: "Über uns",
      id: "about",
      submenu: [
        { name: "Organisation", href: "/organisation" },
        { name: "Geschichte", href: "/geschichte" },
        { name: "Karriere", href: "/karriere" },
      ],
    },
  ]

  const toggleSubmenu = (id: string) => {
    if (openSubmenu === id) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(id)
    }
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[85%] max-w-md bg-white z-50 shadow-xl transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="text-lg font-medium">Menu</div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          {/* Utility buttons */}
          <div className="grid grid-cols-2 gap-2 p-4 border-b">
            <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <Search size={18} />
              <span>Suche</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <User size={18} />
              <span>Konto</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <ShoppingBag size={18} />
              <span>Ticketshop</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <MessageCircle size={18} />
              <span>Kundendienst</span>
            </button>
          </div>

          {/* Language selector */}
          <div className="p-4 border-b">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <Globe size={18} />
              <span>Deutsch</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4">
              <ul className="space-y-2">
                {mainNavItems.map((item) => (
                  <li key={item.id} className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={cn(
                        "flex items-center justify-between w-full p-2 rounded-md",
                        openSubmenu === item.id || item.active ? "text-blue-600" : "text-gray-700",
                      )}
                    >
                      <span className="font-medium">{item.name}</span>
                      {openSubmenu === item.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>

                    {openSubmenu === item.id && (
                      <ul className="mt-2 ml-4 space-y-2">
                        {item.submenu?.map((subItem, idx) => (
                          <li key={idx}>
                            <Link
                              href={subItem.href}
                              className="block p-2 text-gray-600 hover:text-blue-600 transition-colors"
                              onClick={onClose}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="text-center">
              <p className="text-sm text-gray-600">Wir sind für Sie da!</p>
              <p className="text-xs text-gray-500">Täglich von 06:00 bis 22:00 Uhr</p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                onClick={onClose}
              >
                Zum ZVV-Contact
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
