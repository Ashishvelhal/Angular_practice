import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { PatientDashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboardComponent
  },
  {
    path: 'dashboard',
    component: PatientDashboardComponent
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
  {
    path: 'appointments/book',
    component: BookAppointmentComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    PatientDashboardComponent,
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
