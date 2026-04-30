import type {
  EmploymentType,
  ID,
  ProjectType,
  SkillCategory,
  WorkLocationType,
} from "./types";

export interface DateRange {
  start: string;
  end?: string;
}

export interface Company {
  id: ID;
  name: string;
  location: string;
  links: Array<{ label: string; url: string }>;
  logo: string;
  description: string;
}

export interface Client {
  id: ID;
  name: string;
  location: string;
  links: Array<{ label: string; url: string }>;
  logo: string;
  description: string;
}

export interface Skill {
  id: ID;
  label: string;
  category: SkillCategory;
  orderWeight: number;
  logo: string;
}

export interface Role {
  id: ID;
  companyId: ID;
  title: string;
  employmentType: EmploymentType;
  workType: WorkLocationType;
  dateRange: DateRange;
  summary?: string;
  projectIds: ID[];
  achievements: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: ID;
  name: string;
  projectType: ProjectType;
  roleIds: ID[];
  clientId: ID | null;
  skillIds: ID[];
  summary: string;
  links: Array<{ label: string; url: string }>;
  images: ProjectImage[];
  overview: string;
  achievements: string[];
  hideOnHomepage?: boolean;
  hideOnResume?: boolean;
}

export interface PersonLanguage {
  language: string;
  level: string;
}

export interface ContactLink {
  url: string;
  type: string;
  icon: string;
  target?: "_blank" | "_self";
}

export interface PersonContact {
  label: string;
  value: string;
  link?: ContactLink;
}

export interface Person {
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  bio: string;
  contacts: PersonContact[];
  languages: PersonLanguage[];
}

export interface Capability {
  id: ID;
  title: string;
  icon: string;
  items: string[];
}

export interface Certificate {
  id: ID;
  category: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl: string;
  relatedSkillIds: ID[];
}

export interface Recommendation {
  id: ID;
  name: string;
  description?: string;
  letterUrl?: string;
}

export interface Education {
  id: ID;
  institution: string;
  degree?: string;
  field?: string;
  dateRange?: DateRange;
  links: Array<{ label: string; url: string }>;
  notes: string[];
}

export interface Experiences {
  id: ID;
  companyId: ID;
  dateRange: DateRange;
  roleIds: ID[];
  visible?: boolean;
}
