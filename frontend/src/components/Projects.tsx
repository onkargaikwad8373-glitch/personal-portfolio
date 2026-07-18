import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Star, Compass, Terminal, Shield } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projectsData: Project[];
}

export default function Projects({ projectsData }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'featured' | 'fullstack'>('all');

  const firstFeatured = projectsData.find(p => p.featured);

  const filtered = projectsData.filter((proj) => {
    if (filter === 'all') {
      // Exclude the flagship featured project from the main grid because it is highlighted in the banner above
      return !firstFeatured || proj._id !== firstFeatured._id;
    }
    if (filter === 'featured') return proj.featured;
    if (filter === 'fullstack') {
      return proj.techStack.some(t => 
        ['Node.js', 'Express', 'MongoDB', 'Python', 'Fullstack', 'Database'].includes(t)
      );
    }
    return true;
  });

  return (
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden">
      {/* Dynamic top gradient cover */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0b0f19] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12" id="projects_main_header">
          <h2 className="section-label text-sm font-semibold tracking-widest uppercase">04 / Projects</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-extrabold heading-text">
            Things I've Built
          </p>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Dynamic Project Filters Menu */}
        <div className="flex items-center justify-center gap-3 mb-16" id="projects_filter_controls">
          <button
            onClick={() => setFilter('all')}
            className={`px-4.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              filter === 'all'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            All Work ({projectsData.length})
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-4.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
              filter === 'featured'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Featured
          </button>
          <button
            onClick={() => setFilter('fullstack')}
            className={`px-4.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              filter === 'fullstack'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            Full Stack
          </button>
        </div>

        {/* Featured Card Stretcher (Highlight "ReserveKit") */}
        {filter === 'all' && (
          <div className="mb-14" id="projects_featured_showcase_block">
            {projectsData.filter(p => p.featured).slice(0, 1).map((fProj) => (
              <motion.div
                key={fProj._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl glass-card border-indigo-500/30 overflow-hidden shadow-2xl relative"
                id="featured_project_wrapper"
              >
                {/* Glowing effect inside featured card */}
                <span className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/5 blur-3xl pointer-events-none" />
                <span className="absolute bottom-0 left-0 h-40 w-40 bg-cyan-500/5 blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Image part */}
                  <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto min-h-[280px]">
                    <img 
                      src={fProj.projectImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=70'}
                      alt={fProj.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Featured ribbon */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-400 to-indigo-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      FLAGSHIP FEATURED PROJECT
                    </div>
                  </div>

                  {/* Core Content part */}
                  <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between text-left">
                    <div className="space-y-4">
                      <span className="font-mono text-[11px] text-cyan-400 tracking-wider">FEATURED PROJECT</span>
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                        {fProj.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
                        {fProj.description}
                      </p>

                      {/* Tech stack row */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {fProj.techStack.map((tech, tid) => (
                          <span 
                            key={tid}
                            className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Features bullets */}
                      <div className="space-y-2 pt-3" id="featured_features_bullets">
                        <p className="text-xs uppercase font-extrabold heading-text font-sans tracking-wider">Key Features</p>
                        {fProj.features.map((feat, fid) => (
                          <div key={fid} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-400">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 shrink-0 animate-pulse" />
                            <p>{feat}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Button row */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-8" id="featured_project_ctas">
                      <a
                        href={fProj.liveDemoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold transition-all text-sm flex items-center justify-center gap-2 active:scale-95 text-center cursor-pointer"
                        id="featured_live_demo_link"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live Demo
                      </a>
                      <a
                        href={fProj.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold transition-all text-sm flex items-center justify-center gap-2 active:scale-95 text-center cursor-pointer"
                        id="featured_source_code_link"
                      >
                        <Github className="w-4 h-4" />
                        View Source Code
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Standard Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="projects_grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((proj) => (
              <motion.div
                layout
                key={proj._id}
                id={`project_card_${proj._id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl glass-card glass-card-hover overflow-hidden text-left flex flex-col justify-between"
              >
                <div>
                  {/* Card head image banner */}
                  <div className="relative h-48 overflow-hidden pointer-events-none">
                    <img
                      src={proj.projectImage || 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=500&auto=format&fit=crop&q=70'}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {proj.featured && (
                      <span className="absolute top-3 left-3 bg-cyan-400 text-slate-950 font-sans font-bold text-[9px] uppercase px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                        <Star className="w-3 h-3 fill-current" />
                        Flagship
                      </span>
                    )}
                  </div>

                  {/* Core content */}
                  <div className="p-5.5 space-y-4">
                    <h4 className="text-lg font-display font-extrabold text-white tracking-tight line-clamp-1 leading-tight hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.techStack.slice(0, 4).map((tech, id) => (
                        <span
                          key={id}
                          className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] font-medium border border-slate-850"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.techStack.length > 4 && (
                        <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-500 text-[10px] font-medium border border-slate-850">
                          +{proj.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Features list (mini) */}
                    {proj.features && proj.features.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-850">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Included Features</p>
                        {proj.features.slice(0, 2).map((feat, idx) => (
                          <p key={idx} className="text-xs text-slate-450 truncate flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            {feat}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card CTA control buttons */}
                <div className="p-5.5 pt-0 grid grid-cols-2 gap-3.5">
                  <a
                    href={proj.liveDemoLink || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all text-nowrap cursor-pointer"
                    id={`live_demo_link_${proj._id}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                  <a
                    href={proj.githubLink || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all text-nowrap cursor-pointer"
                    id={`source_code_link_${proj._id}`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center p-12 text-slate-500 font-sans" id="projects_empty_state">
            No projects found matching the filter selection. Use the Admin Dashboard to add more projects.
          </div>
        )}

      </div>
    </section>
  );
}
