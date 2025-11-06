import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./features/patient/patient.module').then(m => m.PatientModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['patient'] }
  },
  {
    path: 'doctor',
    loadChildren: () => import('./features/doctor/doctor.module').then(m => m.DoctorModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['doctor'] }
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
