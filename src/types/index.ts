export interface SkillItem {
  name: string;
  highlight: boolean;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  github: string;
  npm: string; // NEW: NPM profile URL
  location: string;
  targetCompany: string;
  targetJobTitle: string;
  targeting: string;
  headline: string;
  summary: string;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: string;
  npmPackages?: string[];
}

export interface Paragraph {
  title?: string;
  text: string;
}

export interface CoverData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  github: string;
  npm: string; // NEW: NPM profile URL
  location: string;
  targeting: string;
  recipient_name: string;
  company_name: string;
  company_address?: string;
  job_title: string;
  paragraphs: Paragraph[];
}
