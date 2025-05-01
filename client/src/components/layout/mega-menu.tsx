import React, { FC } from 'react';
import { Link } from 'wouter';

interface MegaMenuProps {
  menuId: string;
  isActive: boolean;
}

const MegaMenu: FC<MegaMenuProps> = ({ menuId, isActive }) => {
  if (menuId === 'purpose') {
    return (
      <div id="mega-menu-purpose" className={`mega-menu fixed top-[60px] left-0 w-full bg-gray-900 shadow-xl z-50 px-4 ${isActive ? 'active' : ''}`}>
        <div className="container mx-auto py-6">
          <div className="mb-4 text-secondary">
            <h2 className="text-lg font-semibold">Spark of Purpose</h2>
            <p className="text-gray-300 text-sm">See the story behind the mission — who we serve, what we solve, and why we exist.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Structure & Spirit
              </h3>
              <p className="text-gray-400 text-sm">Explore our roots — mission, vision, and values that shape our path and purpose daily.</p>
              <Link href="/about" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Strategic Spheres
              </h3>
              <p className="text-gray-400 text-sm">Focus areas that lead our efforts: health, education, ecocare, and data-led research.</p>
              <Link href="/about#strategic-spheres" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Served Communities
              </h3>
              <p className="text-gray-400 text-sm">We center rural women, children, farmers, and frontline workers in fragile settings.</p>
              <Link href="/about#served-communities" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Supansha Squad
              </h3>
              <p className="text-gray-400 text-sm">Meet the team behind the transformation — from core leadership to grassroots warriors.</p>
              <Link href="/about#team" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (menuId === 'impact') {
    return (
      <div id="mega-menu-impact" className={`mega-menu fixed top-[60px] left-0 w-full bg-gray-900 shadow-xl z-50 px-4 ${isActive ? 'active' : ''}`}>
        <div className="container mx-auto py-6">
          <div className="mb-4 text-secondary">
            <h2 className="text-lg font-semibold">Stories of Impact</h2>
            <p className="text-gray-300 text-sm">Real Lives. Real Work. Real Change. Explore how change unfolds across people and places.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Shared Moments</h3>
              <p className="text-gray-400 text-sm">Events that united communities — from awareness to workshops and cultural exchanges.</p>
              <Link href="/gallery?category=events" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Success Stories</h3>
              <p className="text-gray-400 text-sm">Discover journeys of grit and growth — each life touched tells a story of resilience.</p>
              <Link href="/blog?category=success-stories" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Scenes of Change</h3>
              <p className="text-gray-400 text-sm">A visual journal of impact — snapshots of action, energy, and transformation on ground.</p>
              <Link href="/gallery" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Social Thoughts</h3>
              <p className="text-gray-400 text-sm">Reflections and voices from the field — blogs by experts, doers, and rural change-makers.</p>
              <Link href="/blog" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (menuId === 'change') {
    return (
      <div id="mega-menu-change" className={`mega-menu fixed top-[60px] left-0 w-full bg-gray-900 shadow-xl z-50 px-4 ${isActive ? 'active' : ''}`}>
        <div className="container mx-auto py-6">
          <div className="mb-4 text-secondary">
            <h2 className="text-lg font-semibold">Stand for Change</h2>
            <p className="text-gray-300 text-sm">Support. Strengthen. Shop. Serve. Together, let's create lasting transformation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Support Causes</h3>
              <p className="text-gray-400 text-sm">Donate to uplift communities and fuel social change that creates long-term outcomes.</p>
              <Link href="/donate" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Strengthen Sustainability</h3>
              <p className="text-gray-400 text-sm">Fund key projects that empower change makers and foster growth in rural populations.</p>
              <Link href="/causes" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Shop with Purpose</h3>
              <p className="text-gray-400 text-sm">Buy unique products made by local hands — every purchase empowers lives and livelihoods.</p>
              <Link href="/shop" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Serve Socially</h3>
              <p className="text-gray-400 text-sm">Join our network to co-create change and expand opportunities across rural regions.</p>
              <Link href="/volunteer" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (menuId === 'future') {
    return (
      <div id="mega-menu-future" className={`mega-menu fixed top-[60px] left-0 w-full bg-gray-900 shadow-xl z-50 px-4 ${isActive ? 'active' : ''}`}>
        <div className="container mx-auto py-6">
          <div className="mb-4 text-secondary">
            <h2 className="text-lg font-semibold">Shape the Future</h2>
            <p className="text-gray-300 text-sm">Opportunities that empower — step into roles that shape communities and careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Seek Roles</h3>
              <p className="text-gray-400 text-sm">Explore jobs that help you use your talent for inclusive, lasting community development.</p>
              <Link href="/careers" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Strengthen Partnerships</h3>
              <p className="text-gray-400 text-sm">Access tenders to build strategic alliances and grow transformative change at every level.</p>
              <Link href="/partnerships" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Support Growth</h3>
              <p className="text-gray-400 text-sm">Take up internships to enhance your skills and grow into a leader with lasting impact.</p>
              <Link href="/internships" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-montserrat font-semibold mb-2 border-b border-gray-700 pb-1">Spark Dialogues</h3>
              <p className="text-gray-400 text-sm">Join forums where voices unite to create bold solutions for people, planet, and progress.</p>
              <Link href="/forums" className="text-secondary text-sm inline-block mt-2 hover:underline">Learn More →</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MegaMenu;
