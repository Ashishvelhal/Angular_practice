import { Component, OnInit } from '@angular/core';

interface MedicalReport {
  id: number;
  title: string;
  doctorName: string;
  department: string;
  date: string;
  reportType: 'lab' | 'imaging' | 'consultation' | 'pathology';
  status: 'normal' | 'abnormal' | 'critical';
  summary: string;
  fileUrl?: string;
  findings: string[];
  recommendations: string[];
}

@Component({
  selector: 'app-medical-reports',
  templateUrl: './medical-reports.component.html',
  styleUrls: ['./medical-reports.component.scss']
})
export class MedicalReportsComponent implements OnInit {
  medicalReports: MedicalReport[] = [];
  selectedReport: MedicalReport | null = null;
  isLoading = false;
  filterType: string = 'all';

  constructor() { }

  ngOnInit(): void {
    this.loadMedicalReports();
  }

  loadMedicalReports(): void {
    this.isLoading = true;
    
    // Sample data - in a real app, this would come from a service
    setTimeout(() => {
      this.medicalReports = [
        {
          id: 1,
          title: 'Complete Blood Count (CBC)',
          doctorName: 'Dr. Sarah Smith',
          department: 'Laboratory',
          date: '2024-01-15',
          reportType: 'lab',
          status: 'normal',
          summary: 'All blood parameters are within normal ranges. No abnormalities detected.',
          findings: [
            'Hemoglobin: 14.2 g/dL (Normal)',
            'White Blood Cells: 6,500/μL (Normal)',
            'Platelets: 250,000/μL (Normal)',
            'Red Blood Cells: 4.8 million/μL (Normal)'
          ],
          recommendations: [
            'Continue current diet and lifestyle',
            'Follow up in 6 months for routine checkup'
          ]
        },
        {
          id: 2,
          title: 'Chest X-Ray',
          doctorName: 'Dr. Michael Johnson',
          department: 'Radiology',
          date: '2024-01-10',
          reportType: 'imaging',
          status: 'normal',
          summary: 'Clear lung fields with no evidence of pneumonia or effusion. Heart size normal.',
          findings: [
            'Lungs: Clear, no infiltrates',
            'Heart: Normal size and contour',
            'Pleura: No effusion or thickening',
            'Mediastinum: Normal width'
          ],
          recommendations: [
            'No acute cardiopulmonary findings',
            'Routine follow-up not required'
          ]
        },
        {
          id: 3,
          title: 'Lipid Panel',
          doctorName: 'Dr. Emily Williams',
          department: 'Laboratory',
          date: '2024-01-08',
          reportType: 'lab',
          status: 'abnormal',
          summary: 'Elevated cholesterol and LDL levels detected. Lifestyle modifications recommended.',
          findings: [
            'Total Cholesterol: 245 mg/dL (High)',
            'LDL Cholesterol: 165 mg/dL (High)',
            'HDL Cholesterol: 45 mg/dL (Low)',
            'Triglycerides: 180 mg/dL (Borderline High)'
          ],
          recommendations: [
            'Start low-fat diet',
            'Increase physical activity',
            'Consider statin therapy',
            'Follow up in 3 months'
          ]
        },
        {
          id: 4,
          title: 'ECG (Electrocardiogram)',
          doctorName: 'Dr. James Brown',
          department: 'Cardiology',
          date: '2024-01-05',
          reportType: 'consultation',
          status: 'normal',
          summary: 'Normal sinus rhythm with no evidence of ischemia or arrhythmia.',
          findings: [
            'Heart Rate: 72 bpm (Normal)',
            'Rhythm: Sinus rhythm',
            'Axis: Normal axis',
            'No ST-T changes',
            'Normal QRS duration'
          ],
          recommendations: [
            'Continue current medications',
            'Regular exercise as tolerated',
            'Annual cardiac evaluation'
          ]
        }
      ];
      this.isLoading = false;
    }, 1000);
  }

  viewReport(report: MedicalReport): void {
    this.selectedReport = report;
  }

  closeReport(): void {
    this.selectedReport = null;
  }

  downloadReport(report: MedicalReport): void {
    // In a real app, this would generate and download a PDF
    console.log('Downloading report:', report.id);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'normal':
        return 'status-normal';
      case 'abnormal':
        return 'status-abnormal';
      case 'critical':
        return 'status-critical';
      default:
        return '';
    }
  }

  getReportTypeIcon(type: string): string {
    switch (type) {
      case 'lab':
        return 'science';
      case 'imaging':
        return 'image';
      case 'consultation':
        return 'stethoscope';
      case 'pathology':
        return 'biotech';
      default:
        return 'description';
    }
  }

  filterReports(type: string): void {
    this.filterType = type;
  }

  getFilteredReports(): MedicalReport[] {
    if (this.filterType === 'all') {
      return this.medicalReports;
    }
    return this.medicalReports.filter(report => report.reportType === this.filterType);
  }
}
