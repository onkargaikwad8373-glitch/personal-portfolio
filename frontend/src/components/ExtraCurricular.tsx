import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Landmark, Zap } from 'lucide-react';
import { ExtraCurricular } from '../types';

interface ExtraCurricularProps {
  extraCurricularData: ExtraCurricular[];
}

export default function ExtraCurricularPanel({ extraCurricularData }: ExtraCurricularProps) {
  const items = extraCurricularData && extraCurricularData.length > 0 ? extraCurricularData : [];

  return (
    <section id="extracurricular" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative backdrop elements */}
      <span className="absolute left-1/3 top-10 h-72 w-72 bg-emerald-500/5 blur-3xl pointer-events-none" />
      <span className="absolute right-1/3 bottom-10 h-72 w-72 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="extracurricular_main_header">
          <h2 className="section-label text-sm font-semibold tracking-widest uppercase">06 / Extra-Curricular</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-extrabold heading-text">
            Extracurricular & Leadership
          </p>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-emerald-400 to-cyan-500 mx-auto rounded-full" />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-3xl mx-auto relative" id="extracurricular_timeline_container">
          
          {/* Vertical central shaft */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-800" />

          <div className="space-y-12">
            {items.map((extra, id) => {
              const isEven = id % 2 === 0;
              return (
                <motion.div
                  key={extra._id || id}
                  id={`extra_timeline_node_${extra._id || id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: id * 0.15 }}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline point indicator */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-[9px] top-1.5 z-20">
                    <div className="w-[18px] h-[18px] rounded-full bg-slate-950 border-[3px] border-emerald-400 flex items-center justify-center shadow-[0_0_8px_#10b981]" />
                  </div>

                  {/* Left spacer block (desktop only) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card wrapper */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-8">
                    <div className="p-6 rounded-2xl glass-card glass-card-hover text-left group">
                      
                      {/* Header block info */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 uppercase tracking-widest bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/20">
                          <Calendar className="w-3 h-3" />
                          {extra.duration}
                        </span>
                        
                        <Sparkles className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      </div>

                      <h3 className="text-lg font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                        {extra.activity}
                      </h3>

                      <div className="mt-2 space-y-1.5 text-slate-400 text-sm">
                        <p className="flex items-center gap-1.5 font-medium text-slate-200">
                          <Landmark className="w-4 h-4 text-slate-500 shrink-0" />
                          {extra.organization}
                        </p>
                      </div>

                      <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                        {extra.description}
                      </p>

                      {/* Achievements list */}
                      {extra.achievements && extra.achievements.length > 0 && (
                        <div className="mt-5 space-y-2 pt-4 border-t border-slate-800/80" id={`extra_achievements_${extra._id}`}>
                          <p className="text-[10px] font-extrabold uppercase text-slate-400 font-sans tracking-wide">
                            Key Details & Contributions
                          </p>
                          {extra.achievements.map((ach, aid) => (
                            <div key={aid} className="flex items-start gap-2 text-xs text-slate-350 leading-relaxed">
                              <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
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

          {items.length === 0 && (
            <div className="text-center p-8 text-slate-500" id="extracurricular_empty_state">
              No extracurricular activities loaded. Use the Admin Panel to configure activities.
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
