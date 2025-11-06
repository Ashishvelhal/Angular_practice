import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    bloodType: 'O+',
    address: '123 Main St, City, Country'
  };

  isEditing = false;
  
  constructor() { }

  ngOnInit(): void {
    // In a real app, fetch user profile from a service
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    // In a real app, save to backend
    this.isEditing = false;
  }
}
