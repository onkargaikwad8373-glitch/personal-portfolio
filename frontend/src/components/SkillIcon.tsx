import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiHtml5,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiRedux,
  SiVite,
  SiWebpack,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiC,
  SiPhp,
  SiGo,
  SiRust,
  SiRuby,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiSpringboot,
  SiFastapi,
  SiGraphql,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiFirebase,
  SiSupabase,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiGithub,
  SiGitlab,
  SiLinux,
  SiUbuntu,
  SiFigma,
  SiPostman,
  SiOpencv,
  SiTensorflow,
  SiPytorch,
  SiAndroid,
  SiFlutter,
  SiKotlin,
  SiSwift,
  SiWordpress
} from 'react-icons/si';

import {
  FaJava,
  FaPython,
  FaCss3Alt,
  FaAws
} from 'react-icons/fa6';

import { TbBrandCSharp } from 'react-icons/tb';

import {
  Code2,
  Boxes,
  Network,
  Terminal,
  Database,
  Globe,
  Award,
  MessageSquare,
  Users,
  Clock,
  Brain,
  Layers,
  Cpu
} from 'lucide-react';

export interface TechIconEntry {
  key: string;
  name: string;
  color: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  regex: RegExp;
}

// Master tech catalog with official brand hex colors and regex matchers
export const TECH_CATALOG: TechIconEntry[] = [
  // Specific multi-char / tricky regexes first
  { key: 'cplusplus', name: 'C++', color: '#00599C', icon: SiCplusplus, regex: /(?:^|[\s,/(])c\+\+(?:[\s,/)]|$)/i },
  { key: 'csharp', name: 'C#', color: '#239120', icon: TbBrandCSharp, regex: /(?:^|[\s,/(])c#(?:[\s,/)]|$)/i },
  { key: 'c', name: 'C', color: '#A8B9CC', icon: SiC, regex: /(?:^|[\s,/(])c(?:\s+programming|\s+language)?(?:[\s,/)]|$)/i },
  { key: 'typescript', name: 'TypeScript', color: '#3178C6', icon: SiTypescript, regex: /\b(?:typescript|ts)\b/i },
  { key: 'javascript', name: 'JavaScript', color: '#F7DF1E', icon: SiJavascript, regex: /\b(?:javascript|js|es6)\b/i },
  { key: 'react', name: 'React', color: '#61DAFB', icon: SiReact, regex: /\breact(?:\.js)?\b/i },
  { key: 'nextjs', name: 'Next.js', color: '#FFFFFF', icon: SiNextdotjs, regex: /\bnext(?:\.js)?\b/i },
  { key: 'vue', name: 'Vue.js', color: '#42B883', icon: SiVuedotjs, regex: /\bvue(?:\.js)?\b/i },
  { key: 'angular', name: 'Angular', color: '#DD0031', icon: SiAngular, regex: /\bangular\b/i },
  { key: 'svelte', name: 'Svelte', color: '#FF3E00', icon: SiSvelte, regex: /\bsvelte\b/i },
  { key: 'tailwind', name: 'Tailwind CSS', color: '#06B6D4', icon: SiTailwindcss, regex: /\btailwind(?:\s*css)?\b/i },
  { key: 'bootstrap', name: 'Bootstrap', color: '#7952B3', icon: SiBootstrap, regex: /\bbootstrap\b/i },
  { key: 'html', name: 'HTML5', color: '#E34F26', icon: SiHtml5, regex: /\bhtml5?\b/i },
  { key: 'css', name: 'CSS3', color: '#1572B6', icon: FaCss3Alt, regex: /\bcss3?\b/i },
  { key: 'sass', name: 'Sass', color: '#CC6699', icon: SiSass, regex: /\b(?:sass|scss)\b/i },
  { key: 'redux', name: 'Redux', color: '#764ABC', icon: SiRedux, regex: /\bredux\b/i },
  
  // Backend & Languages
  { key: 'java', name: 'Java', color: '#ED8B00', icon: FaJava, regex: /\bjava\b(?!script)/i },
  { key: 'python', name: 'Python', color: '#3776AB', icon: FaPython, regex: /\bpython\b/i },
  { key: 'node', name: 'Node.js', color: '#5FA04E', icon: SiNodedotjs, regex: /\bnode(?:\.js)?\b/i },
  { key: 'express', name: 'Express.js', color: '#E5E7EB', icon: SiExpress, regex: /\bexpress(?:\.js)?\b/i },
  { key: 'php', name: 'PHP', color: '#777BB4', icon: SiPhp, regex: /\bphp\b/i },
  { key: 'go', name: 'Go', color: '#00ADD8', icon: SiGo, regex: /\b(?:golang|go)\b/i },
  { key: 'rust', name: 'Rust', color: '#DEA584', icon: SiRust, regex: /\brust\b/i },
  { key: 'ruby', name: 'Ruby', color: '#CC342D', icon: SiRuby, regex: /\bruby\b/i },
  { key: 'spring', name: 'Spring Boot', color: '#6DB33F', icon: SiSpringboot, regex: /\b(?:spring(?:\s*boot)?|springboot)\b/i },
  { key: 'django', name: 'Django', color: '#2BA977', icon: SiDjango, regex: /\bdjango\b/i },
  { key: 'flask', name: 'Flask', color: '#FFFFFF', icon: SiFlask, regex: /\bflask\b/i },
  { key: 'fastapi', name: 'FastAPI', color: '#009688', icon: SiFastapi, regex: /\bfastapi\b/i },
  { key: 'graphql', name: 'GraphQL', color: '#E10098', icon: SiGraphql, regex: /\bgraphql\b/i },

  // Databases
  { key: 'mysql', name: 'MySQL', color: '#4479A1', icon: SiMysql, regex: /\bmysql\b/i },
  { key: 'postgresql', name: 'PostgreSQL', color: '#4169E1', icon: SiPostgresql, regex: /\b(?:postgresql|postgres)\b/i },
  { key: 'mongodb', name: 'MongoDB', color: '#47A248', icon: SiMongodb, regex: /\b(?:mongodb|mongo)\b/i },
  { key: 'redis', name: 'Redis', color: '#FF4438', icon: SiRedis, regex: /\bredis\b/i },
  { key: 'sqlite', name: 'SQLite', color: '#003B57', icon: SiSqlite, regex: /\bsqlite\b/i },
  { key: 'firebase', name: 'Firebase', color: '#FFCA28', icon: SiFirebase, regex: /\bfirebase\b/i },
  { key: 'supabase', name: 'Supabase', color: '#3ECF8E', icon: SiSupabase, regex: /\bsupabase\b/i },
  { key: 'prisma', name: 'Prisma', color: '#2D3748', icon: SiPrisma, regex: /\bprisma\b/i },

  // Tools, Cloud & DevOps
  { key: 'docker', name: 'Docker', color: '#2496ED', icon: SiDocker, regex: /\bdocker\b/i },
  { key: 'kubernetes', name: 'Kubernetes', color: '#326CE5', icon: SiKubernetes, regex: /\b(?:kubernetes|k8s)\b/i },
  { key: 'aws', name: 'AWS', color: '#FF9900', icon: FaAws, regex: /\b(?:aws|amazon\s+web\s+services)\b/i },
  { key: 'git', name: 'Git', color: '#F05032', icon: SiGit, regex: /\bgit\b(?!hub|lab)/i },
  { key: 'github', name: 'GitHub', color: '#F0F6FC', icon: SiGithub, regex: /\bgithub\b/i },
  { key: 'gitlab', name: 'GitLab', color: '#FC6D26', icon: SiGitlab, regex: /\bgitlab\b/i },
  { key: 'linux', name: 'Linux', color: '#FCC624', icon: SiLinux, regex: /\blinux\b/i },
  { key: 'ubuntu', name: 'Ubuntu', color: '#E95420', icon: SiUbuntu, regex: /\bubuntu\b/i },
  { key: 'figma', name: 'Figma', color: '#F24E1E', icon: SiFigma, regex: /\bfigma\b/i },
  { key: 'postman', name: 'Postman', color: '#FF6C37', icon: SiPostman, regex: /\bpostman\b/i },
  { key: 'vite', name: 'Vite', color: '#646CFF', icon: SiVite, regex: /\bvite\b/i },
  { key: 'webpack', name: 'Webpack', color: '#8DD6F9', icon: SiWebpack, regex: /\bwebpack\b/i },
  { key: 'opencv', name: 'OpenCV', color: '#5C3EE8', icon: SiOpencv, regex: /\bopencv\b/i },
  { key: 'tensorflow', name: 'TensorFlow', color: '#FF6F00', icon: SiTensorflow, regex: /\btensorflow\b/i },
  { key: 'pytorch', name: 'PyTorch', color: '#EE4C2C', icon: SiPytorch, regex: /\bpytorch\b/i },
  { key: 'android', name: 'Android', color: '#3DDC84', icon: SiAndroid, regex: /\bandroid\b/i },
  { key: 'flutter', name: 'Flutter', color: '#02569B', icon: SiFlutter, regex: /\bflutter\b/i },
  { key: 'kotlin', name: 'Kotlin', color: '#7F52FF', icon: SiKotlin, regex: /\bkotlin\b/i },
  { key: 'swift', name: 'Swift', color: '#F05138', icon: SiSwift, regex: /\bswift\b/i },
  { key: 'wordpress', name: 'WordPress', color: '#21759B', icon: SiWordpress, regex: /\bwordpress\b/i },

  // Computer Science Core Concepts
  { key: 'cns', name: 'Computer Networks', color: '#60A5FA', icon: Network as any, regex: /\b(?:networks?|cns|networking)\b/i },
  { key: 'oop', name: 'OOP', color: '#EC4899', icon: Boxes as any, regex: /\b(?:oop|object-oriented|object oriented)\b/i },
  { key: 'dsa', name: 'DSA', color: '#F43F5E', icon: Code2 as any, regex: /\b(?:dsa|data\s+structures|algorithms)\b/i },
  { key: 'os', name: 'Operating Systems', color: '#F59E0B', icon: Terminal as any, regex: /\b(?:operating\s+systems?|os)\b/i },
  { key: 'dbms', name: 'DBMS', color: '#10B981', icon: Database as any, regex: /\b(?:dbms|database\s+management)\b/i },

  // Professional & Soft Skills
  { key: 'leadership', name: 'Leadership', color: '#F59E0B', icon: Award as any, regex: /\bleadership\b/i },
  { key: 'communication', name: 'Communication', color: '#38BDF8', icon: MessageSquare as any, regex: /\bcommunication\b/i },
  { key: 'teamwork', name: 'Teamwork', color: '#A855F7', icon: Users as any, regex: /\b(?:teamwork|collaboration)\b/i },
  { key: 'time_management', name: 'Time Management', color: '#34D399', icon: Clock as any, regex: /\btime\s+management\b/i },
  { key: 'problem_solving', name: 'Problem Solving', color: '#EAB308', icon: Brain as any, regex: /\bproblem\s+solving\b/i },

  // Generic full stack
  { key: 'fullstack', name: 'Full Stack', color: '#8B5CF6', icon: Layers as any, regex: /\bfull\s*stack\b/i },
  { key: 'webdev', name: 'Web Dev', color: '#06B6D4', icon: Globe as any, regex: /\bweb\s+development\b/i }
];

export function getMatchedTechIcons(skillName: string): TechIconEntry[] {
  if (!skillName) return [];
  const matches: TechIconEntry[] = [];
  const seenKeys = new Set<string>();

  for (const entry of TECH_CATALOG) {
    if (entry.regex.test(skillName)) {
      if (!seenKeys.has(entry.key)) {
        seenKeys.add(entry.key);
        matches.push(entry);
      }
    }
  }

  // Handle special case where fullstack or webdev was matched along with specific techs:
  // If specific techs exist (like React, Node, etc.), prefer the specific ones
  if (matches.length > 1) {
    const hasSpecific = matches.some(m => m.key !== 'fullstack' && m.key !== 'webdev');
    if (hasSpecific) {
      return matches.filter(m => m.key !== 'fullstack' && m.key !== 'webdev');
    }
  }

  return matches;
}

interface SkillIconProps {
  name: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SkillIcon({ name, icon, size = 'md' }: SkillIconProps) {
  // 1. Direct custom image URL / uploaded asset
  if (icon && (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/uploads/') || icon.startsWith('data:image'))) {
    return (
      <img
        src={icon}
        alt={name}
        className="w-full h-full object-contain rounded"
        loading="lazy"
      />
    );
  }

  // 2. Direct named icon if icon prop provided
  if (icon) {
    const directMatch = TECH_CATALOG.find(t => t.key.toLowerCase() === icon.toLowerCase() || t.name.toLowerCase() === icon.toLowerCase());
    if (directMatch) {
      const IconComponent = directMatch.icon;
      return (
        <IconComponent
          className="w-4 h-4 transition-transform group-hover:scale-110"
          style={{ color: directMatch.color }}
        />
      );
    }
  }

  // 3. Match against tech catalog
  const matches = getMatchedTechIcons(name);

  if (matches.length === 0) {
    // Default fallback icon
    return <Code2 className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />;
  }

  if (matches.length === 1) {
    const single = matches[0];
    const IconComponent = single.icon;
    return (
      <IconComponent
        className="w-4 h-4 transition-transform group-hover:scale-110"
        style={{ color: single.color }}
      />
    );
  }

  // Multiple matched technologies (e.g. React, PHP, Node or HTML, CSS, Tailwind)
  // Display up to 3 distinct mini icons side by side
  const topMatches = matches.slice(0, 3);
  return (
    <div className="flex items-center gap-1">
      {topMatches.map((m) => {
        const IconComponent = m.icon;
        return (
          <IconComponent
            key={m.key}
            className="w-3.5 h-3.5 transition-transform group-hover:scale-110"
            style={{ color: m.color }}
            title={m.name}
          />
        );
      })}
    </div>
  );
}

