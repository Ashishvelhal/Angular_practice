import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  todayAppointments = [
    {
      time: '09:00 AM',
      duration: 30,
      patientName: 'John Smith',
      patientId: '#12345',
      type: 'Consultation',
      status: 'Completed'
    },
    {
      time: '10:30 AM',
      duration: 45,
      patientName: 'Sarah Johnson',
      patientId: '#12346',
      type: 'Follow-up',
      status: 'In Progress'
    },
    {
      time: '11:15 AM',
      duration: 30,
      patientName: 'Michael Brown',
      patientId: '#12347',
      type: 'Checkup',
      status: 'Scheduled'
    },
    {
      time: '02:00 PM',
      duration: 60,
      patientName: 'Emily Davis',
      patientId: '#12348',
      type: 'Consultation',
      status: 'Scheduled'
    },
    {
      time: '03:30 PM',
      duration: 30,
      patientName: 'Robert Wilson',
      patientId: '#12349',
      type: 'Follow-up',
      status: 'Scheduled'
    }
  ];

  displayedColumns: string[] = ['time', 'patient', 'type', 'status', 'actions'];

  constructor() { }

  ngOnInit(): void { }

  getCompletedCount(): number {
    return this.todayAppointments.filter(a => a.status === 'Completed').length;
  }

  getUpcomingCount(): number {
    return this.todayAppointments.filter(a => a.status === 'Scheduled').length;
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }
}
