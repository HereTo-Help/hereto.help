export interface Project {
  id: string;
  name: string;
  category: string;
  status: string;
  stage: string;
  theme: string;
  image: string;
  headline: string;
  summary: string;
  title: string;
  description: string;
  notice: string;
  url: string;
  goals: string[];
  research?: string;
  features?: { title: string; text: string }[];
  recruitment?: {
    title: string;
    text: string;
    roles: { id: string; title: string; text: string }[];
  };
}
