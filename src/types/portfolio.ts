// src/types/portfolio.ts

export interface ProjectStructure {
  id: string;
  title: string;
  category: string;
  description: string;
  videoLink?: string;
  metrics: { label: string; value: string }[];
  architectureBlocks: string[];
  techStack: string[];
}

export interface UserProfile {
  name: string;
  title: string;
  specialism: string[];
}