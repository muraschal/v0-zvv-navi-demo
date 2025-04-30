"use client"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface MegaMenuProps {
  activeMenu: string
  onClose: () => void
}

export default function MegaMenu({ activeMenu, onClose }: MegaMenuProps) {
  // Define menu content based on active menu
  const menuContent = {
    tickets: {
      columns: [
        {
          title: "Apps",
          items: [
            {
              title: "ZVV-App",
              href: "/app",
            },
            {
              title: "ZVV-Freizeit-App",
              href: "/freizeit-app",
            },
            {
              title: "ZVV-GreenBonus",
              href: "/green-bonus",
            },
          ],
          description: "Nützliche ZVV-Apps: Mobilität, Freizeit und Nachhaltigkeit in einer Hand.",
        },
        {
          title: "ZVV-Kundendienst",
          items: [
            {
              title: "Kontaktformular",
              href: "/kontakt",
            },
            {
              title: "Kundencenter",
              href: "/kundencenter",
            },
            {
              title: "Fundbüro",
              href: "/fundbuero",
            },
            {
              title: "Live Support",
              href: "/support",
            },
            {
              title: "Häufige Fragen",
              href: "/faq",
            },
          ],
          description: "Ihr Kontakt zum ZVV: Unterstützung und Infos zu Ihren Anliegen.",
        },
      ],
    },
    schedule: {
      columns: [
        {
          title: "Hindernisfreies Reisen",
          items: [
            {
              title: "Reisen mit Gehbehinderung",
              href: "/gehbehinderung",
            },
            {
              title: "Reisen mit Hörbehinderung",
              href: "/hoerbehinderung",
            },
            {
              title: "Reisen mit Sehbehinderung",
              href: "/sehbehinderung",
            },
            {
              title: "Stand Hindernisfreiheit",
              href: "/hindernisfreiheit",
            },
            {
              title: "Unterlagen",
              href: "/unterlagen",
            },
            {
              title: "Hindernisfreie Verbindungssuche",
              href: "/verbindungssuche",
            },
          ],
          description: "Unterstützung für Menschen mit besonderen Bedürfnissen.",
        },
        {
          title: "Ticketkauf",
          items: [
            {
              title: "Online Tickets",
              href: "/online-tickets",
            },
            {
              title: "Automaten",
              href: "/automaten",
            },
            {
              title: "Schalter",
              href: "/schalter",
            },
          ],
        },
      ],
    },
    events: {
      columns: [
        {
          title: "Freizeitangebote",
          items: [
            {
              title: "Ausflugsziele",
              href: "/ausflugsziele",
            },
            {
              title: "Events",
              href: "/events",
            },
            {
              title: "Freizeittickets",
              href: "/freizeittickets",
            },
          ],
        },
      ],
    },
    service: {
      columns: [
        {
          title: "Diverse Services",
          items: [
            {
              title: "Individuelle Fahrgastinfo",
              href: "/fahrgastinfo",
            },
            {
              title: "Infos für Neueinsteigende",
              href: "/neueinsteigende",
            },
            {
              title: "Linienfahrpläne",
              href: "/fahrplaene",
            },
            {
              title: "Schulangebote",
              href: "/schulangebote",
            },
            {
              title: "Kurs «mobil sein & bleiben»",
              href: "/mobil-bleiben",
            },
            {
              title: "Clever pendeln",
              href: "/pendeln",
            },
            {
              title: "Ombudsstelle",
              href: "/ombudsstelle",
            },
            {
              title: "Sicherheit im ZVV",
              href: "/sicherheit",
            },
            {
              title: "Ticketkontrolle",
              href: "/kontrolle",
            },
            {
              title: "Download",
              href: "/download",
            },
          ],
          description: "Verschiedene Services: Infos für Neueinsteiger, Fahrgastinfos und mehr.",
        },
      ],
    },
    about: {
      columns: [
        {
          title: "Über uns",
          items: [
            {
              title: "Organisation",
              href: "/organisation",
            },
            {
              title: "Geschichte",
              href: "/geschichte",
            },
            {
              title: "Karriere",
              href: "/karriere",
            },
          ],
        },
      ],
    },
  }

  const content = menuContent[activeMenu as keyof typeof menuContent]

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content?.columns.map((column, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="font-medium text-lg">{column.title}</h3>
                {column.description && <p className="text-sm text-gray-600">{column.description}</p>}
                <ul className="space-y-2">
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                        onClick={onClose}
                      >
                        <span>{item.title}</span>
                        <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="hidden lg:block w-1/4">
            <div className="rounded-lg overflow-hidden h-64 relative">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="ZVV Service Center"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-medium text-lg">Wir sind für Sie da!</h3>
                <p className="text-white/90 text-sm">
                  Täglich von 06:00 bis 22:00 Uhr. Ob allgemeine Fragen oder persönliche Beratung wir helfen Ihnen
                  weiter.
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center text-sm text-white hover:text-blue-200 transition-colors"
                >
                  Zum ZVV-Contact
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
