import type { SkillCategory } from "@/shared/types";
import type { ResumeSkillGroup } from "./types";

export const RESUME_SKILL_GROUP_ORDER: ResumeSkillGroup[] = [
  "Frontend",
  "Backend",
  "Mobile",
  "CMS/Ecom",
  "DevOps/Tools",
];

export const RESUME_SKILL_CATEGORY_TO_GROUP: Record<SkillCategory, ResumeSkillGroup> = {
  languages: "Frontend",
  web: "Frontend",
  state: "Frontend",
  styling: "Frontend",
  design: "Frontend",
  desktop: "Frontend",

  api: "Backend",
  backend: "Backend",
  database: "Backend",
  auth: "Backend",
  ai: "Backend",
  search: "Backend",

  mobile: "Mobile",

  cms: "CMS/Ecom",

  build: "DevOps/Tools",
  testing: "DevOps/Tools",
  devops: "DevOps/Tools",
  monitoring: "DevOps/Tools",
  tools: "DevOps/Tools",
};

