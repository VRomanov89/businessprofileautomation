'use client';

import { MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/#features', label: 'Features', external: false },
    { href: '/pricing', label: 'Pricing', external: false },
    { href: '/contact', label: 'Contact', external: false },
  ];

  return (
    <header className={`container mx-auto px-6 py-8 ${className}`}>
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <MapPin className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
          <span className="text-2xl font-bold text-gray-900">BPA</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative font-medium transition-all duration-200 py-2 px-1
                ${
                  isActive(link.href)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }
                after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                after:bg-blue-600 after:transform after:scale-x-0 after:transition-transform
                after:duration-200 hover:after:scale-x-100
                ${isActive(link.href) ? 'after:scale-x-100' : ''}
              `}
            >
              {link.label}
            </Link>
          ))}
          
          <Link
            href="/auth/signin"
            className={`
              font-medium px-4 py-2 rounded-lg transition-all duration-200
              ${
                isActive('/auth/signin') || isActive('/dashboard')
                  ? 'bg-blue-700 text-white shadow-lg'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              }
            `}
          >
            {isActive('/dashboard') ? 'Dashboard' : 'Get Started'}
          </Link>
        </nav>

        {/* Mobile Menu Button - TODO: Implement mobile menu */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}