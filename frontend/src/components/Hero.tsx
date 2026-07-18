import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Instagram, ArrowRight, Download, Terminal, Code2, Database, Globe } from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  onScrollToContact: () => void;
  onScrollToProjects: () => void;
  profile?: Profile | null;
}

export default function Hero({ onScrollToContact, onScrollToProjects, profile }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'Full Stack Developer',
    'React Enthusiast',
    'Problem Solver',
    'CS Engineering Grad'
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFull = phrases[phraseIdx];

    if (!isDeleting) {
      if (typedText === currentFull) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timer = setTimeout(() => {
          setTypedText(currentFull.slice(0, typedText.length + 1));
        }, 100);
      }
    } else {
      if (typedText === '') {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
      } else {
        timer = setTimeout(() => {
          setTypedText(currentFull.slice(0, typedText.length - 1));
        }, 50);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIdx]);

  const name = profile?.name || 'Onkar Gaikwad';
  const bio = profile?.bio || "I'm a Computer Engineering graduate from Pune who loves building web apps with React and Node.js. Currently exploring AI integrations and always looking for exciting projects to work on.";
  const location = profile?.location || 'Pune, India';
  const github = profile?.github || 'https://github.com/onkargaikwad';
  const linkedin = profile?.linkedin || 'https://linkedin.com/in/onkar-gaikwad';
  const email = profile?.email || 'onkargaikwad8373@gmail.com';
  const instagram = profile?.instagram || 'https://instagram.com/onkargaikwad';

  const getInitials = (nameStr: string) => {
    const parts = nameStr.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return nameStr.substring(0, 2).toUpperCase();
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-16">
      {/* Background radial gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.08),transparent_60%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.06),transparent_60%)]" />

      {/* Cybernetic code grid overlay */}
      <div className="absolute inset-0 opacity-15 mix-blend-overlay z-0"
           style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* INTRO TEXT BOX */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left" id="hero_intro_text">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight heading-text leading-tight"
              id="hero_full_name"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">{name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-12 flex items-center justify-center lg:justify-start"
              id="hero_typing_block"
            >
              <p className="text-xl sm:text-2xl font-medium body-text font-display">
                I'm a <span className="text-cyan-400 border-r-2 border-cyan-400 pr-1.5 cursor-blink">{typedText}</span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg body-text font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed"
              id="hero_brief_intro"
            >
              {bio}
            </motion.p>

            {/* BUTTON CONTROLS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              id="hero_cta_buttons"
            >
              <button
                onClick={onScrollToProjects}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all text-sm active:scale-95 cursor-pointer"
                id="hero_view_projects_btn"
              >
                See My Projects
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToContact}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 heading-text border border-slate-700 font-semibold flex items-center justify-center gap-2 transition-all text-sm active:scale-95 cursor-pointer"
                id="hero_contact_btn"
              >
                Get In Touch
              </button>

              <a
                href="/api/resume/download"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-slate-800/40 text-cyan-400 border border-cyan-500/30 text-center font-semibold flex items-center justify-center gap-2 transition-all text-sm active:scale-95"
                id="hero_quick_resume_btn"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </motion.div>

            {/* SOCIAL HANDLES */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-6 pt-4"
              id="hero_social_channels"
            >
              <a href={github} target="_blank" rel="noreferrer"
                 className="icon-muted hover:text-white transition-colors" id="social_github">
                <Github className="w-5.5 h-5.5" />
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer"
                 className="icon-muted hover:text-cyan-400 transition-colors" id="social_linkedin">
                <Linkedin className="w-5.5 h-5.5" />
              </a>
              <a href={`mailto:${email}`}
                 className="icon-muted hover:text-indigo-400 transition-colors" id="social_email">
                <Mail className="w-5.5 h-5.5" />
              </a>
              <a href={instagram} target="_blank" rel="noreferrer"
                 className="icon-muted hover:text-purple-400 transition-colors" id="social_instagram">
                <Instagram className="w-5.5 h-5.5" />
              </a>
            </motion.div>
          </div>

          {/* DYNAMIC AVATAR WITH DECORATIVE ORBITS */}
          <div className="lg:col-span-5 flex justify-center" id="hero_profile_visual">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80"
            >
              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 opacity-15 blur-2xl animate-pulse" />

              {/* Orbit ring 1 */}
              <div className="absolute inset-[-20px] rounded-full border border-dashed border-indigo-500/20 animate-[spin_25s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900 border border-indigo-500/30">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                </div>
              </div>

              {/* Orbit ring 2 */}
              <div className="absolute inset-[-40px] rounded-full border border-dashed border-cyan-500/15 animate-[spin_35s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-1.5 rounded-full bg-slate-900 border border-cyan-500/30">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900 border border-purple-500/30">
                  <Globe className="w-3.5 h-3.5 text-purple-400" />
                </div>
              </div>

              {/* Central avatar */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 p-[3px] shadow-2xl shadow-indigo-500/20">
                <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative">
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-full pointer-events-none z-10" />

                  {profile?.avatarUrl ? (
                    <img 
                      src={profile.avatarUrl} 
                      alt={name}
                      className="absolute inset-0 w-full h-full object-cover rounded-full z-20"
                    />
                  ) : (
                    <>
                      <span className="text-5xl sm:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-indigo-400 to-purple-400 select-none z-20">
                        {getInitials(name)}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mt-1 z-20">
                        {profile?.title ? (profile.title.length > 20 ? 'Developer' : profile.title) : 'Developer'}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Floating location badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-30">
                <div className="px-4 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 shadow-lg">
                  <span className="text-[10px] font-bold font-mono text-cyan-400 uppercase tracking-widest">{location}</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
