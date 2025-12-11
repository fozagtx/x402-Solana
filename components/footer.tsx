"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/fozagtx/x402-Solana", icon: Github },
  ];

  return (
    <footer className="relative z-10 py-12 sm:py-16 px-6 sm:px-10 lg:px-16 border-t border-black/10">
      <div className="max-w-6xl mx-auto">

      {/* Social Media Icons Section */}
        <div className="pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-mono uppercase text-xs sm:text-sm text-black font-semibold">Follow Us</h4>
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/60 border border-black/10 flex items-center justify-center text-black hover:text-black/80 hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs sm:text-sm text-black/80 text-center md:text-left">
            © {new Date().getFullYear()} x402Solana. All rights reserved.
          </p>
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-black/80">
            <Link href="/privacy" className="hover:text-black transition-colors">
              Privacy
            </Link>
            <span className="text-zinc-400/60">•</span>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms
            </Link>
            <span className="text-zinc-400/60">•</span>
            <Link href="/cookies" className="hover:text-black transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
