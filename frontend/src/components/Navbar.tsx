import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, ShieldAlert, Sun, Moon } from 'lucide-react';
import { Profile } from '../types';
import { useTheme } from '../ThemeContext';

interface NavbarProps {
  activeSection: string;
  scrollTo: (id: string) => void;
  onOpenAdmin: () => void;
  profile?: Profile | null;
}

export default function Navbar({ activeSection, scrollTo, onOpenAdmin, profile }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Education', id: 'education' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Extra-Curricular', id: 'extracurricular' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Resume', id: 'resume' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'backdrop-blur-lg bg-slate-950/60 border-b border-white/8 py-3 shadow-xl' 
        : 'bg-transparent py-5'
    }`} id="main_navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* LOGO */}
          <button 
            onClick={() => scrollTo('home')}
            className="flex items-center space-x-2 text-white font-display text-xl font-bold tracking-tight hover:opacity-95 transition-all text-left"
            id="logo_button"
          >
            <div className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 p-1.5 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-slate-900 via-indigo-600 to-purple-600 dark:from-white dark:via-cyan-200 dark:to-indigo-200 bg-clip-text text-transparent">
              {profile?.name ? profile.name.split(' ')[0] : 'Onkar'}
            </span>
          </button>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center space-x-1.5" id="desktop_nav_links">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav_link_${item.id}`}
                onClick={() => scrollTo(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-indigo-500/10 text-cyan-400 border border-indigo-500/20 shadow-indigo-500/5 shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 ml-2 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenAdmin}
              className="ml-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-cyan-500/30 transition-all flex items-center gap-1.5 active:scale-95"
              id="admin_portal_trigger"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </div>

          {/* MOBILE NAV BURGER */}
          <div className="flex lg:hidden items-center space-x-3" id="mobile_trigger_group">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded bg-slate-800 text-slate-350 hover:text-white border border-slate-750 active:bg-slate-750"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1 rounded bg-slate-800 text-cyan-400 text-xs font-semibold border border-slate-700 active:bg-slate-750 flex items-center"
              id="mobile_admin_trigger"
            >
              Admin
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              id="mobile_menu_burger"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950/80 backdrop-blur-xl border-b border-white/8" id="mobile_drawer">
          <div className="px-3 pt-2 pb-6 space-y-1 sm:px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile_nav_link_${item.id}`}
                onClick={() => {
                  scrollTo(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  activeSection === item.id 
                    ? 'bg-indigo-600/20 text-cyan-400 border-l-4 border-indigo-500' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
