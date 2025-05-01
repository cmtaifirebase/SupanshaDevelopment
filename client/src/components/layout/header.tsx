import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import MegaMenu from './mega-menu';
import MobileMenu from './mobile-menu';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
    
    // If a menu is being opened, close the mobile menu if it's open
    if (activeMenu !== menuName && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // If mobile menu is being opened, close any active mega menu
    if (!mobileMenuOpen && activeMenu) {
      setActiveMenu(null);
    }
  };

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mega menu when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header ref={headerRef} className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/src/assets/logo.webp" alt="Supansha Development Foundation" className="h-10 mr-2" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="group relative" data-menu="purpose">
              <button 
                className={`nav-item flex items-center font-montserrat text-sm ${activeMenu === 'purpose' ? 'text-[#F14B05]' : ''}`}
                onClick={() => toggleMenu('purpose')}
                aria-expanded={activeMenu === 'purpose'}
                aria-controls="mega-menu-purpose"
              >
                Spark of Purpose
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${activeMenu === 'purpose' ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="group relative" data-menu="impact">
              <button 
                className={`nav-item flex items-center font-montserrat text-sm ${activeMenu === 'impact' ? 'text-[#F14B05]' : ''}`}
                onClick={() => toggleMenu('impact')}
                aria-expanded={activeMenu === 'impact'}
                aria-controls="mega-menu-impact"
              >
                Stories of Impact
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${activeMenu === 'impact' ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="group relative" data-menu="change">
              <button 
                className={`nav-item flex items-center font-montserrat text-sm ${activeMenu === 'change' ? 'text-[#F14B05]' : ''}`}
                onClick={() => toggleMenu('change')}
                aria-expanded={activeMenu === 'change'}
                aria-controls="mega-menu-change"
              >
                Stand for Change
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${activeMenu === 'change' ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="group relative" data-menu="future">
              <button 
                className={`nav-item flex items-center font-montserrat text-sm ${activeMenu === 'future' ? 'text-[#F14B05]' : ''}`}
                onClick={() => toggleMenu('future')}
                aria-expanded={activeMenu === 'future'}
                aria-controls="mega-menu-future"
              >
                Shape the Future
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${activeMenu === 'future' ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <Link href="/contact" className="nav-item font-montserrat text-sm">Contact Us</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/donate" className="bg-[#F14B05] hover:bg-[#F14B05]/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Donate Now</Link>
            <Link href="/volunteer" className="bg-[#E94E77] hover:bg-[#E94E77]/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Join Us</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white" 
            id="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={mobileMenuOpen} />
      </div>

      {/* Mega Menu Dropdowns */}
      <MegaMenu menuId="purpose" isActive={activeMenu === 'purpose'} />
      <MegaMenu menuId="impact" isActive={activeMenu === 'impact'} />
      <MegaMenu menuId="change" isActive={activeMenu === 'change'} />
      <MegaMenu menuId="future" isActive={activeMenu === 'future'} />
    </header>
  );
};

export default Header;
