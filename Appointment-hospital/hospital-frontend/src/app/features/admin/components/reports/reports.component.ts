import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  template: `
    <div class="reports">
      <h2>Reports</h2>
      <p>Reports content will go here</p>
    </div>
  `,
  styles: [`
    .reports {
      padding: 20px;
    }
  `]
})
export class ReportsComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
