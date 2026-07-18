import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, Landmark } from 'lucide-react';
import { Education } from '../types';

interface EducationProps {
  educationData: Education[];
}

export default function EducationPanel({ educationData }: EducationProps) {
  // Safe sorting if needed
  const items = educationData && educationData.length > 0 ? educationData : [];

  return (
    <section id="education" className="py-24 bg-transparent relative overflow-hidden">
      {/* Visual styling grid */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b0f19] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="education_main_header">
          <h2 className="section-label text-sm font-semibold tracking-widest uppercase">02 / Education</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-extrabold heading-text">
            My Education
          </p>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-3xl mx-auto relative" id="education_timeline_container">
          
          {/* Vertical central shaft */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-800" />

          <div className="space-y-12">
            {items.map((edu, id) => {
              const isEven = id % 2 === 0;
              return (
                <motion.div
                  key={edu._id || id}
                  id={`edu_timeline_node_${edu._id || id}`}
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
                    <div className="w-[18px] h-[18px] rounded-full bg-slate-950 border-[3px] border-indigo-400 flex items-center justify-center shadow-[0_0_8px_#818cf8]" />
                  </div>

                  {/* Left spacer block (desktop only) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card wrapper */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-8">
                    <div className="p-6 rounded-2xl glass-card glass-card-hover text-left group">
                      
                      {/* Header block info */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-800/20">
                          <Calendar className="w-3 h-3" />
                          {edu.duration}
                        </span>
                        
                        <GraduationCap className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                      </div>

                      <h3 className="text-lg font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                        {edu.degree}
                      </h3>

                      <div className="mt-2 space-y-1.5 text-slate-400 text-sm">
                        <p className="flex items-center gap-1.5 font-medium text-slate-200">
                          <Landmark className="w-4 h-4 text-slate-500 shrink-0" />
                          {edu.collegeName}
                        </p>
                        {edu.university && (
                          <p className="pl-5 text-xs text-slate-500">
                            {edu.university}
                          </p>
                        )}
                      </div>

                      {/* CGPA progress bar badge */}
                      {edu.cgpaOrPercentage && (
                        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber-500" />
                            <span className="text-xs text-slate-400 font-medium font-sans">Academic Score:</span>
                          </div>
                          <span className="text-sm font-bold text-emerald-400 font-mono">
                            {edu.cgpaOrPercentage}
                          </span>
                        </div>
                      )}

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {educationData.length === 0 && (
            <div className="text-center p-8 text-slate-500" id="education_empty_state">
              No education history loaded. Use the Admin Panel to configure degree objects.
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
