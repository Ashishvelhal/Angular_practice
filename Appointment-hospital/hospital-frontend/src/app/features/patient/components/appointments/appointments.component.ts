import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';

interface Appointment {
  id: number;
  date: Date;
  doctor: string;
  specialization: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [
    // Sample data - in a real app, this would come from a service
    {
      id: 1,
      date: new Date('2023-11-15T10:00:00'),
      doctor: 'Dr. Smith',
      specialization: 'Cardiology',
      status: 'scheduled'
    },
    {
      id: 2,
      date: new Date('2023-11-20T14:30:00'),
      doctor: 'Dr. Johnson',
      specialization: 'Dermatology',
      status: 'scheduled'
    }
  ];

  displayedColumns: string[] = ['date', 'doctor', 'specialization', 'status', 'actions'];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // In a real app, fetch appointments from a service
  }

  openBookAppointmentDialog(): void {
    const dialogRef = this.dialog.open(BookAppointmentComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the new appointment
        console.log('New appointment:', result);
      }
    });
  }

  cancelAppointment(appointment: Appointment): void {
    // In a real app, call a service to cancel the appointment
    console.log('Canceling appointment:', appointment.id);
  }

  rescheduleAppointment(appointment: Appointment): void {
    // In a real app, open a dialog to reschedule
    console.log('Rescheduling appointment:', appointment.id);
  }
}
