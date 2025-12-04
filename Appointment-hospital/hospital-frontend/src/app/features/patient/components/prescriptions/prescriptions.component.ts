import { Component, OnInit } from '@angular/core';

interface Prescription {
  id: number;
  doctorName: string;
  date: string;
  diagnosis: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  instructions: string;
  status: 'active' | 'completed' | 'expired';
}

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {
  prescriptions: Prescription[] = [];
  selectedPrescription: Prescription | null = null;
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {
    this.isLoading = true;
    
    // Sample data - in a real app, this would come from a service
    setTimeout(() => {
      this.prescriptions = [
        {
          id: 1,
          doctorName: 'Dr. Sarah Smith',
          date: '2024-01-15',
          diagnosis: 'Hypertension',
          medications: [
            { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
            { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' }
          ],
          instructions: 'Take medications with food. Monitor blood pressure daily.',
          status: 'active'
        },
        {
          id: 2,
          doctorName: 'Dr. Michael Johnson',
          date: '2024-01-10',
          diagnosis: 'Seasonal Allergies',
          medications: [
            { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '90 days' },
            { name: 'Fluticasone Nasal Spray', dosage: '50mcg', frequency: 'Twice daily', duration: '30 days' }
          ],
          instructions: 'Avoid allergens. Use nasal spray regularly.',
          status: 'active'
        },
        {
          id: 3,
          doctorName: 'Dr. Emily Williams',
          date: '2023-12-20',
          diagnosis: 'Upper Respiratory Infection',
          medications: [
            { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days' },
            { name: 'Acetaminophen', dosage: '500mg', frequency: 'As needed', duration: '5 days' }
          ],
          instructions: 'Complete full course of antibiotics. Rest and stay hydrated.',
          status: 'completed'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }

  viewPrescription(prescription: Prescription): void {
    this.selectedPrescription = prescription;
  }

  closePrescription(): void {
    this.selectedPrescription = null;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'completed':
        return 'status-completed';
      case 'expired':
        return 'status-expired';
      default:
        return '';
    }
  }

  downloadPrescription(prescription: Prescription): void {
    // In a real app, this would generate and download a PDF
    console.log('Downloading prescription:', prescription.id);
  }
}
