'use client';
import React from 'react';
import Image from 'next/image';
import { ShoppingBag, Menu } from 'lucide-react';

const Header = () => {
  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleProductsClick = () => {
    window.location.href = '/products';
  };

  const handleAboutClick = () => {
    window.location.href = '/about';
  };

  const handleCategoriesClick = () => {
    window.location.href = '/categories';
  };

  return (
    <header className="bg-gradient-to-br from-sky-200 via-yellow-50 to-pink-100 backdrop-blur-md shadow-bubble sticky top-0 z-50 drop-shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleHomeClick}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center ring-2 ring-sky-100 shadow overflow-hidden drop-shadow-md relative">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain rounded-xl" />
            </div>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl text-header-brown leading-tight drop-shadow-md">
                Happy Beans <span className="hidden sm:inline">福豆</span>
              </h1>
              <span className="text-sm font-heading text-header-brown sm:hidden block leading-tight drop-shadow-md">福豆</span>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleHomeClick}
              className="font-heading text-nav-blue hover:text-nav-hover-yellow transition-all duration-300 text-lg font-semibold hover:scale-110 hover:drop-shadow-lg hover:ring-2 hover:ring-yellow-200 bg-transparent border-none cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={handleProductsClick}
              className="font-heading text-nav-blue hover:text-nav-hover-yellow transition-all duration-300 text-lg font-semibold hover:scale-110 hover:drop-shadow-lg hover:ring-2 hover:ring-yellow-200 bg-transparent border-none cursor-pointer"
            >
              Products
            </button>
            <button
              onClick={handleAboutClick}
              className="font-heading text-nav-blue hover:text-nav-hover-yellow transition-all duration-300 text-lg font-semibold hover:scale-110 hover:drop-shadow-lg hover:ring-2 hover:ring-yellow-200 bg-transparent border-none cursor-pointer"
            >
              About
            </button>
            <button
              onClick={handleCategoriesClick}
              className="font-heading text-nav-blue hover:text-nav-hover-yellow transition-all duration-300 text-lg font-semibold hover:scale-110 hover:drop-shadow-lg hover:ring-2 hover:ring-yellow-200 bg-transparent border-none cursor-pointer"
            >
              Categories
            </button>
            <a
              href="#contact"
              className="font-heading text-nav-blue hover:text-nav-hover-yellow transition-all duration-300 text-lg font-semibold hover:scale-110 hover:drop-shadow-lg hover:ring-2 hover:ring-yellow-200"
            >
              Contact
            </a>
            <button 
              onClick={handleProductsClick}
              className="font-heading bg-yellow-400 text-nav-blue font-bold py-3 px-8 rounded-full shadow-bubble hover:bg-yellow-300 hover:text-header-brown hover:shadow-bubble-hover transform transition-all duration-300 hover:scale-105 flex items-center space-x-2 text-lg drop-shadow-md"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-semibold">Shop</span>
            </button>
          </nav>

          {/* Actions (Mobile) */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-3 text-nav-blue hover:text-nav-hover-yellow transition-colors bg-white/70 rounded-full animate-pulse-gentle drop-shadow-md">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
