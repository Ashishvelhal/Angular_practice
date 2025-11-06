export interface User {
  id: number;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  firstName: string;
  lastName: string;
  phone?: string;
  isActive?: boolean;
  // Add other user properties as needed
}

export interface Patient extends User {
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  bloodType?: string;
  address?: string;
}

export interface Doctor extends User {
  specialization: string;
  licenseNumber: string;
  experienceYears: number;
  consultationFee: number;
  bio?: string;
}
