'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Sophie's Tours Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-night">Sophie's Tours</h1>
              <p className="text-sm text-secondary">Tours and Travels</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-night hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/tours" className="text-night hover:text-primary transition-colors">
              Reisen
            </Link>
            <Link href="/about" className="text-night hover:text-primary transition-colors">
              Über uns
            </Link>
            <Link href="/contact" className="text-night hover:text-primary transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-night block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-night block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-night block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                href="/" 
                className="text-night hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/tours" 
                className="text-night hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Reisen
              </Link>
              <Link 
                href="/about" 
                className="text-night hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Über uns
              </Link>
              <Link 
                href="/contact" 
                className="text-night hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;