import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  consultationFee: number;
  availableSlots: string[];
}

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  isLoading = false;
  todayDate = new Date();
  availableTimeSlots: string[] = [];
  
  doctors: Doctor[] = [
    // Sample data - in a real app, this would come from a service
    { 
      id: 1, 
      name: 'Dr. Sarah Smith', 
      specialization: 'Cardiology', 
      consultationFee: 150,
      availableSlots: ['09:00', '09:30', '10:00', '10:30', '14:00', '14:30', '15:00', '15:30'] 
    },
    { 
      id: 2, 
      name: 'Dr. Michael Johnson', 
      specialization: 'Dermatology', 
      consultationFee: 120,
      availableSlots: ['09:00', '11:00', '11:30', '15:00', '16:00', '16:30'] 
    },
    { 
      id: 3, 
      name: 'Dr. Emily Williams', 
      specialization: 'Neurology', 
      consultationFee: 180,
      availableSlots: ['09:30', '10:00', '13:00', '13:30', '16:30', '17:00'] 
    },
    { 
      id: 4, 
      name: 'Dr. James Brown', 
      specialization: 'Orthopedics', 
      consultationFee: 140,
      availableSlots: ['08:00', '08:30', '09:00', '14:00', '14:30', '15:00'] 
    },
    { 
      id: 5, 
      name: 'Dr. Lisa Davis', 
      specialization: 'Pediatrics', 
      consultationFee: 100,
      availableSlots: ['10:00', '10:30', '11:00', '15:00', '15:30', '16:00'] 
    }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      appointmentType: ['consultation', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]],
      notes: [''],
      contactMethod: ['phone', Validators.required]
    });
  }

  ngOnInit(): void {
    // In a real app, fetch available doctors and slots from a service
  }

  onDoctorSelect(event: MatSelectChange): void {
    const doctorId = event.value as number;
    const selectedDoctor = this.doctors.find(doc => doc.id === doctorId);
    
    if (selectedDoctor) {
      this.availableTimeSlots = selectedDoctor.availableSlots;
      // Reset time selection when doctor changes
      this.appointmentForm.get('time')?.setValue('');
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.snackBar.open('Appointment booked successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      
      // Navigate to dashboard or appointments list
      this.router.navigate(['/patient/appointments']);
    }, 2000);
  }

  onCancel(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}
