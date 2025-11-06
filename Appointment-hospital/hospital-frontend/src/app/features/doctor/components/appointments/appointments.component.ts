import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-appointments',
  template: `
    <div class="appointments">
      <h2>Doctor Appointments</h2>
      <p>Your appointments will be listed here</p>
    </div>
  `,
  styles: [`
    .appointments {
      padding: 20px;
    }
  `]
})
export class AppointmentsComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
