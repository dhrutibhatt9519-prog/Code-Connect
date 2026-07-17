import { SkillLevel } from './opportunity.model';

export interface Participant {
  fullName: string;
  email: string;
  phone: string;
  experienceLevel: SkillLevel;
  profileUrl?: string;
}

export interface SelectedPackage {
  packageId: string;
  packageName: string;
  unitPrice: number;
  quantity: number;
}

export type RegistrationStatus = 'Upcoming' | 'Completed' | 'Cancelled';

export interface Registration {
  id?: string;
  userId: string;
  opportunityId: string;
  opportunityTitle: string;
  opportunityDate: string;
  selectedPackage: SelectedPackage;
  participants: Participant[];
  total: number;
  referenceNumber: string;
  status: RegistrationStatus;
  createdAt: string;
}

export type CreateRegistration = Omit<Registration, 'id'>;
