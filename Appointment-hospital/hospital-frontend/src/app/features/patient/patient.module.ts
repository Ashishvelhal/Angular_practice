import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { PatientDashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { MedicalReportsComponent } from './components/medical-reports/medical-reports.component';
import { BillingComponent } from './components/billing/billing.component';

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
    path: 'prescriptions',
    component: PrescriptionsComponent
  },
  {
    path: 'medical-records',
    component: MedicalReportsComponent
  },
  {
    path: 'billing',
    component: BillingComponent
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
    BookAppointmentComponent,
    PrescriptionsComponent,
    MedicalReportsComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }
