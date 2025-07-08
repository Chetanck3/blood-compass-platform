
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Suspense, lazy } from 'react'
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple fallback component that matches the expected structure
const SplineFallback = React.forwardRef<HTMLDivElement>(() => (
  <div className="w-full h-screen bg-gradient-to-br from-red-50 to-blue-50" />
));
SplineFallback.displayName = 'SplineFallback';

// Lazy load Spline with proper error handling
const Spline = lazy(() => 
  import('@splinetool/react-spline').catch(() => {
    return { default: SplineFallback };
  })
);

function HeroSplineBackground() {
  const [splineError, setSplineError] = useState(false);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
      {!splineError ? (
        <Spline
          style={{
            width: '100%',
            height: '100vh',
            pointerEvents: 'auto',
          }}
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
          onError={() => setSplineError(true)}
        />
      ) : (
        <div className="w-full h-screen bg-gradient-to-br from-red-50 to-blue-50" />
      )}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1), transparent 30%, transparent 70%, rgba(239, 68, 68, 0.1)),
            linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.9))
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function ScreenshotSection({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-11 md:mt-12">
      <div ref={screenshotRef} className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-blue-200/50 w-full md:w-[80%] lg:w-[70%] mx-auto">
        <div>
          <img
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=3840&h=2160&fit=crop&crop=center"
            alt="B-Donor Platform Screenshot"
            className="w-full h-auto block rounded-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

interface HeroContentProps {
  onDonorClick: () => void;
  onPatientClick: () => void;
}

function HeroContent({ onDonorClick, onPatientClick }: HeroContentProps) {
  return (
    <div className="text-left text-blue-900 pt-16 sm:pt-24 md:pt-32 px-4 max-w-3xl">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-wide">
        Save Lives <br className="sm:hidden" />Through Blood<br className="sm:hidden" /> Donation.
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-700 max-w-xl">
        Connect blood donors with patients in need. Streamlined, secure, and life-saving blood donation platform that bridges the gap between donors and healthcare facilities.
      </p>
      <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
        <Button 
          onClick={onDonorClick}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 w-full sm:w-auto border border-red-500/30"
        >
          Start Donating
        </Button>
        <Button 
          onClick={onPatientClick}
          variant="outline"
          className="bg-white/20 border border-blue-600 hover:border-blue-400 text-blue-700 hover:text-blue-900 font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 flex items-center justify-center w-full sm:w-auto backdrop-blur-sm"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Find a Donor
        </Button>
      </div>
    </div>
  );
}

interface NavbarProps {
  onDonorClick: () => void;
  onPatientClick: () => void;
}

function Navbar({ onDonorClick, onPatientClick }: NavbarProps) {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    features: false,
    donors: false,
    resources: false,
  });

  const handleMouseEnterNavItem = (item: string) => setHoveredNavItem(item);
  const handleMouseLeaveNavItem = () => setHoveredNavItem(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setMobileDropdowns({ features: false, donors: false, resources: false });
    }
  };

  const toggleMobileDropdown = (key: keyof typeof mobileDropdowns) => {
    setMobileDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navLinkClass = (itemName: string, extraClasses = '') => {
    const isCurrentItemHovered = hoveredNavItem === itemName;
    const isAnotherItemHovered = hoveredNavItem !== null && !isCurrentItemHovered;

    const colorClass = isCurrentItemHovered
      ? 'text-blue-900'
      : isAnotherItemHovered
        ? 'text-blue-500'
        : 'text-blue-700';

     return `text-sm transition duration-150 ${colorClass} ${extraClasses}`;
  };

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
         setMobileDropdowns({ features: false, donors: false, resources: false });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-blue-100">
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-blue-900">
              B-Donor
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative group" onMouseEnter={() => handleMouseEnterNavItem('features')} onMouseLeave={handleMouseLeaveNavItem}>
              <a href="#features" className={navLinkClass('features', 'flex items-center')}>
                Features
                <svg className="ml-1 w-3 h-3 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </a>
              <div className="absolute left-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-md shadow-lg py-2 border border-blue-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
                <a href="#features" className="block px-4 py-2 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition duration-150">Blood Matching</a>
                <a href="#features" className="block px-4 py-2 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition duration-150">Hospital Locator</a>
                <a href="#features" className="block px-4 py-2 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition duration-150">Donor Rewards</a>
              </div>
            </div>

            <div className="relative group" onMouseEnter={() => handleMouseEnterNavItem('donors')} onMouseLeave={handleMouseLeaveNavItem}>
              <a href="#how-it-works" className={navLinkClass('donors', 'flex items-center')}>
                For Donors
                 <svg className="ml-1 w-3 h-3 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </a>
              <div className="absolute left-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-md shadow-lg py-2 border border-blue-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
                <a href="#how-it-works" className="block px-4 py-2 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition duration-150">Register as Donor</a>
                <a href="#how-it-works" className="block px-4 py-2 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition duration-150">Track Donations</a>
              </div>
            </div>

            <div className="relative group" onMouseEnter={() => handleMouseEnterNavItem('resources')} onMouseLeave={handleMouseLeaveNavItem}>
              <a href="#contact" className={navLinkClass('resources', 'flex items-center')}>
                Resources
                 <svg className="ml-1 w-3 h-3 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </a>
               <div className="absolute left-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-md shadow-lg py-2 border border-blue-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
                <a href="#contact" className="block px-4 py-2 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition duration-150">Support</a>
                <a href="#contact" className="block px-4 py-2 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition duration-150">Emergency</a>
                <a href="#contact" className="block px-4 py-2 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition duration-150">Guidelines</a>
              </div>
            </div>

            <a href="#contact" className={navLinkClass('contact')} onMouseEnter={() => handleMouseEnterNavItem('contact')} onMouseLeave={handleMouseLeaveNavItem}>
                Contact
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <a href="#" className="hidden md:block text-blue-700 hover:text-blue-900 text-sm">Emergency Help</a>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDonorClick}
            className="hidden sm:block border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            Sign In
          </Button>
          <Button 
            size="sm"
            onClick={onPatientClick}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Get Started
          </Button>
          <button className="lg:hidden text-blue-900 p-2" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden bg-white/90 backdrop-blur-md border-t border-blue-200/50 absolute top-full left-0 right-0 z-30
           overflow-hidden transition-all duration-300 ease-in-out
           ${isMobileMenuOpen ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}
           `}
      >
        <div className="px-4 py-6 flex flex-col space-y-4">
          <div className="relative">
            <button className="text-blue-700 hover:text-blue-900 flex items-center justify-between w-full text-left text-sm py-2" onClick={() => toggleMobileDropdown('features')} aria-expanded={mobileDropdowns.features}>
              Features
              <svg className={`ml-2 w-3 h-3 transition-transform duration-200 ${mobileDropdowns.features ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`pl-4 space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdowns.features ? 'max-h-[200px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <a href="#features" className="block text-blue-700 hover:text-blue-900 text-sm py-1 transition duration-150" onClick={toggleMobileMenu}>Blood Matching</a>
              <a href="#features" className="block text-blue-700 hover:text-blue-900 text-sm py-1 transition duration-150" onClick={toggleMobileMenu}>Hospital Locator</a>
              <a href="#features" className="block text-blue-700 hover:text-blue-900 text-sm py-1 transition duration-150" onClick={toggleMobileMenu}>Donor Rewards</a>
            </div>
          </div>
          <div className="relative">
             <button className="text-blue-700 hover:text-blue-900 flex items-center justify-between w-full text-left text-sm py-2" onClick={() => toggleMobileDropdown('donors')} aria-expanded={mobileDropdowns.donors}>
              For Donors
              <svg className={`ml-2 w-3 h-3 transition-transform duration-200 ${mobileDropdowns.donors ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`pl-4 space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdowns.donors ? 'max-h-[200px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <a href="#how-it-works" className="block text-blue-700 hover:text-blue-900 text-sm py-1 transition duration-150" onClick={toggleMobileMenu}>Register as Donor</a>
              <a href="#how-it-works" className="block text-blue-700 hover:text-blue-900 text-sm py-1 transition duration-150" onClick={toggleMobileMenu}>Track Donations</a>
            </div>
          </div>
          <div className="relative">
            <button className="text-blue-700 hover:text-blue-900 flex items-center justify-between w-full text-left text-sm py-2" onClick={() => toggleMobileDropdown('resources')} aria-expanded={mobileDropdowns.resources}>
              Resources
              <svg className={`ml-2 w-3 h-3 transition-transform duration-200 ${mobileDropdowns.resources ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
             <div className={`pl-4 space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdowns.resources ? 'max-h-[250px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <a href="#contact" className="block text-blue-700 hover:text-blue-900 text-sm py-1 transition duration-150" onClick={toggleMobileMenu}>Support</a>
              <a href="#contact" className="block text-blue-700 hover:text-blue-900 text-sm py-1 transition duration-150" onClick={toggleMobileMenu}>Emergency</a>
              <a href="#contact" className="block text-blue-700 hover:text-blue-900 text-sm py-1 transition duration-150" onClick={toggleMobileMenu}>Guidelines</a>
            </div>
          </div>
          <a href="#contact" className="text-blue-700 hover:text-blue-900 text-sm py-2 transition duration-150" onClick={toggleMobileMenu}>Contact</a>
          <a href="#" className="text-blue-700 hover:text-blue-900 text-sm py-2 transition duration-150" onClick={toggleMobileMenu}>Emergency Help</a>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => { onDonorClick(); toggleMobileMenu(); }}
            className="border-blue-300 text-blue-700 hover:bg-blue-50 w-full"
          >
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}

interface HeroSectionProps {
  onDonorClick: () => void;
  onPatientClick: () => void;
  onHospitalClick: () => void;
}

export const HeroSection = ({ onDonorClick, onPatientClick, onHospitalClick }: HeroSectionProps) => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (screenshotRef.current && heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;
          if (screenshotRef.current) {
            screenshotRef.current.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
          }

          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <Navbar onDonorClick={onDonorClick} onPatientClick={onPatientClick} />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <Suspense fallback={<div className="w-full h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center text-blue-900">Loading 3D Scene...</div>}>
            <HeroSplineBackground />
          </Suspense>
        </div>

        <div ref={heroContentRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          display: 'flex', justifyContent: 'flex-start', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
        }}>
          <div className="container mx-auto">
            <HeroContent onDonorClick={onDonorClick} onPatientClick={onPatientClick} />
          </div>
        </div>
      </div>

      <div className="bg-white relative z-10" style={{ marginTop: '-10vh' }}>
        <ScreenshotSection screenshotRef={screenshotRef} />
        <div className="container mx-auto px-4 py-16 text-blue-900">
            <h2 className="text-4xl font-bold text-center mb-8">Connecting Hearts, Saving Lives</h2>
             <p className="text-center max-w-xl mx-auto text-blue-700">B-Donor brings together blood donors and patients in need through our secure, streamlined platform. Every donation matters, every life counts.</p>
        </div>
      </div>
    </div>
  );
};
