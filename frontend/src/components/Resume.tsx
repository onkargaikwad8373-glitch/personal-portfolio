import React from 'react';
import { motion } from 'motion/react';
import { Download, Eye, CheckCircle2, ChevronRight } from 'lucide-react';
import { Profile } from '../types';

interface ResumeProps {
  profile?: Profile | null;
}

export default function Resume({ profile }: ResumeProps) {
  const name = profile?.name || 'Onkar Gaikwad';

  return (
    <section id="resume" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative blobs */}
      <span className="absolute left-10 top-1/4 h-80 w-80 bg-cyan-700/5 blur-3xl pointer-events-none" />
      <span className="absolute right-10 bottom-1/4 h-80 w-80 bg-indigo-700/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="resume_main_header">
          <h2 className="section-label text-sm font-semibold tracking-widest uppercase">07 / Resume</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-extrabold heading-text">
            Download My Resume
          </p>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-purple-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Resume Card */}
        <div className="max-w-4xl mx-auto" id="resume_card_container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl glass-card glass-card-hover p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 text-left"
          >
            {/* Background lighting flare */}
            <span className="absolute -top-12 -right-12 h-44 w-44 bg-indigo-500/10 blur-2xl rounded-full" />

            {/* Resume thumbnail preview */}
            <div className="relative shrink-0 w-full max-w-[200px] aspect-[1/1.41] rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-2xl flex flex-col justify-between group overflow-hidden" id="resume_thumbnail_mock">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-extrabold">OG</div>
                  <div className="space-y-1">
                    <div className="w-16 h-2 bg-slate-800 rounded" />
                    <div className="w-12 h-1.5 bg-slate-805 rounded" />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="w-full h-1.5 bg-indigo-500/10 border-l border-indigo-400 rounded-sm" />
                  <div className="w-full h-1 bg-slate-800 rounded" />
                  <div className="w-5/6 h-1 bg-slate-800 rounded" />
                  <div className="w-4/6 h-1 bg-slate-800 rounded" />
                </div>

                <div className="space-y-2 pt-2">
                  <div className="w-full h-1.5 bg-cyan-500/10 border-l border-cyan-400 rounded-sm" />
                  <div className="w-11/12 h-1 bg-slate-800 rounded" />
                  <div className="w-5/6 h-1 bg-slate-800 rounded" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[8px] font-mono muted-text">
                <span>© 2026 {name}</span>
                <span>resume.pdf</span>
              </div>

              {/* Hover shine effect */}
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Details */}
            <div className="space-y-6 flex-1" id="resume_details_container">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ATS-Friendly Format
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold heading-text tracking-tight">
                  My Resume
                </h3>
              </div>

              <p className="text-sm sm:text-base body-text leading-relaxed font-sans">
                My resume covers my education, internship experience, projects, and technical skills. It's formatted to be clean and easy to scan — optimized for both human recruiters and ATS systems.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 text-xs sm:text-sm heading-text" id="resume_features_grid">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-400 shrink-0" />
                  B.E. Computer Engineering
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-400 shrink-0" />
                  React & Node.js Projects
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-400 shrink-0" />
                  AI & Prompt Engineering
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-400 shrink-0" />
                  Real-World Internship
                </div>
              </div>

              {/* Download buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4" id="resume_links_group">
                <a
                  href="/api/resume/download"
                  download="Onkar_Gaikwad_Resume.pdf"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-sm tracking-wide text-center hover:opacity-95 shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  id="resume_direct_download_cta"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>

                <a
                  href="/api/resume/download"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 heading-text border border-slate-700 text-sm font-bold tracking-wide text-center flex items-center justify-center gap-2 transition-transform active:scale-95"
                  id="resume_inline_view_cta"
                >
                  <Eye className="w-4 h-4" />
                  View Online
                </a>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
