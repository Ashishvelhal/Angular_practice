import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      specialization: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      qualification: ['', Validators.required],
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.loadDoctorData();
    this.profileForm.disable();
  }

  loadDoctorData(): void {
    const doctorData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      specialization: 'Cardiology',
      experience: 10,
      qualification: 'MD, DM (Cardiology)',
      bio: 'Senior Cardiologist with 10+ years of experience'
    };
    this.profileForm.patchValue(doctorData);
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      console.log('Profile saved:', this.profileForm.value);
      this.isEditing = false;
      this.profileForm.disable();
    }
  }
}
