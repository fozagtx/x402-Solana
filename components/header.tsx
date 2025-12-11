import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { BookOpen, MessageSquare } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  const navItems = [
    { name: "Docs", href: "/docs", icon: BookOpen },
    { name: "Chats", href: "/chat", icon: MessageSquare },
    { name: "GitHub", href: "https://github.com/fozagtx/x402-Solana" },
  ];

  return (
    <div className="fixed z-50 top-6 left-1/2 -translate-x-1/2">
      {/* Floating Navbar */}
      <nav className="backdrop-blur-lg bg-white/95 border-2 border-gray-300 rounded-full px-6 py-3 shadow-xl shadow-gray-400/30 hover:shadow-2xl hover:shadow-gray-500/40 transition-all duration-300">
        <div className="flex items-center gap-8">
          {/* Solana Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://cryptologos.cc/logos/solana-sol-logo.svg"
              alt="Solana"
              width={32}
              height={32}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  className="flex items-center gap-2 uppercase font-mono text-black hover:text-gray-700 duration-150 transition-colors ease-out text-sm font-semibold"
                  href={item.href}
                  key={item.name}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.name}
                </Link>
              );
            })}

            {/* Sign In */}
            <Link
              className="uppercase transition-colors ease-out duration-150 font-mono text-black hover:text-gray-700 text-sm ml-2 pl-4 border-l border-gray-400 font-semibold"
              href="/#sign-in"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </div>
  );
};
