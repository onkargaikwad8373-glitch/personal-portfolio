import React from 'react';
import { motion } from 'motion/react';
import { Code2, Globe, Database, Cpu, Hammer, BookOpen, Terminal, Award } from 'lucide-react';
import { Skill } from '../types';
import SkillIcon from './SkillIcon';

interface SkillsProps {
  skillsData: Skill[];
}

interface CategoryDef {
  id: string;
  aliases: string[];
  label: string;
  icon: React.ReactNode;
  color: string;
  progressBarGradient: string;
}

export default function Skills({ skillsData }: SkillsProps) {
  const categoryDefinitions: CategoryDef[] = [
    {
      id: 'Programming Languages',
      aliases: ['programming languages', 'languages', 'programming'],
      label: 'Languages',
      icon: <Code2 className="w-5 h-5" />,
      color: 'text-cyan-400 border-cyan-500/20 shadow-cyan-500/5',
      progressBarGradient: 'from-cyan-500 to-indigo-500'
    },
    {
      id: 'Frontend',
      aliases: ['frontend', 'frontend ui', 'web development', 'frontend code', 'web dev'],
      label: 'Frontend UI & Web',
      icon: <Globe className="w-5 h-5" />,
      color: 'text-indigo-400 border-indigo-500/20 shadow-indigo-500/5',
      progressBarGradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'Backend',
      aliases: ['backend', 'backend orchestration', 'backend code'],
      label: 'Backend Orchestration',
      icon: <Cpu className="w-5 h-5" />,
      color: 'text-purple-400 border-purple-500/20 shadow-purple-500/5',
      progressBarGradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'Database',
      aliases: ['database', 'databases', 'database & caching', 'database structures'],
      label: 'Database & Caching',
      icon: <Database className="w-5 h-5" />,
      color: 'text-emerald-400 border-emerald-500/20 shadow-emerald-500/5',
      progressBarGradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'Tools & Platforms',
      aliases: ['tools & platforms', 'tools & ecosystems', 'devops', 'cloud & tools', 'tools'],
      label: 'Tools & Ecosystems',
      icon: <Hammer className="w-5 h-5" />,
      color: 'text-pink-400 border-pink-500/20 shadow-pink-500/5',
      progressBarGradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 'Computer Science Core',
      aliases: ['computer science core', 'cs fundamentals', 'core cs', 'cs core'],
      label: 'CS Fundamentals & Core',
      icon: <Terminal className="w-5 h-5" />,
      color: 'text-sky-400 border-sky-500/20 shadow-sky-500/5',
      progressBarGradient: 'from-sky-500 to-blue-500'
    },
    {
      id: 'Soft Skills',
      aliases: ['soft skills', 'professional skills', 'leadership & soft skills'],
      label: 'Professional & Soft Skills',
      icon: <Award className="w-5 h-5" />,
      color: 'text-amber-400 border-amber-500/20 shadow-amber-500/5',
      progressBarGradient: 'from-amber-500 to-orange-500'
    },
    {
      id: 'Currently Learning',
      aliases: ['currently learning', 'currently exploring', 'exploring'],
      label: 'Currently Exploring',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'text-rose-400 border-rose-500/20 shadow-rose-500/5',
      progressBarGradient: 'from-rose-500 to-amber-500'
    }
  ];

  // Group skills according to category definitions
  const groupedCategories: Array<{
    categoryDef: CategoryDef;
    skills: Skill[];
  }> = [];

  const allocatedSkillIds = new Set<string>();

  categoryDefinitions.forEach((catDef) => {
    const matchingSkills = skillsData.filter((s) => {
      const catLower = (s.category || '').toLowerCase().trim();
      return catDef.aliases.some((alias) => alias.toLowerCase() === catLower);
    });

    if (matchingSkills.length > 0) {
      matchingSkills.forEach((s) => allocatedSkillIds.add(s._id));
      groupedCategories.push({
        categoryDef: catDef,
        skills: matchingSkills
      });
    }
  });

  // Catch any remaining skills with non-standard categories
  const leftoverSkills = skillsData.filter((s) => !allocatedSkillIds.has(s._id));
  if (leftoverSkills.length > 0) {
    const leftoverGroups = new Map<string, Skill[]>();
    leftoverSkills.forEach((s) => {
      const key = s.category || 'Other Skills';
      if (!leftoverGroups.has(key)) leftoverGroups.set(key, []);
      leftoverGroups.get(key)!.push(s);
    });

    leftoverGroups.forEach((skills, catName) => {
      groupedCategories.push({
        categoryDef: {
          id: catName,
          aliases: [catName.toLowerCase()],
          label: catName,
          icon: <Code2 className="w-5 h-5" />,
          color: 'text-cyan-400 border-cyan-500/20 shadow-cyan-500/5',
          progressBarGradient: 'from-cyan-500 to-indigo-500'
        },
        skills
      });
    });
  }

  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute right-10 top-1/3 w-80 h-80 rounded-full bg-cyan-700/5 blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-1/3 w-80 h-80 rounded-full bg-indigo-700/5 blur-3xl pointer-events-none" />

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
          {groupedCategories.map(({ categoryDef, skills }, idx) => (
            <motion.div
              key={categoryDef.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-2xl glass-card glass-card-hover text-left flex flex-col justify-between"
              id={`skill_category_card_${idx}`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-2 rounded-xl bg-slate-950 border border-slate-800 ${categoryDef.color.split(' ')[0]}`}>
                    {categoryDef.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white tracking-tight">
                    {categoryDef.label}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4" id={`skills_under_category_${idx}`}>
                  {skills.map((skill) => (
                    <div key={skill._id} className="space-y-2 group" id={`skill_row_${skill._id}`}>
                      {/* Top Row: Logo Badge + Skill Name + Proficiency % */}
                      <div className="flex items-center justify-between text-xs font-medium">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Tech Logo Micro-Badge */}
                          <div className="h-7 min-w-[28px] px-1.5 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-center shrink-0 shadow-inner group-hover:border-cyan-500/40 group-hover:bg-slate-850 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all duration-300">
                            <SkillIcon name={skill.name} icon={skill.icon} />
                          </div>
                          
                          {/* Skill Name */}
                          <span className="text-slate-200 group-hover:text-cyan-300 transition-colors font-medium truncate">
                            {skill.name}
                          </span>
                        </div>

                        {/* Proficiency Percentage */}
                        <span className="text-slate-500 group-hover:text-cyan-400 font-mono text-[11px] font-semibold transition-colors shrink-0 ml-2">
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
                          className={`h-full rounded-full bg-gradient-to-r ${categoryDef.progressBarGradient}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
