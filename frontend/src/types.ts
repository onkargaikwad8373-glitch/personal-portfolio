export interface BaseEntity {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project extends BaseEntity {
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  githubLink: string;
  liveDemoLink: string;
  projectImage: string;
  featured: boolean;
}

export interface Skill extends BaseEntity {
  name: string;
  category: 'Programming Languages' | 'Frontend' | 'Backend' | 'Database' | 'Tools & Platforms' | 'Currently Learning';
  proficiency: number; // 0 to 100
}

export interface Education extends BaseEntity {
  degree: string;
  collegeName: string;
  university: string;
  duration: string;
  cgpaOrPercentage: string;
}

export interface Experience extends BaseEntity {
  position: string;
  company: string; // or Organization
  duration: string;
  description: string;
  achievements?: string[];
  type?: 'Internship' | 'Freelance' | 'Personal';
}

export interface ExtraCurricular extends BaseEntity {
  activity: string;
  organization: string;
  duration: string;
  description: string;
  achievements?: string[];
}


export interface Certification extends BaseEntity {
  name: string;
  issuingOrganization: string;
  date: string;
  credentialLink: string;
}

export interface ContactMessage extends BaseEntity {
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
}

export interface VisitorLog extends BaseEntity {
  device: string;
  browser: string;
  country: string;
  visitTime: string;
}

export interface DashboardStats {
  totalVisitors: number;
  totalContactMessages: number;
  totalProjects: number;
  totalSkills: number;
  totalEducation: number;
  totalCertifications: number;
  totalExtraCurricular: number;
  visitorLogs: VisitorLog[];
}

export interface Profile extends BaseEntity {
  name: string;
  title: string;
  location: string;
  bio: string;
  avatarUrl: string;
  github: string;
  linkedin: string;
  email: string;
  instagram: string;
  phone: string;
  aboutHeading: string;
  aboutText1: string;
  aboutText2: string;
  metricCgpa: string;
  metricProjects: string;
  metricYear: string;
  aboutCard1Title: string;
  aboutCard1Desc: string;
  aboutCard2Title: string;
  aboutCard2Desc: string;
  aboutCard3Title: string;
  aboutCard3Desc: string;
}
