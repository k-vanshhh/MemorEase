import { Lora, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "../lib/auth-context.jsx"
import "./globals.css"

const lora = Lora({ subsets: ["latin"], variable: "--font-serif" })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: "MemorEase - Personalized Gifts from Artists",
  description:
    "Discover, customize, and send meaningful personalized gifts created by independent artists and designers.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${lora.variable} antialiased bg-texture-paper`}>
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
