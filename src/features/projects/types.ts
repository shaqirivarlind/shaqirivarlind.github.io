import type { Project } from "@/shared/type-data";

export enum TEXT_POSITION {
  TOP = "top",
  BOTTOM = "bottom",
}

export interface ProjectCardProps {
  project: Project;
  bgColor: string;
  textPosition: TEXT_POSITION;
}

export const PROJECTS_LIMIT = 8;
