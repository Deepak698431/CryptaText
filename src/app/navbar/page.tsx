"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Common nav items
  const navItems = session
    ? [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Messages", href: "/messages" },
        { name: "Profile", href: "/profile" },
        { name: "Settings", href: "/setting-page" },
      ]
    : [
        { name: "Sign In", href: "/signin" },
        { name: "Sign Up", href: "/signup" },
      ];

  return (
    <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-lg border-b border-purple-600 shadow-neon">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-400 neon-glow">
          AI Messages
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6 items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3 py-2 rounded-lg transition-colors duration-300 neon-glow ${
                  pathname === item.href
                    ? "bg-purple-600 text-white"
                    : "text-indigo-300 hover:bg-purple-500/30 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* Logout button only when logged in */}
          {session && (
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-neon neon-glow transition duration-300"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      <style jsx>{`
        .neon-glow {
          box-shadow: 0 0 8px rgba(128, 0, 255, 0.7), 0 0 16px rgba(0, 255, 255, 0.5);
        }
        .shadow-neon {
          box-shadow: 0 0 10px rgba(128, 0, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </nav>
  );
}