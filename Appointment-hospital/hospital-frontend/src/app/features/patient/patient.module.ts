import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'appointments', pathMatch: 'full' },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsComponent,
    ProfileComponent,
    BookAppointmentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }
