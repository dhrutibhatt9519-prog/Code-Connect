export type OpportunityCategory = 'Workshop' | 'Hackathon' | 'Conference' | 'Mentorship' | 'Career Event' | 'Bootcamp' | 'Open Source';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type OpportunityFormat = 'Online' | 'In Person' | 'Hybrid';

export interface RegistrationPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  available: number;
  perks: string[];
}

export interface Speaker {
  name: string;
  role: string;
  company: string;
  bio: string;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Opportunity {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: OpportunityCategory;
  startDate: string;
  endDate: string;
  format: OpportunityFormat;
  location: string;
  level: SkillLevel;
  technologies: string[];
  startingPrice: number;
  organizer: string;
  bannerImage: string;
  heroImage: string;
  agenda: string[];
  prerequisites: string[];
  speakers: Speaker[];
  packages: RegistrationPackage[];
  faq: FaqItem[];
}
