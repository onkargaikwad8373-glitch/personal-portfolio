import React from 'react';
import { motion } from 'motion/react';
import { Award, Calendar, Landmark, ExternalLink } from 'lucide-react';
import { Certification } from '../types';

interface CertificationsProps {
  certificationsData: Certification[];
}

export default function Certifications({ certificationsData }: CertificationsProps) {
  const items = certificationsData && certificationsData.length > 0 ? certificationsData : [];

  return (
    <section id="certifications" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-x-0 h-40 top-0 bg-gradient-to-b from-[#0b0f19] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="certifications_section_heading">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-300 font-semibold">Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black heading-text tracking-tight">
            Certifications & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-sm sm:text-base body-text">
            Courses, competitions, and recognitions I've earned along the way.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="certifications_grid">
          {items.map((cert, id) => (
            <motion.div
              key={cert._id || id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: id * 0.08 }}
              className="p-6 rounded-2xl glass-card glass-card-hover text-left flex flex-col justify-between group h-full"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/10 group-hover:bg-cyan-500/15 transition-all">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">{cert.date}</span>
                </div>

                {/* Info Text */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {cert.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Landmark className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{cert.issuingOrganization}</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              {cert.credentialLink && (
                <div className="pt-6 mt-auto">
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider cursor-pointer group/link"
                  >
                    <span>View Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}

          {items.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 font-mono text-sm italic">
              No certifications indexed at the current moment. Keep checking back!
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
