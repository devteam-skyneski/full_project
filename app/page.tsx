'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '@/app/components/LoadingScreen';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { cn } from '@/lib/utils';
import AuthParticlesBackground from '@/app/auth/components/AuthParticlesBackground';
import SectionParticlesBackground from '@/app/components/SectionParticlesBackground';
import {
  Code, Briefcase, Brain, TrendingUp, Palette, Book,
  UserPlus, Search, BookOpen, Award, CheckCircle, GraduationCap, Users,
  Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUp,
  Menu, X
} from 'lucide-react';

// Shared marquee images for background animation
const MARQUEE_IMAGES = [
  'https://assets.aceternity.com/cloudinary_bkp/3d-card.png',
  'https://assets.aceternity.com/animated-modal.png',
  'https://assets.aceternity.com/animated-testimonials.webp',
  'https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png',
  'https://assets.aceternity.com/github-globe.png',
  'https://assets.aceternity.com/glare-card.png',
  'https://assets.aceternity.com/layout-grid.png',
  'https://assets.aceternity.com/flip-text.png',
  'https://assets.aceternity.com/hero-highlight.png',
  'https://assets.aceternity.com/carousel.webp',
  'https://assets.aceternity.com/placeholders-and-vanish-input.png',
  'https://assets.aceternity.com/shooting-stars-and-stars-background.png',
  'https://assets.aceternity.com/signup-form.png',
  'https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png',
  'https://assets.aceternity.com/spotlight-new.webp',
  'https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png',
  'https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png',
  'https://assets.aceternity.com/tabs.png',
  'https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png',
  'https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png',
  'https://assets.aceternity.com/glowing-effect.webp',
  'https://assets.aceternity.com/hover-border-gradient.png',
  'https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png',
  'https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png',
  'https://assets.aceternity.com/macbook-scroll.png',
  'https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png',
  'https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png',
  'https://assets.aceternity.com/multi-step-loader.png',
  'https://assets.aceternity.com/vortex.png',
  'https://assets.aceternity.com/wobble-card.png',
  'https://assets.aceternity.com/world-map.webp',
];

// Simplified hooks
const useScrollShadow = () => {
  const [hasShadow, setHasShadow] = useState(false);
  useEffect(() => {
    const handleScroll = () => setHasShadow(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return hasShadow;
};

// Navbar Component
const LandingNavbar = ({ reveal = false }: { reveal?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasShadow = useScrollShadow();
  const [activeHash, setActiveHash] = useState<string>('');

  // Framer Motion variants for staggered pop-up reveal
  const parentVariants = {
    show: {
      transition: {
        staggerChildren: 0.14,
        when: 'beforeChildren',
      },
    },
  } as const;

  const groupVariants = {
    show: {
      transition: {
        staggerChildren: 0.14,
        when: 'beforeChildren',
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.92 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.175, 0.885, 0.32, 1.275],
      },
    },
  } as const;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => {
      // Only set activeHash if we have a valid hash in the URL
      const hash = window.location.hash;
      setActiveHash(hash || '');
    };
    update();
    window.addEventListener('hashchange', update);
    // Clear hash on page load to prevent constant active state
    if (window.location.hash) {
      const hash = window.location.hash;
      // Only set if it's a valid section
      const validSections = ['#courses', '#universities', '#how-it-works', '#about'];
      if (!validSections.includes(hash)) {
        setActiveHash('');
      }
    }
    return () => window.removeEventListener('hashchange', update);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        hasShadow
          ? 'bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur-md shadow-sm border-b border-gray-200/70'
          : 'bg-transparent'
      }`}
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate={reveal ? 'show' : 'hidden'}
          className="flex justify-between items-center h-16"
        >
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              EduLearn
            </Link>
          </motion.div>

          <motion.div variants={groupVariants} className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <motion.div variants={itemVariants}>
                <Link
                  href="#courses"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#courses');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`group relative px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    activeHash === '#courses' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
                  } after:content-[""] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-blue-600 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-left ${
                    activeHash === '#courses' ? 'after:scale-x-100' : ''
                  }`}
                >
                  Courses
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="#universities"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#universities');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`group relative px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    activeHash === '#universities' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
                  } after:content-[""] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-blue-600 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-left ${
                    activeHash === '#universities' ? 'after:scale-x-100' : ''
                  }`}
                >
                  Universities
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#how-it-works');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`group relative px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    activeHash === '#how-it-works' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
                  } after:content-[""] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-blue-600 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-left ${
                    activeHash === '#how-it-works' ? 'after:scale-x-100' : ''
                  }`}
                >
                  How it Works
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#about');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`group relative px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    activeHash === '#about' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
                  } after:content-[""] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-blue-600 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-left ${
                    activeHash === '#about' ? 'after:scale-x-100' : ''
                  }`}
                >
                  About
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href={"/contact" as Route}
                  className="group relative text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-blue-600 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-left"
                >
                  Contact
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={groupVariants} className="hidden md:flex items-center space-x-4">
            <motion.div variants={itemVariants}>
              <Link
                href={"/auth" as Route}
                className="text-gray-700 hover:text-gray-900 px-4 py-2 text-base font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 border border-gray-300 hover:border-gray-400 bg-white/60"
              >
                Login
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href={{ pathname: "/auth", query: { mode: "signup" } }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-base font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm hover:shadow"
              >
                Sign Up
              </Link>
            </motion.div>
          </motion.div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="text-gray-700 hover:text-blue-600 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </motion.div>

        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-[1px]" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 w-72 max-w-[80vw] bg-white/90 supports-[backdrop-filter]:bg-white/70 backdrop-blur-md shadow-xl ring-1 ring-gray-200 p-4 transform transition-transform duration-200 ease-out">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-800">Menu</span>
                <button
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <motion.nav variants={parentVariants} initial="hidden" animate="show" className="space-y-1">
                <motion.div variants={itemVariants}>
                  <Link href="#courses" onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                    Courses
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="#universities" onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                    Universities
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                    How it Works
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href="#about" onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                    About
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link href={"/contact" as Route} onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                    Contact
                  </Link>
                </motion.div>
              </motion.nav>
              <motion.div variants={groupVariants} initial="hidden" animate="show" className="mt-4 border-t pt-4">
                <div className="flex gap-2">
                  <motion.div variants={itemVariants} className="flex-1">
                    <Link href={"/auth" as Route} onClick={() => setIsMenuOpen(false)} className="block rounded-md border border-gray-300 px-3 py-2 text-center text-base font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-white/70">
                      Login
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex-1">
                    <Link href={{ pathname: "/auth", query: { mode: "signup" } }} onClick={() => setIsMenuOpen(false)} className="block rounded-md bg-blue-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm">
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = ({ reveal = false }: { reveal?: boolean }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [start, setStart] = useState(false);

  // Start counters when revealed (landing finished) or when in view as a fallback
  useEffect(() => {
    if (reveal || inView) setStart(true);
  }, [reveal, inView]);

  // Framer Motion variants for hero pop-up from bottom with slight zoom overshoot
  const heroParent = {
    show: { transition: { staggerChildren: 0.12, when: 'beforeChildren' } },
  } as const;

  const heroGroup = {
    show: { transition: { staggerChildren: 0.12, when: 'beforeChildren' } },
  } as const;

  const heroItem = {
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] },
    },
  } as const;

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-200 py-20 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
        }}
      >
        <SectionParticlesBackground />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={heroParent} initial="hidden" animate={reveal ? 'show' : 'hidden'} className="space-y-8">
            <motion.h1 variants={heroItem} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Future with World-Class Education
            </motion.h1>

            <motion.p variants={heroItem} className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Access premium courses from top universities worldwide. Learn at your own pace or pursue university registration for recognized degrees.
            </motion.p>

            <motion.div variants={heroGroup} className="flex flex-col sm:flex-row gap-4">
              <motion.div variants={heroItem}>
                <Link
                  href={"/admin" as Route}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors text-center"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div variants={heroItem}>
                <Link
                  href="https://listofcourses.netlify.app/"
                  className="border-2 border-white hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg transition-colors text-center"
                >
                  Explore Courses
                </Link>
              </motion.div>
            </motion.div>

            <motion.div ref={ref} variants={heroGroup} className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
              <motion.div variants={heroItem} className="text-center sm:text-left">
                <div className="text-3xl font-bold text-gray-900">
                  {start && <CountUp end={5000} duration={2} separator="," />}+
                </div>
                <div className="text-gray-600">Active Students</div>
              </motion.div>
              <motion.div variants={heroItem} className="text-center sm:text-left">
                <div className="text-3xl font-bold text-gray-900">
                  {start && <CountUp end={300} duration={2} />}+
                </div>
                <div className="text-gray-600">Courses</div>
              </motion.div>
              <motion.div variants={heroItem} className="text-center sm:text-left">
                <div className="text-3xl font-bold text-gray-900">
                  {start && <CountUp end={100} duration={2} />}+
                </div>
                <div className="text-gray-600">Universities</div>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/hero-student.jpg"
                alt="Student learning with laptop"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// University Partners Component
const UniversityPartners = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const universities = [
    "Stanford University",
    "MIT",
    "Harvard University",
    "Oxford University",
    "Cambridge University",
    "Yale University",
    "Princeton University",
    "Berkeley",
  ];
  const scrollingList = [...universities, ...universities, ...universities];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (hasAnimated) return;

    const handleScroll = () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl || hasAnimated) return;
      const rect = sectionEl.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.8;
      if (rect.top <= triggerPoint) {
        setHasAnimated(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true } as any);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll as any);
      window.removeEventListener('resize', handleScroll as any);
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative py-16 bg-gradient-to-br from-blue-50 to-blue-200 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
        }}
      >
        <SectionParticlesBackground />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`section-title universities-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${hasAnimated ? 'animate-universities-zoom' : ''}`}>
            Top Universities We Partner With
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn from the world&apos;s leading institutions and earn recognized credentials.
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 animate-scroll-continuous will-change-transform">
            {scrollingList.map((university, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-3">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight">
                    {university}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll-continuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll-continuous {
          animation: scroll-continuous 30s linear infinite;
        }

        @keyframes universities-zoom-settle {
          0% {
            transform: scale(1) translateY(0);
          }
          45% {
            transform: scale(1.4) translateY(-20px);
          }
          75% {
            transform: scale(0.98) translateY(0);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }
        .universities-heading {
          will-change: transform;
          transform-origin: center center;
        }
        .animate-universities-zoom {
          animation: universities-zoom-settle 1.2s cubic-bezier(0.22, 0.61, 0.36, 1.2) both;
        }
      `}</style>
    </section>
  );
};

// University Programs Component
const UniversityPrograms = () => {
  return (
    <section id="universities" className="relative py-20 bg-gradient-to-br from-blue-50 to-blue-200 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
        }}
      >
        <SectionParticlesBackground />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/uni2.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                controlsList="nodownload nofullscreen noplaybackrate"
                disablePictureInPicture
                disableRemotePlayback
                aria-label="University registration video"
              />
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              University Registration & Accredited Degrees
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Take your education to the next level with our university registration program. Earn fully accredited degrees from renowned institutions without relocating or giving up your current commitments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Accredited Degrees
                    </h3>
                    <p className="text-gray-600">
                      Bachelor's and Master's programs recognized globally
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Live Classes
                    </h3>
                    <p className="text-gray-600">
                      Interactive sessions with professors and classmates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                Explore Degree Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Course Categories Component
const CourseCategories = () => {
  const categories = [
    { icon: Code, title: 'Computer Science', description: 'Master programming, algorithms, and software development from beginner to advanced levels.', courseCount: '45 courses' },
    { icon: Briefcase, title: 'Business & Management', description: 'Learn essential business skills, leadership, and management strategies.', courseCount: '38 courses' },
    { icon: Brain, title: 'Data Science & AI', description: 'Explore machine learning, artificial intelligence, and data analytics.', courseCount: '52 courses' },
    { icon: TrendingUp, title: 'Digital Marketing', description: 'Build expertise in SEO, social media, content marketing, and analytics.', courseCount: '29 courses' },
    { icon: Palette, title: 'Design & Creative', description: 'Develop skills in UI/UX design, graphic design, and creative thinking.', courseCount: '34 courses' },
    { icon: Book, title: 'Liberal Arts', description: 'Study humanities, social sciences, and develop critical thinking skills.', courseCount: '41 courses' }
  ];

  return (
    <section id="courses" className="relative py-20 bg-gradient-to-br from-blue-50 to-blue-200 landing-dark overflow-hidden">
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-screen bottom-0 pointer-events-none z-0 opacity-80"
        style={{ transform: 'translateX(-50%) translateZ(0)', willChange: 'transform' }}
      >
        <ThreeDMarquee images={MARQUEE_IMAGES} className="h-full" />
      </div>
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
        }}
      >
        <SectionParticlesBackground />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore Our Course Categories
          </h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Choose from a wide range of subjects designed to help you achieve your learning goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 flex-grow">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.courseCount}
                    </span>
                    <a
                      href="https://listofcourses.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Explore →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Component
const HowItWorks = () => {
  const steps = [
    { icon: UserPlus, title: 'Create Your Account', description: 'Sign up in minutes and set up your personalized learning profile.' },
    { icon: Search, title: 'Choose Your Path', description: 'Browse courses or select a university program that matches your goals.' },
    { icon: BookOpen, title: 'Start Learning', description: 'Access course materials, attend live sessions, or learn at your own pace.' },
    { icon: Award, title: 'Earn Credentials', description: 'Complete courses to earn certificates or degrees from top universities.' }
  ];

  return (
    <section id="how-it-works" className="relative py-20 bg-gradient-to-br from-blue-50 to-blue-200 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
        }}
      >
        <SectionParticlesBackground />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get started with your learning journey in 4 simple steps
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gray-200">
            <div className="absolute top-0 left-1/4 w-1/2 h-0.5 bg-blue-600"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-blue-600 font-semibold text-sm mb-2">
                      Step {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    'Access course materials 24/7 from your computer, tablet, or phone',
    'Customize your study plan based on your goals and availability',
    'Get help from instructors and peers through our community forums'
  ];
  // images moved to top-level MARQUEE_IMAGES

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleVisibility = () => {
      const el = videoRef.current;
      if (!el) return;
      if (document.visibilityState === 'visible') {
        try { el.play(); } catch {}
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-blue-200 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
        }}
      >
        <SectionParticlesBackground />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Self‑Paced Learning, Built for Modern Life
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Learn on your terms with flexible courses you can start anytime. Study from anywhere, pick up where you left off on any device, and move at a pace that fits your goals—not the other way around.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-800">
                    {index === 0 && 'Learn anytime, on any device—your progress syncs automatically.'}
                    {index === 1 && 'Create a schedule that adapts to your goals and availability.'}
                    {index === 2 && 'Get timely support from instructors and peers in our community.'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-full min-h-[24rem] rounded-2xl overflow-hidden">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src="/self.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                controlsList="nodownload nofullscreen noplaybackrate"
                disablePictureInPicture
                disableRemotePlayback
                onLoadedMetadata={(e) => {
                  try { e.currentTarget.play(); } catch {}
                }}
                onLoadedData={(e) => {
                  try { e.currentTarget.play(); } catch {}
                }}
                onCanPlay={(e) => {
                  try { if (e.currentTarget.paused) e.currentTarget.play(); } catch {}
                }}
                onStalled={(e) => {
                  try { e.currentTarget.play(); } catch {}
                }}
                onWaiting={(e) => {
                  try { e.currentTarget.play(); } catch {}
                }}
                onTimeUpdate={(e) => {
                  const el = e.currentTarget;
                  if (el.duration && el.duration - el.currentTime < 0.05) {
                    try { el.currentTime = 0; el.play(); } catch {}
                  }
                }}
                onEnded={(e) => {
                  try { e.currentTarget.currentTime = 0; e.currentTarget.play(); } catch {}
                }}
                aria-label="Self study video"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Learning Styles Component
const LearningStyles = () => {
  const programs = [
    {
      title: 'Individual Courses',
      description: 'Perfect for skill-building and professional development',
      duration: '4-12 weeks per course',
      features: [
        'Self-paced learning',
        'Video lectures & assignments',
        'Peer discussion forums',
        'Certificate of completion',
        'Lifetime access to materials'
      ],
      availability: 'Start anytime',
      buttonText: 'Learn More',
      buttonStyle: 'outline',
      popular: false
    },
    {
      title: 'Bootcamp Programs',
      description: 'Intensive training for career transformation',
      duration: '12-24 weeks',
      features: [
        'Structured curriculum',
        'Live instructor sessions',
        'Real-world projects',
        'Career coaching included',
        'Job placement assistance'
      ],
      availability: 'Monthly cohorts',
      buttonText: 'Learn More',
      buttonStyle: 'primary',
      popular: true
    },
    {
      title: 'University Degrees',
      description: 'Earn accredited bachelor\'s or master\'s degrees',
      duration: '2-4 years',
      features: [
        'Fully accredited programs',
        'Live online classes',
        'Faculty office hours',
        'Campus library access',
        'Alumni network benefits'
      ],
      availability: 'Semester-based enrollment',
      buttonText: 'Learn More',
      buttonStyle: 'outline',
      popular: false
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-blue-200 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
        }}
      >
        <SectionParticlesBackground />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Classes Available for Every Learning Style
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the learning format that best fits your schedule and goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className={cn(
                "group w-full cursor-pointer overflow-visible relative card rounded-2xl shadow-md hover:shadow-lg flex flex-col border border-transparent dark:border-neutral-800 bg-white",
                program.popular ? 'border-2 border-blue-600' : 'border border-gray-200',
                // Preload hover image by setting it in a pseudo-element
                "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                "transition-all duration-500"
              )}
            >
              {program.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50 whitespace-nowrap">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium relative z-50">
                    Most Popular
                  </span>
                </div>
              )}

              <div 
                className="overflow-hidden rounded-2xl relative p-8 flex flex-col"
                onMouseEnter={(e) => {
                  const bgLayer = e.currentTarget.querySelector('.card-bg-layer') as HTMLElement;
                  if (bgLayer) {
                    bgLayer.style.backgroundImage = 'url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)';
                  }
                }}
                onMouseLeave={(e) => {
                  const bgLayer = e.currentTarget.querySelector('.card-bg-layer') as HTMLElement;
                  if (bgLayer) {
                    bgLayer.style.backgroundImage = 'none';
                  }
                }}
              >
                {/* Background layer that covers the entire card */}
                <div
                  className="card-bg-layer absolute inset-0 rounded-2xl z-0 transition-all duration-500"
                  style={{
                    backgroundImage: 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-10 pointer-events-none" />
              <div className="relative z-20">
              <div className="text-center mb-6 relative z-50">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 relative z-50">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4 relative z-50">
                  {program.description}
                </p>
                <div className="text-sm text-gray-500 relative z-50">
                  {program.duration}
                </div>
              </div>

              <div className="space-y-3 mb-6 relative z-50">
                {program.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3 relative z-50">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 relative z-50" />
                    <span className="text-sm text-gray-700 relative z-50">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-3 mb-6 relative z-50">
                <div className="text-center text-sm text-blue-800 font-medium relative z-50">
                  {program.availability}
                </div>
              </div>

              <button
                className="w-full py-3 px-6 rounded-lg font-medium transition-colors relative z-50 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600"
              >
                {program.buttonText}
              </button>
              </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We\'ll contact you within 24 hours.');
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-800 landing-dark overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
        }}
      >
        <SectionParticlesBackground />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-gray-600">
                Fill out the form below and our team will contact you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 1111122222"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                    I'm Interested In *
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select an option</option>
                    <option value="individual-courses">Individual Courses</option>
                    <option value="bootcamp-programs">Bootcamp Programs</option>
                    <option value="university-degrees">University Degrees</option>
                    <option value="certifications">Certifications</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your learning goals and any questions you have..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-lg font-semibold transition-colors"
              >
                Submit Enquiry
              </button>
            </form>
          </div>

          <div className="text-white space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Have questions about our courses or programs? Our team is here to help you find the perfect learning path for your goals.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-blue-100">support@edulearn.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-blue-100">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">Visit Us</p>
                  <p className="text-blue-100">123 Education Street, Learning City, LC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Landing Footer Component
const LandingFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">EduLearn</h3>
            <p className="text-gray-300 leading-relaxed">
              Empowering learners worldwide with quality education from top universities and industry experts.
            </p>
            <div className="flex space-x-4" aria-label="Social links">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <nav className="space-y-4" aria-label="Learn">
            <h4 className="text-lg font-semibold">Learn</h4>
            <ul className="space-y-2">
              <li>
                <a href="#courses" className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  Browse Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  Bootcamps
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  Degree Programs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  Free Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  Certifications
                </a>
              </li>
            </ul>
          </nav>

          <nav className="space-y-4" aria-label="Company">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  Our Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  Press
                </a>
              </li>
              <li>
                <Link href={"/contact" as Route} className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">support@edulearn.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">123 Education Street, Learning City, LC 12345</span>
              </div>
            </div>
            <div className="pt-4">
              <a href="#top" aria-label="Back to top" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm">Back to top</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {year} EduLearn. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLandingRevealed, setHasLandingRevealed] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Ensure the browser doesn't auto-restore scroll position on reload
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { history } = window;
    const prev = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    return () => {
      history.scrollRestoration = prev || 'auto';
    };
  }, []);

  // Prevent hash jump during initial load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // After slide-up reveal completes, ensure viewport at top smoothly
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isLoading) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500); // match slide-up duration
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ y: isLoading ? '100vh' : 0, opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.8, 0.25, 1] }}
        onAnimationComplete={() => {
          if (!isLoading && typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setHasLandingRevealed(true);
          }
        }}
        style={{ willChange: 'transform, opacity' }}
        className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-blue-200 landing-root relative overflow-hidden"
      >
        {/* Particles background - constrained to left and right sides with mask */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
            }}
          >
            <AuthParticlesBackground />
          </div>
        </div>
        {/* Floating parallax background elements - constrained to left and right sides */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translate(0px, 0px)' }}
        >
          {/* Left side blobs */}
          <div className="absolute top-20 -left-32 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-60 -left-24 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 -left-28 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Right side blobs */}
          <div className="absolute top-40 -right-32 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-80 -right-24 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-40 -right-28 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Additional floating elements - constrained to left and right sides */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translate(0px, 0px)' }}
        >
          {/* Left side floating circles */}
          <div className="absolute top-1/4 left-0 w-32 h-32 bg-blue-300 rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-1/4 left-4 w-24 h-24 bg-purple-300 rounded-full opacity-10 animate-float-delayed"></div>
          <div className="absolute top-1/2 left-0 w-20 h-20 bg-pink-300 rounded-full opacity-10 animate-float"></div>
          
          {/* Right side floating circles */}
          <div className="absolute top-1/3 right-0 w-32 h-32 bg-purple-300 rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-1/3 right-4 w-24 h-24 bg-blue-300 rounded-full opacity-10 animate-float-delayed"></div>
          <div className="absolute top-2/3 right-0 w-20 h-20 bg-pink-300 rounded-full opacity-10 animate-float"></div>
        </div>
        <LandingNavbar reveal={hasLandingRevealed} />
        <main>
          <HeroSection reveal={hasLandingRevealed} />
          <UniversityPartners />
          <UniversityPrograms />
          <CourseCategories />
          <HowItWorks />
          <FeaturesSection />
          <LearningStyles />
          <ContactForm />
        </main>
        <LandingFooter />
        <style jsx global>{`
          /* Default: all headings in landing use jet black */
          .landing-root h1,
          .landing-root h2,
          .landing-root h3,
          .landing-root h4,
          .landing-root h5,
          .landing-root h6 {
            color: #000 !important;
          }

          /* Headings inside dark-colored areas should be white */
          .landing-root .bg-blue-600 h1,
          .landing-root .bg-blue-600 h2,
          .landing-root .bg-blue-600 h3,
          .landing-root .bg-blue-600 h4,
          .landing-root .bg-blue-600 h5,
          .landing-root .bg-blue-600 h6,
          .landing-root .bg-blue-700 h1,
          .landing-root .bg-blue-700 h2,
          .landing-root .bg-blue-700 h3,
          .landing-root .bg-blue-700 h4,
          .landing-root .bg-blue-700 h5,
          .landing-root .bg-blue-700 h6,
          .landing-root .bg-blue-800 h1,
          .landing-root .bg-blue-800 h2,
          .landing-root .bg-blue-800 h3,
          .landing-root .bg-blue-800 h4,
          .landing-root .bg-blue-800 h5,
          .landing-root .bg-blue-800 h6,
          .landing-root .landing-dark h1,
          .landing-root .landing-dark h2,
          .landing-root .landing-dark h3,
          .landing-root .landing-dark h4,
          .landing-root .landing-dark h5,
          .landing-root .landing-dark h6 {
            color: #fff !important;
          }

          /* But if there's a white card inside dark section, keep headings black */
          .landing-root .landing-dark .bg-white h1,
          .landing-root .landing-dark .bg-white h2,
          .landing-root .landing-dark .bg-white h3,
          .landing-root .landing-dark .bg-white h4,
          .landing-root .landing-dark .bg-white h5,
          .landing-root .landing-dark .bg-white h6 {
            color: #000 !important;
          }
        `}</style>
      </motion.div>
    </>
  );
}

