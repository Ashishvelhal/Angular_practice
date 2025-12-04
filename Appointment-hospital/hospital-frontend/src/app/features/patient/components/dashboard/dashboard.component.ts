import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctorName: string;
  specialization: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Activity {
  id: number;
  text: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  patientName: string = 'John Doe';
  upcomingAppointments: Appointment[] = [];
  recentActivities: Activity[] = [];
  isLoading: boolean = true;
  totalAppointments: number = 0;
  completedAppointments: number = 0;
  pendingPrescriptions: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.loadAppointments();
      this.loadRecentActivity();
      this.loadStatistics();
      this.isLoading = false;
    }, 1000);
  }

  loadAppointments(): void {
    // Mock data - replace with actual API call
    this.upcomingAppointments = [
      {
        id: 1,
        date: '2024-01-15',
        time: '10:00 AM',
        doctorName: 'Dr. Sarah Johnson',
        specialization: 'Cardiology',
        status: 'scheduled'
      },
      {
        id: 2,
        date: '2024-01-20',
        time: '02:30 PM',
        doctorName: 'Dr. Michael Smith',
        specialization: 'Neurology',
        status: 'scheduled'
      }
    ];
  }

  loadRecentActivity(): void {
    // Mock data - replace with actual API call
    this.recentActivities = [
      {
        id: 1,
        text: 'Appointment booked with Dr. Sarah Johnson',
        time: '2 days ago',
        icon: 'event'
      },
      {
        id: 2,
        text: 'Prescription received from Dr. Michael Smith',
        time: '1 week ago',
        icon: 'medication'
      },
      {
        id: 3,
        text: 'Medical records updated',
        time: '2 weeks ago',
        icon: 'folder'
      },
      {
        id: 4,
        text: 'Lab test results available',
        time: '3 weeks ago',
        icon: 'science'
      }
    ];
  }

  loadStatistics(): void {
    // Mock data - replace with actual API call
    this.totalAppointments = 12;
    this.completedAppointments = 8;
    this.pendingPrescriptions = 2;
  }

  bookAppointment(): void {
    this.router.navigate(['/patient/appointments/book']);
  }

  viewAllAppointments(): void {
    this.router.navigate(['/patient/appointments']);
  }

  viewPrescriptions(): void {
    this.router.navigate(['/patient/prescriptions']);
  }

  viewMedicalRecords(): void {
    this.router.navigate(['/patient/medical-records']);
  }

  viewBilling(): void {
    this.router.navigate(['/patient/billing']);
  }

  viewAppointmentDetails(appointmentId: number): void {
    this.router.navigate(['/patient/appointments', appointmentId]);
  }

  refreshDashboard(): void {
    this.loadDashboardData();
    this.snackBar.open('Dashboard refreshed successfully', 'Close', {
      duration: 3000
    });
  }

  editProfile(): void {
    this.router.navigate(['/patient/profile']);
  }
}
