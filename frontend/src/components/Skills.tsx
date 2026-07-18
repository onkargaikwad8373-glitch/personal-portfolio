import React from 'react';
import { motion } from 'motion/react';
import { Code2, Globe, Database, Cpu, Hammer, BookOpen } from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skillsData: Skill[];
}

export default function Skills({ skillsData }: SkillsProps) {
  // Let's group skills by category
  const categories: Array<{
    id: typeof skillsData[number]['category'];
    label: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    { id: 'Programming Languages', label: 'Languages', icon: <Code2 className="w-5 h-5" />, color: 'text-cyan-400 border-cyan-500/20 shadow-cyan-500/5' },
    { id: 'Frontend', label: 'Frontend UI', icon: <Globe className="w-5 h-5" />, color: 'text-indigo-400 border-indigo-500/20 shadow-indigo-500/5' },
    { id: 'Backend', label: 'Backend Orchestration', icon: <Cpu className="w-5 h-5" />, color: 'text-purple-400 border-purple-500/20 shadow-purple-500/5' },
    { id: 'Database', label: 'Database & Caching', icon: <Database className="w-5 h-5" />, color: 'text-emerald-400 border-emerald-500/20 shadow-emerald-500/5' },
    { id: 'Tools & Platforms', label: 'Tools & Ecosystems', icon: <Hammer className="w-5 h-5" />, color: 'text-pink-400 border-pink-500/20 shadow-pink-500/5' },
    { id: 'Currently Learning', label: 'Currently Exploring', icon: <BookOpen className="w-5 h-5" />, color: 'text-amber-400 border-amber-500/20 shadow-amber-500/5' },
  ];

  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative styling */}
      <div className="absolute right-10 top-1/3 w-80 h-80 rounded-full bg-cyan-700/5 blur-3xl" />
      <div className="absolute left-10 bottom-1/3 w-80 h-80 rounded-full bg-indigo-700/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="skills_main_header">
          <h2 className="section-label text-sm font-semibold tracking-widest uppercase">03 / Skills</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-extrabold heading-text">
            My Technical Skills
          </p>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="skills_categories_grid">
          {categories.map((cat, idx) => {
            const filteredSkills = skillsData.filter(s => s.category === cat.id);
            
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-2xl glass-card glass-card-hover text-left flex flex-col justify-between"
                id={`skill_category_card_${idx}`}
              >
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`p-2 rounded-xl bg-slate-950 border border-slate-800 ${cat.color.split(' ')[0]}`}>
                      {cat.icon}
                    </div>
                    <h3 className="text-lg font-display font-bold text-white tracking-tight">
                      {cat.label}
                    </h3>
                  </div>

                  <div className="space-y-4" id={`skills_under_category_${idx}`}>
                    {filteredSkills.map((skill) => (
                      <div key={skill._id} className="space-y-1.5 group" id={`skill_row_${skill._id}`}>
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-slate-200 group-hover:text-cyan-300 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-slate-500 font-mono">
                            {skill.proficiency}%
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`h-full rounded-full bg-gradient-to-r ${
                              cat.id === 'Programming Languages' ? 'from-cyan-500 to-indigo-500' :
                              cat.id === 'Frontend' ? 'from-indigo-500 to-purple-500' :
                              cat.id === 'Backend' ? 'from-purple-500 to-pink-500' :
                              cat.id === 'Database' ? 'from-emerald-500 to-teal-500' :
                              cat.id === 'Tools & Platforms' ? 'from-pink-500 to-rose-500' :
                              'from-amber-500 to-orange-500'
                            }`}
                          />
                        </div>
                      </div>
                    ))}

                    {filteredSkills.length === 0 && (
                      <p className="text-xs text-slate-500 italic py-2">No skills loaded here.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
