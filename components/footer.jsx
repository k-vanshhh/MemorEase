import { Mail, Instagram, Twitter, Facebook } from "lucide-react"
import Link from "next/link"
import { ModernLogo } from "./modern-logo.jsx"

export default function Footer() {
  return (
    <footer id="contact" className="bg-background border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <ModernLogo size={32} />
              <span className="font-serif text-xl font-bold tracking-tight">MemorEase</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Connecting you with independent artists to create gifts that matter. Because the best stories are the ones we share.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Facebook} />
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-semibold mb-6 text-foreground">Discover</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/search" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link href="/artists" className="hover:text-primary transition-colors">Our Artists</Link></li>
              <li><Link href="/gift-guides" className="hover:text-primary transition-colors">Gift Guides</Link></li>
              <li><Link href="/collections" className="hover:text-primary transition-colors">Collections</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold mb-6 text-foreground">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Journal</Link></li>
              <li><Link href="/press" className="hover:text-primary transition-colors">Press</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-semibold mb-6 text-foreground">Get in touch</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <a href="mailto:hello@memorease.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail size={16} /> hello@memorease.com
                </a>
              </li>
              <li>123 Creative Avenue, <br />Design District, NY 10012</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 MemorEase Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon: Icon }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
      <Icon size={18} />
    </a>
  )
}
