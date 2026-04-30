export type ID = string;

export interface ListItem {
  primary: string;
  secondary?: string;
}

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance"
  | "Internship"
  | "Apprenticeship"
  | "Temporary"
  | "Volunteer";

export type WorkLocationType = "Remote" | "Hybrid" | "Onsite";

export type ProjectType =
  | "internal"
  | "client"
  | "freelance"
  | "open-source"
  | "consulting"
  | "personal";

export type SkillCategory =
  | "languages"
  | "web"
  | "state"
  | "styling"
  | "api"
  | "backend"
  | "database"
  | "auth"
  | "cms"
  | "build"
  | "testing"
  | "devops"
  | "monitoring"
  | "ai"
  | "search"
  | "design"
  | "tools"
  | "desktop"
  | "mobile";

export enum DbTableKey {
  Experiences = "experiences",
  Person = "person",
  Companies = "companies",
  Clients = "clients",
  Projects = "projects",
  Skills = "skills",
  Roles = "roles",
  Capabilities = "capabilities",
  Certificates = "certificates",
  Education = "education",
  Meta = "meta",
}
