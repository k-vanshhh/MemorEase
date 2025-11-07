import { Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-white py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="font-semibold">MemorEase</span>
            </div>
            <p className="text-gray-400 text-sm">Making gifting thoughtful, affordable, and meaningful for everyone.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Explore
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Artists
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <a
              href="mailto:hello@memorease.com"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <Mail size={16} />
              hello@memorease.com
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 MemorEase. All rights reserved. Creating meaningful memories, one gift at a time.</p>
        </div>
      </div>
    </footer>
  )
}
