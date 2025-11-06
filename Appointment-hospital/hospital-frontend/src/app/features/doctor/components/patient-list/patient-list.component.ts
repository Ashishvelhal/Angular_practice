import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  template: `
    <div class="patient-list">
      <h2>Patient List</h2>
      <p>Your patients will be listed here</p>
    </div>
  `,
  styles: [`
    .patient-list {
      padding: 20px;
    }
  `]
})
export class PatientListComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
