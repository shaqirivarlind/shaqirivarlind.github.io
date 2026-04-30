import type {
  Person,
  Company,
  Capability,
  Client,
  Skill,
  Project,
  Role,
  Education,
  Certificate,
  Experiences,
} from "@/shared/type-data";

export type PersonState = {
  person: Person | null;
  educations: Education[];
  certificates: Certificate[];
  loading: boolean;
};

export type CompaniesState = {
  companies: Company[];
  loading: boolean;
};

export type CapabilitiesState = {
  capabilities: Capability[];
  loading: boolean;
};

export type SkillsState = {
  skills: Skill[];
  loading: boolean;
};

export type ProjectState = {
  projects: Project[];
  loading: boolean;
};

export type RolesState = {
  roles: Role[];
  loading: boolean;
};

export type ClientsState = {
  clients: Client[];
  loading: boolean;
};

export type ExperiencesState = {
  experiences: Experiences[];
  loading: boolean;
};
