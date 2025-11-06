export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'doctor' | 'patient';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Additional fields specific to your application
  phoneNumber?: string;
  specialization?: string;
  avatar?: string;
}
