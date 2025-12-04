import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  userTypes = [
    { value: 'patient', viewValue: 'Patient' },
    { value: 'doctor', viewValue: 'Doctor' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      role: ['patient', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      // Doctor specific fields
      specialization: [''],
      licenseNumber: [''],
      experienceYears: [0, [Validators.min(0)]],
      consultationFee: [0, [Validators.min(0)]],
      // Patient specific fields
      dateOfBirth: [''],
      gender: [''],
      bloodType: [''],
      address: ['']
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    console.log('Register form initialized:', this.registerForm.value);
    console.log('Role control value:', this.registerForm.get('role')?.value);
    console.log('Role control status:', this.registerForm.get('role')?.status);
    
    // Update validators based on role
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      console.log('Role changed to:', role);
      this.updateValidators(role);
    });
  }

  updateValidators(role: string): void {
    const specialization = this.registerForm.get('specialization');
    const licenseNumber = this.registerForm.get('licenseNumber');
    const consultationFee = this.registerForm.get('consultationFee');

    if (role === 'doctor') {
      specialization?.setValidators([Validators.required]);
      licenseNumber?.setValidators([Validators.required]);
      consultationFee?.setValidators([Validators.required, Validators.min(0)]);
    } else {
      specialization?.clearValidators();
      licenseNumber?.clearValidators();
      consultationFee?.clearValidators();
    }

    specialization?.updateValueAndValidity();
    licenseNumber?.updateValueAndValidity();
    consultationFee?.updateValueAndValidity();
  }

  passwordMatchValidator(g: FormGroup): { [key: string]: boolean } | null {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    if (password && confirmPassword) {
      return password === confirmPassword ? null : { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    const formValue = { ...this.registerForm.value };
    
    // Remove confirmPassword as it's not needed in the API
    delete formValue.confirmPassword;

    this.authService.register(formValue).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(
          error.error?.message || 'Registration failed. Please try again.',
          'Close',
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
      }
    });
  }
}
