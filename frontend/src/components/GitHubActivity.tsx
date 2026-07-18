import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Star, ExternalLink, Code2 } from 'lucide-react';

interface GithubRepo {
  name: string;
  description: string;
  stars: number;
  language: string;
  repoUrl: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-500',
  Python: 'bg-emerald-500',
  Java: 'bg-orange-500',
  PHP: 'bg-indigo-500',
  HTML: 'bg-red-500',
  CSS: 'bg-purple-500',
  Code: 'bg-slate-500'
};

export default function GitHubActivity() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github');
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        }
      } catch (err) {
        console.log('GitHub repos fetch skipped.');
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <section id="github" className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-slate-800 rounded mx-auto" />
            <div className="h-10 w-72 bg-slate-800 rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (repos.length === 0) return null;

  return (
    <section id="github" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative elements */}
      <span className="absolute right-0 top-1/4 h-72 w-72 bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="github_section_header">
          <h2 className="section-label text-sm font-semibold tracking-widest uppercase">GitHub Activity</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-extrabold heading-text">
            What I've Been Building
          </p>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-emerald-400 to-cyan-500 mx-auto rounded-full" />
          <p className="mt-4 text-sm sm:text-base body-text max-w-xl mx-auto">
            A live look at my recent open-source work and side projects on GitHub.
          </p>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="github_repos_grid">
          {repos.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={repo.repoUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-5 rounded-2xl glass-card glass-card-hover text-left flex flex-col justify-between group cursor-pointer"
              id={`github_repo_${repo.name}`}
            >
              <div className="space-y-3">
                {/* Repo name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 icon-muted" />
                    <h3 className="text-sm font-display font-bold heading-text group-hover:text-cyan-400 transition-colors truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 icon-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Description */}
                <p className="text-xs body-text leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
              </div>

              {/* Footer: language + stars */}
              <div className="flex items-center justify-between pt-4 mt-auto">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${LANGUAGE_COLORS[repo.language] || 'bg-slate-500'}`} />
                  <span className="text-[11px] font-medium body-text">{repo.language}</span>
                </div>
                {repo.stars > 0 && (
                  <div className="flex items-center gap-1 text-[11px] body-text">
                    <Star className="w-3 h-3" />
                    {repo.stars}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        {/* GitHub Profile Link */}
        <div className="text-center mt-10">
          <a
            href="https://github.com/onkargaikwad"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-sm font-semibold heading-text transition-all active:scale-95"
            id="github_profile_cta"
          >
            <Github className="w-4 h-4" />
            View Full GitHub Profile
          </a>
        </div>

      </div>
    </section>
  );
}
