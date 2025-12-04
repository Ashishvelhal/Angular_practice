import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Appointment {
  id: number;
  time: string;
  patientName: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Activity {
  id: number;
  text: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  doctorName: string = 'John Doe';
  currentDate: string = '';
  todayAppointments: Appointment[] = [];
  totalPatients: number = 0;
  newPatients: number = 0;
  completedAppointments: number = 0;
  upcomingAppointments: number = 0;
  recentActivities: Activity[] = [];
  isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeDashboard();
    this.loadDashboardData();
  }

  initializeDashboard(): void {
    this.currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.loadAppointments();
      this.loadStatistics();
      this.loadRecentActivity();
      this.isLoading = false;
    }, 1000);
  }

  loadAppointments(): void {
    // Mock data - replace with actual API call
    this.todayAppointments = [
      {
        id: 1,
        time: '09:00 AM',
        patientName: 'Sarah Johnson',
        type: 'General Checkup',
        status: 'scheduled'
      },
      {
        id: 2,
        time: '10:30 AM',
        patientName: 'Michael Smith',
        type: 'Follow-up',
        status: 'scheduled'
      },
      {
        id: 3,
        time: '02:00 PM',
        patientName: 'Emily Davis',
        type: 'Consultation',
        status: 'scheduled'
      }
    ];
  }

  loadStatistics(): void {
    // Mock data - replace with actual API call
    this.totalPatients = 245;
    this.newPatients = 12;
    this.completedAppointments = 156;
    this.upcomingAppointments = 23;
  }

  loadRecentActivity(): void {
    // Mock data - replace with actual API call
    this.recentActivities = [
      {
        id: 1,
        text: 'Completed appointment with Sarah Johnson',
        time: '2 hours ago',
        icon: 'check_circle'
      },
      {
        id: 2,
        text: 'Prescribed medication to Michael Smith',
        time: '4 hours ago',
        icon: 'medication'
      },
      {
        id: 3,
        text: 'New patient registration: Emily Davis',
        time: '1 day ago',
        icon: 'person_add'
      },
      {
        id: 4,
        text: 'Updated availability for next week',
        time: '2 days ago',
        icon: 'calendar_today'
      }
    ];
  }

  viewAppointment(appointmentId: number): void {
    this.router.navigate(['/doctor/appointments', appointmentId]);
  }

  viewAllAppointments(): void {
    this.router.navigate(['/doctor/appointments']);
  }

  manageSchedule(): void {
    this.router.navigate(['/doctor/schedule']);
  }

  viewPatients(): void {
    this.router.navigate(['/doctor/patients']);
  }

  viewPrescriptions(): void {
    this.router.navigate(['/doctor/prescriptions']);
  }

  editProfile(): void {
    this.router.navigate(['/doctor/profile']);
  }

  refreshDashboard(): void {
    this.loadDashboardData();
    this.snackBar.open('Dashboard refreshed successfully', 'Close', {
      duration: 3000
    });
  }

  viewPatientDetails(patientId: number): void {
    this.router.navigate(['/doctor/patients', patientId]);
  }
}
