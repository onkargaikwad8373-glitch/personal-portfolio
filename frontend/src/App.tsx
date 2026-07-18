import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EducationPanel from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ExperiencePanel from './components/Experience';
import ExtraCurricularPanel from './components/ExtraCurricular';
import Certifications from './components/Certifications';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import ParticleBackground from './components/ParticleBackground';

import { ArrowUp, ShieldAlert, Terminal } from 'lucide-react';
import { Project, Skill, Education, Experience, ExtraCurricular, Certification, Profile } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Core full-stack state registries
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [extraCurriculars, setExtraCurriculars] = useState<ExtraCurricular[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Telemetry: dispatch visitor log once on mount
  const logVisitorSession = async () => {
    const width = window.innerWidth;
    const device = width < 640 ? 'Mobile' : width < 1024 ? 'Tablet' : 'Desktop';
    
    // Parse browser
    const ua = navigator.userAgent;
    let browser = 'Chrome';
    if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) browser = 'Safari';
    else if (ua.indexOf('Edge') > -1) browser = 'Edge';

    let country = 'United States';
    try {
      // Lazy lookup from dynamic DNS
      const ipLookup = await fetch('https://ipapi.co/json/');
      if (ipLookup.ok) {
        const ipData = await ipLookup.json();
        if (ipData.country_name) {
          country = ipData.country_name;
        }
      }
    } catch (e) {
      // Bypassed if strict adblock is on, resolves America/Europe/Asia fallback
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.indexOf('Asia') > -1) country = 'India';
      else if (tz.indexOf('Europe') > -1) country = 'United Kingdom';
    }

    try {
      await fetch('/api/analytics/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device, browser, country })
      });
    } catch (err) {
      console.log('Telemetry dispatch bypassed.');
    }
  };

  // FETCH ALL PORTFOLIO CONTENT FROM BACKEND APIS
  const fetchAllPortfolioData = async () => {
    try {
      const [projR, skillR, eduR, expR, extraR, certR, profileR] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/education'),
        fetch('/api/experience'),
        fetch('/api/extracurricular'),
        fetch('/api/certifications'),
        fetch('/api/profile')
      ]);

      if (projR.ok) setProjects(await projR.json());
      if (skillR.ok) setSkills(await skillR.json());
      if (eduR.ok) setEducations(await eduR.json());
      if (expR.ok) setExperiences(await expR.json());
      if (extraR.ok) setExtraCurriculars(await extraR.json());
      if (certR.ok) setCertifications(await certR.json());
      if (profileR.ok) setProfile(await profileR.json());

    } catch (err) {
      console.error('Error fetching database registers. App running on client caches.', err);
    } finally {
      // Stop skeleton loader
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchAllPortfolioData();
    logVisitorSession();
    
    // Core scroll listener for active highlighters
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const scrollPos = window.scrollY + 200;
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'experience', 'extracurricular', 'certifications', 'resume', 'contact'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 64; 
      const targetPos = el.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="bg-theme-primary text-slate-100 min-h-screen relative font-sans antialiased text-left">
      <ParticleBackground />
      
      {/* SKELETON LOADING PRELOADER */}
      {loading ? (
        <div className="fixed inset-0 bg-[#0b0f19] z-50 flex flex-col items-center justify-center space-y-4" id="starting_curtain">
          <div className="relative flex items-center justify-center">
            {/* Spinning pulse track */}
            <div className="w-16 h-16 rounded-full border-2 border-slate-800 border-t-cyan-400 animate-spin" />
            <Terminal className="w-6 h-6 text-indigo-400 absolute animate-pulse" />
          </div>
          <p className="font-mono text-xs text-slate-400 tracking-widest uppercase animate-pulse">Initializing Terminal...</p>
        </div>
      ) : (
        <div className="relative min-h-screen flex flex-col justify-between">
          
          {/* HEADER RESIZE BAR */}
          <Navbar 
            activeSection={activeSection} 
            scrollTo={scrollTo}
            onOpenAdmin={() => setShowAdmin(true)}
            profile={profile}
          />

          {/* MAIN DISPLAY REGISTRY */}
          <main className="flex-1">
            <Hero 
              onScrollToContact={() => scrollTo('contact')}
              onScrollToProjects={() => scrollTo('projects')}
              profile={profile}
            />
            <About profile={profile} />
            <EducationPanel educationData={educations} />
            <Skills skillsData={skills} />
            <Projects projectsData={projects} />
            <ExperiencePanel experienceData={experiences} />
            <ExtraCurricularPanel extraCurricularData={extraCurriculars} />
            <Certifications certificationsData={certifications} />
            <Resume profile={profile} />
            <Contact profile={profile} />
          </main>

          {/* FOOTER WIDGET */}
          <footer className="backdrop-blur-md bg-slate-950/50 border-t border-slate-850 py-12 text-center" id="global_footer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <p className="text-sm text-slate-500 font-mono">
                © 2026 {profile?.name || 'Onkar Gaikwad'}. All Rights Reserved.
              </p>
              <div className="flex items-center justify-center gap-6" id="footer_navigation">
                <button onClick={() => scrollTo('about')} className="text-xs text-slate-400 hover:text-white transition">About</button>
                <button onClick={() => scrollTo('skills')} className="text-xs text-slate-400 hover:text-white transition">Skills</button>
                <button onClick={() => scrollTo('projects')} className="text-xs text-slate-400 hover:text-white transition">Projects</button>
                <button onClick={() => scrollTo('contact')} className="text-xs text-slate-400 hover:text-white transition">Contact</button>
                <button onClick={() => setShowAdmin(true)} className="text-xs text-cyan-400/80 hover:text-cyan-400 transition font-bold uppercase tracking-widest flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Admin
                </button>
              </div>
            </div>
          </footer>

          {/* ADMIN OVERLAY SYSTEM CONTAINER */}
          {showAdmin && (
            <Dashboard 
              onClose={() => setShowAdmin(false)}
              onRefreshAllData={fetchAllPortfolioData}
              allProjects={projects}
              allSkills={skills}
              allEducations={educations}
              allExperiences={experiences}
              allExtraCurriculars={extraCurriculars}
              allCertifications={certifications}
              profile={profile}
            />
          )}

          {/* FLOATING SCROLL TO TOP BUTTON */}
          {showScrollTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
              id="scroll_to_top_bubble"
              title="Scroll Up"
            >
              <ArrowUp className="w-5 h-5 animate-bounce" />
            </button>
          )}

        </div>
      )}
    </div>
  );
}
