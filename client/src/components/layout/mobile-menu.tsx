import React, { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [location] = useLocation();

  // Close mobile submenu when route changes
  useEffect(() => {
    setOpenSubmenu(null);
  }, [location]);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div 
      className={`lg:hidden absolute left-0 right-0 bg-black z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`} 
      id="mobile-menu"
    >
      <nav className="container mx-auto px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
        <Link href="/" className="block py-2 border-b border-gray-700 font-medium">Home</Link>
        
        <div className="border-b border-gray-700 pb-2">
          <button 
            className="flex justify-between items-center w-full py-2 text-left font-medium" 
            onClick={() => toggleSubmenu('purpose')}
            aria-expanded={openSubmenu === 'purpose'}
            aria-controls="mobile-purpose"
          >
            <span>Spark of Purpose</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform duration-300 ${openSubmenu === 'purpose' ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </button>
          <div 
            className={`pl-4 pt-2 space-y-2 text-sm text-gray-300 overflow-hidden transition-all duration-300 ${
              openSubmenu === 'purpose' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`} 
            id="mobile-purpose"
          >
            <div className="text-xs text-gray-400 mb-2">See the story behind the mission — who we serve, what we solve, and why we exist.</div>
            <Link href="/about" className="block py-1 hover:text-[#F14B05]">Structure & Spirit</Link>
            <Link href="/about#strategic-spheres" className="block py-1 hover:text-[#F14B05]">Strategic Spheres</Link>
            <Link href="/about#served-communities" className="block py-1 hover:text-[#F14B05]">Served Communities</Link>
            <Link href="/about#team" className="block py-1 hover:text-[#F14B05]">Supansha Squad</Link>
          </div>
        </div>
        
        <div className="border-b border-gray-700 pb-2">
          <button 
            className="flex justify-between items-center w-full py-2 text-left font-medium" 
            onClick={() => toggleSubmenu('impact')}
            aria-expanded={openSubmenu === 'impact'}
            aria-controls="mobile-impact"
          >
            <span>Stories of Impact</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform duration-300 ${openSubmenu === 'impact' ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </button>
          <div 
            className={`pl-4 pt-2 space-y-2 text-sm text-gray-300 overflow-hidden transition-all duration-300 ${
              openSubmenu === 'impact' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`} 
            id="mobile-impact"
          >
            <div className="text-xs text-gray-400 mb-2">Real Lives. Real Work. Real Change. Explore how change unfolds across people and places.</div>
            <Link href="/gallery?category=events" className="block py-1 hover:text-[#F14B05]">Shared Moments</Link>
            <Link href="/blog?category=success-stories" className="block py-1 hover:text-[#F14B05]">Success Stories</Link>
            <Link href="/gallery" className="block py-1 hover:text-[#F14B05]">Scenes of Change</Link>
            <Link href="/blog" className="block py-1 hover:text-[#F14B05]">Social Thoughts</Link>
          </div>
        </div>
        
        <div className="border-b border-gray-700 pb-2">
          <button 
            className="flex justify-between items-center w-full py-2 text-left font-medium" 
            onClick={() => toggleSubmenu('change')}
            aria-expanded={openSubmenu === 'change'}
            aria-controls="mobile-change"
          >
            <span>Stand for Change</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform duration-300 ${openSubmenu === 'change' ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </button>
          <div 
            className={`pl-4 pt-2 space-y-2 text-sm text-gray-300 overflow-hidden transition-all duration-300 ${
              openSubmenu === 'change' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`} 
            id="mobile-change"
          >
            <div className="text-xs text-gray-400 mb-2">Support. Strengthen. Shop. Serve. Together, let's create lasting transformation.</div>
            <Link href="/donate" className="block py-1 hover:text-[#F14B05]">Support Causes</Link>
            <Link href="/causes" className="block py-1 hover:text-[#F14B05]">Strengthen Sustainability</Link>
            <Link href="/shop" className="block py-1 hover:text-[#F14B05]">Shop with Purpose</Link>
            <Link href="/volunteer" className="block py-1 hover:text-[#F14B05]">Serve Socially</Link>
          </div>
        </div>
        
        <div className="border-b border-gray-700 pb-2">
          <button 
            className="flex justify-between items-center w-full py-2 text-left font-medium" 
            onClick={() => toggleSubmenu('future')}
            aria-expanded={openSubmenu === 'future'}
            aria-controls="mobile-future"
          >
            <span>Shape the Future</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform duration-300 ${openSubmenu === 'future' ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </button>
          <div 
            className={`pl-4 pt-2 space-y-2 text-sm text-gray-300 overflow-hidden transition-all duration-300 ${
              openSubmenu === 'future' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`} 
            id="mobile-future"
          >
            <div className="text-xs text-gray-400 mb-2">Opportunities that empower — step into roles that shape communities and careers.</div>
            <Link href="/careers" className="block py-1 hover:text-[#F14B05]">Seek Roles</Link>
            <Link href="/partnerships" className="block py-1 hover:text-[#F14B05]">Strengthen Partnerships</Link>
            <Link href="/internships" className="block py-1 hover:text-[#F14B05]">Support Growth</Link>
            <Link href="/forums" className="block py-1 hover:text-[#F14B05]">Spark Dialogues</Link>
          </div>
        </div>
        
        <Link href="/contact" className="block py-2 border-b border-gray-700 font-medium">Contact Us</Link>
        
        <div className="pt-4 flex flex-col space-y-3">
          <Link href="/donate" className="bg-[#F14B05] hover:bg-[#F14B05]/90 text-white text-center px-4 py-2 rounded-md text-sm font-medium transition-colors">Donate Now</Link>
          <Link href="/volunteer" className="bg-[#E94E77] hover:bg-[#E94E77]/90 text-white text-center px-4 py-2 rounded-md text-sm font-medium transition-colors">Join Us</Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
