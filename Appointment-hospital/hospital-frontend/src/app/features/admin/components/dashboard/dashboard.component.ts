import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalUsers: 0,
    activeDoctors: 0,
    appointmentsToday: 0,
    revenue: 0
  };

  recentActivities: Array<{id: number, action: string, time: string}> = [];

  constructor() { }

  ngOnInit(): void {
    // TODO: Fetch real data from API
    this.stats = {
      totalUsers: 1250,
      activeDoctors: 42,
      appointmentsToday: 187,
      revenue: 12500
    };

    this.recentActivities = [
      { id: 1, action: 'New doctor registered', time: '2 minutes ago' },
      { id: 2, action: 'Appointment completed', time: '10 minutes ago' },
      { id: 3, action: 'New patient registered', time: '25 minutes ago' },
      { id: 4, action: 'Prescription generated', time: '1 hour ago' },
      { id: 5, action: 'New appointment booked', time: '2 hours ago' }
    ];
  }
}
