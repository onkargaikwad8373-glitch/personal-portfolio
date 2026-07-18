import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code2, Target } from 'lucide-react';
import { Profile } from '../types';

interface AboutProps {
  profile?: Profile | null;
}

export default function About({ profile }: AboutProps) {
  const cards = [
    {
      icon: <Target className="w-6 h-6 text-cyan-400" />,
      title: profile?.aboutCard1Title || 'What I\'m Looking For',
      description: profile?.aboutCard1Desc || 'I want to work on real products that people actually use — whether it\'s building performant web apps, designing clean APIs, or experimenting with AI-powered features. I\'m looking for a team where I can grow fast and ship meaningful work.'
    },
    {
      icon: <Code2 className="w-6 h-6 text-indigo-400" />,
      title: profile?.aboutCard2Title || 'How I Got Here',
      description: profile?.aboutCard2Desc || 'Started with C and Java in college, then fell in love with web development. Over my CS degree, I went deep into React, Node.js, and database design. Now I spend my time building full-stack projects and learning how to integrate AI into web apps.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: profile?.aboutCard3Title || 'What Excites Me',
      description: profile?.aboutCard3Desc || 'Clean component architecture, smooth UI interactions, API design that just makes sense, and figuring out how to make AI actually useful in everyday apps. I\'m also a big believer in writing code that\'s easy for the next person to read.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative backdrop blobs */}
      <div className="absolute right-0 top-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section title header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="about_main_header">
          <h2 className="section-label text-sm font-semibold tracking-widest uppercase">01 / About Me</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-extrabold heading-text">
            {profile?.aboutHeading || 'A Bit About Who I Am'}
          </p>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Narrative & Visual Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Bio text area */}
          <div className="lg:col-span-6 space-y-6" id="about_narrative_block">
            <h3 className="text-xl sm:text-2xl font-display font-bold heading-text">
              I care about writing clean code and building things that work well.
            </h3>
            <p className="body-text leading-relaxed font-sans">
              {profile?.aboutText1 || "I'm a Computer Engineering graduate who approaches development with curiosity and attention to detail. I don't just put things together — I think about how the database queries run, how state flows through the app, and how to make the UI feel smooth and intuitive."}
            </p>
            <p className="body-text leading-relaxed font-sans">
              {profile?.aboutText2 || "My hands-on experience spans React frontends, Express.js backends, and both SQL and NoSQL databases. I've built projects ranging from AI-powered food safety platforms to full-featured web forums. Right now, I'm diving deeper into TypeScript, Docker, and prompt engineering."}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4" id="about_metric_badges">
              <div className="p-4 text-center glass-card glass-card-hover rounded-xl">
                <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">{profile?.metricCgpa || '9.12'}</span>
                <span className="text-xs body-text uppercase tracking-wider font-semibold">CGPA</span>
              </div>
              <div className="p-4 text-center glass-card glass-card-hover rounded-xl">
                <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{profile?.metricProjects || '5+'}</span>
                <span className="text-xs body-text uppercase tracking-wider font-semibold">Projects Built</span>
              </div>
              <div className="p-4 text-center glass-card glass-card-hover rounded-xl col-span-2 md:col-span-1">
                <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">{profile?.metricYear || '2026'}</span>
                <span className="text-xs body-text uppercase tracking-wider font-semibold">Graduating</span>
              </div>
            </div>
          </div>

          {/* Cards Panel */}
          <div className="lg:col-span-6 space-y-6" id="about_cards_block">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl glass-card glass-card-hover text-left flex items-start space-x-4 group"
              >
                <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 group-hover:bg-slate-900/50 transition-colors shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold heading-text group-hover:text-cyan-300 transition-colors">{card.title}</h4>
                  <p className="mt-1 text-sm body-text leading-relaxed font-sans">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
