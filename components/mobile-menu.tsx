"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, BookOpen, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Docs", href: "/docs", icon: BookOpen },
    { name: "Chats", href: "/chat", icon: MessageSquare },
    { name: "GitHub", href: "https://github.com/fozagtx/x402-Solana", icon: null },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "group lg:hidden p-2 text-black hover:text-black/80 transition-colors",
            className
          )}
          aria-label="Open menu"
        >
          <Menu className="group-[[data-state=open]]:hidden" size={24} />
          <X className="hidden group-[[data-state=open]]:block" size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <div
          data-overlay="true"
          className="fixed z-30 inset-0 bg-black/50 backdrop-blur-sm"
        />

        <Dialog.Content
          onInteractOutside={(e) => {
            if (
              e.target instanceof HTMLElement &&
              e.target.dataset.overlay !== "true"
            ) {
              e.preventDefault();
            }
          }}
          className="fixed top-0 left-0 w-full z-40 py-20 sm:py-28 md:py-40"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <nav className="flex flex-col space-y-6 container mx-auto bg-white/95 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-6 shadow-xl shadow-gray-400/30">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 text-xl font-mono uppercase text-black transition-colors ease-out duration-150 hover:text-gray-700 py-2 font-semibold"
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {item.name}
                </Link>
              );
            })}

            <div className="mt-6 pt-6 border-t-2 border-gray-300">
              <Link
                href="/#sign-in"
                onClick={handleLinkClick}
                className="inline-block text-xl font-mono uppercase text-black transition-colors ease-out duration-150 hover:text-gray-700 py-2 font-semibold"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
