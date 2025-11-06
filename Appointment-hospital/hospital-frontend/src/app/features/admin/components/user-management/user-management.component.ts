import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  template: `
    <div class="user-management">
      <h2>User Management</h2>
      <p>User management content will go here</p>
    </div>
  `,
  styles: [`
    .user-management {
      padding: 20px;
    }
  `]
})
export class UserManagementComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
