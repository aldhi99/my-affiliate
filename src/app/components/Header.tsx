'use client'; 

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white mb-5 border-b border-border-color sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Image
              src="/logo.png"
              alt="dPinus Shop Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-full"
              priority
            />
            <span className="text-2xl font-bold text-foreground hover:text-primary-color transition-colors">
              dPinus Shop
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/produk" className="nav-link">
              Produk
            </Link>
            <Link href="/tentang-kami" className="nav-link">
              Tentang Kami
            </Link>
            <Link href="/kontak" className="nav-link">
              Kontak
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-hover-color transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6 text-foreground" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-color">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="nav-link px-4 py-2 hover:bg-hover-color rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/produk" 
                className="nav-link px-4 py-2 hover:bg-hover-color rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Produk
              </Link>
              <Link 
                href="/tentang-kami" 
                className="nav-link px-4 py-2 hover:bg-hover-color rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <Link 
                href="/kontak" 
                className="nav-link px-4 py-2 hover:bg-hover-color rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;