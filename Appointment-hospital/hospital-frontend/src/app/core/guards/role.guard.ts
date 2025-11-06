import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // Get the user's role from the authentication service
    const user = this.authService.currentUserValue;
    
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if route is restricted by role
    const requiredRoles = next.data['roles'] as Array<string>;
    if (requiredRoles && requiredRoles.length && !requiredRoles.includes(user.role)) {
      // Role not authorized, redirect to home or access denied page
      this.snackBar.open('You do not have permission to access this page', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      
      // Redirect based on user role
      switch(user.role) {
        case 'admin':
          this.router.navigate(['/admin/dashboard']);
          break;
        case 'doctor':
          this.router.navigate(['/doctor/dashboard']);
          break;
        case 'patient':
        default:
          this.router.navigate(['/patient/dashboard']);
          break;
      }
      
      return false;
    }
    
    return true;
  }
}
