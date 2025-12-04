import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  currentUser$: Observable<any>;
  menuItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.setupMenuItems();
  }

  private setupMenuItems(): void {
    this.menuItems = [
      // Patient specific items
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/patient/dashboard',
        roles: ['patient']
      },
      {
        label: 'Book Appointment',
        icon: 'event_available',
        route: '/patient/appointments/book',
        roles: ['patient']
      },
      {
        label: 'My Appointments',
        icon: 'calendar_today',
        route: '/patient/appointments',
        roles: ['patient']
      },
      {
        label: 'Prescriptions',
        icon: 'medication',
        route: '/patient/prescriptions',
        roles: ['patient']
      },
      {
        label: 'Medical Records',
        icon: 'folder_shared',
        route: '/patient/medical-records',
        roles: ['patient']
      },
      {
        label: 'Billing',
        icon: 'payments',
        route: '/patient/billing',
        roles: ['patient']
      },
      {
        label: 'Profile',
        icon: 'account_circle',
        route: '/patient/profile',
        roles: ['patient']
      },
      // Doctor specific items
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/doctor/dashboard',
        roles: ['doctor']
      },
      {
        label: 'Appointments',
        icon: 'calendar_month',
        route: '/doctor/appointments',
        roles: ['doctor']
      },
      {
        label: 'Medical Records',
        icon: 'folder_shared',
        route: '/doctor/medical-records',
        roles: ['doctor']
      },
      {
        label: 'Billing',
        icon: 'payments',
        route: '/doctor/billing',
        roles: ['doctor']
      },
      {
        label: 'Reports',
        icon: 'analytics',
        route: '/doctor/reports',
        roles: ['doctor']
      },
      {
        label: 'Settings',
        icon: 'tune',
        route: '/doctor/settings',
        roles: ['doctor']
      },
      // Admin specific items
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/admin/dashboard',
        roles: ['admin']
      },
      {
        label: 'Users Management',
        icon: 'manage_accounts',
        route: '/admin/users',
        roles: ['admin']
      },
      {
        label: 'Appointments',
        icon: 'calendar_month',
        route: '/admin/appointments',
        roles: ['admin']
      },
      {
        label: 'Reports',
        icon: 'analytics',
        route: '/admin/reports',
        roles: ['admin']
      },
      {
        label: 'Settings',
        icon: 'tune',
        route: '/admin/settings',
        roles: ['admin']
      },
      {
        label: 'Profile',
        icon: 'account_circle',
        route: '/admin/profile',
        roles: ['admin']
      }
    ];
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  navigateToProfile(): void {
    const user = this.authService.currentUserValue;
    if (user && user.role === 'doctor') {
      this.router.navigate(['/doctor/profile']);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  isMenuItemVisible(item: MenuItem, userRole: string): boolean {
    if (!item.roles) {
      return true; // Show for all roles
    }
    return item.roles.includes(userRole);
  }

  isActiveRoute(route: string): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes(route);
  }
}
