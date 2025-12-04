import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { DoctorDashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';
import { BillingComponent } from './components/billing/billing.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorDashboardComponent
  },
  {
    path: 'dashboard',
    component: DoctorDashboardComponent
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
  {
    path: 'patients',
    component: PatientListComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'medical-records',
    component: MedicalRecordsComponent
  },
  {
    path: 'billing',
    component: BillingComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  declarations: [
    DoctorDashboardComponent,
    AppointmentsComponent,
    ProfileComponent,
    PatientListComponent,
    MedicalRecordsComponent,
    BillingComponent,
    ReportsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DoctorModule { }
