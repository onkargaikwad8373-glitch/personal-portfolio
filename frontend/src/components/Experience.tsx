import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Zap } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceProps {
  experienceData: Experience[];
}

export default function ExperiencePanel({ experienceData }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative backdrop elements */}
      <span className="absolute left-1/3 top-10 h-72 w-72 bg-indigo-500/5 blur-3xl pointer-events-none" />
      <span className="absolute right-1/3 bottom-10 h-72 w-72 bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="experience_main_header">
          <h2 className="section-label text-sm font-semibold tracking-widest uppercase">05 / Experience</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-extrabold heading-text">
            Where I've Worked & Contributed
          </p>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-purple-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Timeline body */}
        <div className="max-w-4xl mx-auto relative" id="experience_timeline_body">
          
          {/* Vertical central path */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-800" />

          {/* Cards List */}
          <div className="space-y-12">
            {experienceData.map((exp, id) => {
              const isEven = id % 2 === 0;
              return (
                <motion.div
                  key={exp._id || id}
                  id={`exp_timeline_node_${exp._id || id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: id * 0.1 }}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline central dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-[9px] top-2 z-20">
                    <div className="w-[18px] h-[18px] rounded-full bg-slate-950 border-[3px] border-purple-400 flex items-center justify-center shadow-[0_0_8px_#c084fc]" />
                  </div>

                  {/* Left spacer block */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-8">
                    <div className="p-6 sm:p-8 rounded-2xl glass-card glass-card-hover text-left group">
                      
                      {/* Timeline duration and badge group */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[11px]">
                          {exp.duration}
                        </span>
                        
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          exp.type === 'Internship' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                          exp.type === 'Freelance' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                          'bg-purple-500/10 text-purple-400 border border-purple-200/20'
                        }`}>
                          {exp.type || 'Internship'}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {exp.position}
                      </h3>

                      <p className="mt-1 font-medium font-display text-indigo-400 text-sm">
                        {exp.company}
                      </p>

                      <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                        {exp.description}
                      </p>

                      {/* Achievements list */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mt-5 space-y-2 pt-4 border-t border-slate-800/80" id={`exp_achievements_${exp._id}`}>
                          <p className="text-[10px] font-extrabold uppercase text-slate-400 font-sans tracking-wide">
                            Key Achievements & Responsibilities
                          </p>
                          {exp.achievements.map((ach, aid) => (
                            <div key={aid} className="flex items-start gap-2 text-xs text-slate-350 leading-relaxed">
                              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <p className="font-sans">{ach}</p>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {experienceData.length === 0 && (
            <div className="text-center p-12 text-slate-500 font-sans" id="experience_empty_state">
              No historical experiences configured. Go to Admin Dashboard to register roles.
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
