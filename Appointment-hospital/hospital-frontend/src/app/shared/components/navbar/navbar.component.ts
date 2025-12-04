import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  currentUser$: Observable<any>;
  pageTitle = 'Dashboard';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.updatePageTitle();
  }

  navigateToProfile(): void {
    const user = this.authService.currentUserValue;
    if (user && user.role === 'doctor') {
      this.router.navigate(['/doctor/profile']);
    } else if (user && user.role === 'patient') {
      this.router.navigate(['/patient/profile']);
    } else if (user && user.role === 'admin') {
      this.router.navigate(['/admin/profile']);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  private updatePageTitle(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/dashboard')) {
      this.pageTitle = 'Dashboard';
    } else if (currentUrl.includes('/appointments')) {
      this.pageTitle = 'Appointments';
    } else if (currentUrl.includes('/medical-records')) {
      this.pageTitle = 'Medical Records';
    } else if (currentUrl.includes('/billing')) {
      this.pageTitle = 'Billing';
    } else if (currentUrl.includes('/reports')) {
      this.pageTitle = 'Reports';
    } else if (currentUrl.includes('/settings')) {
      this.pageTitle = 'Settings';
    } else if (currentUrl.includes('/profile')) {
      this.pageTitle = 'Profile';
    } else {
      this.pageTitle = 'Dashboard';
    }
  }
}
