import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-dashboard',
  template: `
    <div class="dashboard">
      <h2>Doctor Dashboard</h2>
      <p>Welcome to your dashboard</p>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
