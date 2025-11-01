'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  Code, Briefcase, Brain, TrendingUp, Palette, Book,
  UserPlus, Search, BookOpen, Award, CheckCircle, GraduationCap, Users,
  Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUp,
  Menu, X
} from 'lucide-react';

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
const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasShadow = useScrollShadow();
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setActiveHash(window.location.hash || '');
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${
        hasShadow ? 'shadow-sm' : ''
      }`}
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              EduLearn
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="#courses"
                className={`px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  activeHash === '#courses' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Courses
              </Link>
              <Link
                href="#universities"
                className={`px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  activeHash === '#universities' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Universities
              </Link>
              <Link
                href="#how-it-works"
                className={`px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  activeHash === '#how-it-works' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                How it Works
              </Link>
              <Link
                href="#about"
                className={`px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  activeHash === '#about' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth"
              className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:border-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Login
            </Link>
            <Link
              href="/auth"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Sign Up
            </Link>
          </div>

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
        </div>

        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="fixed inset-0 bg-black/30" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 w-72 max-w-[80vw] bg-white shadow-xl p-4 transform transition-transform duration-200 ease-out">
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
              <nav className="space-y-1">
                <Link href="#courses" onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                  Courses
                </Link>
                <Link href="#universities" onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                  Universities
                </Link>
                <Link href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                  How it Works
                </Link>
                <Link href="#about" onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                  About
                </Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50">
                  Contact
                </Link>
              </nav>
              <div className="mt-4 border-t pt-4">
                <div className="flex gap-2">
                  <Link href="/auth" onClick={() => setIsMenuOpen(false)} className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Login
                  </Link>
                  <Link href="/auth" onClick={() => setIsMenuOpen(false)} className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) setStart(true);
  }, [inView]);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Future with World-Class Education
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Access premium courses from top universities worldwide. Learn at your own pace or pursue university registration for recognized degrees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/admin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors text-center"
              >
                Get Started
              </Link>
              <Link
                href="https://listofcourses.netlify.app/"
                className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg transition-colors text-center"
              >
                Explore Courses
              </Link>
            </div>

            <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-gray-900">
                  {start && <CountUp end={5000} duration={2} separator="," />}+
                </div>
                <div className="text-gray-600">Active Students</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-gray-900">
                  {start && <CountUp end={300} duration={2} />}+
                </div>
                <div className="text-gray-600">Courses</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-gray-900">
                  {start && <CountUp end={100} duration={2} />}+
                </div>
                <div className="text-gray-600">Universities</div>
              </div>
            </div>
          </div>

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

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
      `}</style>
    </section>
  );
};

// University Programs Component
const UniversityPrograms = () => {
  return (
    <section id="universities" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/university-building.jpg"
                alt="University building"
                fill
                className="object-cover"
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
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Course Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Self-Paced Learning for Modern Learners
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Our self-paced learning platform empowers you to study on your own schedule, from anywhere in the world. Whether you're a working professional, a parent, or simply someone with a busy lifestyle, we've designed our courses to fit seamlessly into your life.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/learning-woman.jpg"
                alt="Student learning with laptop"
                fill
                className="object-cover"
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className={`relative bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 ${
                program.popular ? 'border-2 border-blue-600' : 'border border-gray-200'
              }`}
            >
              {program.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {program.description}
                </p>
                <div className="text-sm text-gray-500">
                  {program.duration}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {program.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-3 mb-6">
                <div className="text-center text-sm text-blue-800 font-medium">
                  {program.availability}
                </div>
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  program.buttonStyle === 'primary'
                    ? 'bg-gray-900 hover:bg-gray-800 text-white'
                    : 'border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600'
                }`}
              >
                {program.buttonText}
              </button>
            </div>
          ))}
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
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
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
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <main>
        <HeroSection />
        <UniversityPartners />
        <UniversityPrograms />
        <CourseCategories />
        <HowItWorks />
        <FeaturesSection />
        <LearningStyles />
        <ContactForm />
      </main>
      <LandingFooter />
    </div>
  );
}

