import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  availableSlots: string[];
}

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  loading = false;
  doctors: Doctor[] = [
    // Sample data - in a real app, this would come from a service
    { id: 1, name: 'Dr. Smith', specialization: 'Cardiology', availableSlots: ['09:00', '10:00', '14:00'] },
    { id: 2, name: 'Dr. Johnson', specialization: 'Dermatology', availableSlots: ['11:00', '15:00', '16:00'] },
    { id: 3, name: 'Dr. Williams', specialization: 'Neurology', availableSlots: ['09:30', '13:00', '16:30'] }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookAppointmentComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.appointmentForm = this.fb.group({
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // In a real app, fetch available doctors and slots from a service
  }

  onDoctorSelect(event: MatSelectChange): void {
    const doctorId = event.value as number;
    // In a real app, fetch available slots for the selected doctor
    console.log('Selected doctor ID:', doctorId);
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      return;
    }

    this.loading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      this.snackBar.open('Appointment booked successfully!', 'Close', {
        duration: 3000
      });
      this.dialogRef.close(this.appointmentForm.value);
    }, 1500);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
