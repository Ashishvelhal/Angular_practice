import { Component, OnInit } from '@angular/core';

interface Bill {
  id: number;
  billNumber: string;
  appointmentDate: string;
  doctorName: string;
  services: {
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  paymentMethod?: string;
  paymentDate?: string;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  bills: Bill[] = [];
  selectedBill: Bill | null = null;
  isLoading = false;
  filterStatus: string = 'all';

  constructor() { }

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.isLoading = true;
    
    // Sample data - in a real app, this would come from a service
    setTimeout(() => {
      this.bills = [
        {
          id: 1,
          billNumber: 'BILL-2024-001',
          appointmentDate: '2024-01-15',
          doctorName: 'Dr. Sarah Smith',
          services: [
            { name: 'Consultation Fee', quantity: 1, unitPrice: 150, totalPrice: 150 },
            { name: 'Blood Test', quantity: 1, unitPrice: 45, totalPrice: 45 },
            { name: 'ECG', quantity: 1, unitPrice: 80, totalPrice: 80 }
          ],
          subtotal: 275,
          tax: 22,
          totalAmount: 297,
          status: 'paid',
          dueDate: '2024-01-22',
          paymentMethod: 'Credit Card',
          paymentDate: '2024-01-16'
        },
        {
          id: 2,
          billNumber: 'BILL-2024-002',
          appointmentDate: '2024-01-20',
          doctorName: 'Dr. Michael Johnson',
          services: [
            { name: 'Consultation Fee', quantity: 1, unitPrice: 120, totalPrice: 120 },
            { name: 'Skin Biopsy', quantity: 1, unitPrice: 200, totalPrice: 200 }
          ],
          subtotal: 320,
          tax: 25.60,
          totalAmount: 345.60,
          status: 'pending',
          dueDate: '2024-01-27'
        },
        {
          id: 3,
          billNumber: 'BILL-2023-045',
          appointmentDate: '2023-12-10',
          doctorName: 'Dr. Emily Williams',
          services: [
            { name: 'Consultation Fee', quantity: 1, unitPrice: 180, totalPrice: 180 },
            { name: 'MRI Scan', quantity: 1, unitPrice: 800, totalPrice: 800 },
            { name: 'Radiologist Report', quantity: 1, unitPrice: 150, totalPrice: 150 }
          ],
          subtotal: 1130,
          tax: 90.40,
          totalAmount: 1220.40,
          status: 'overdue',
          dueDate: '2023-12-17'
        },
        {
          id: 4,
          billNumber: 'BILL-2024-003',
          appointmentDate: '2024-01-25',
          doctorName: 'Dr. James Brown',
          services: [
            { name: 'Consultation Fee', quantity: 1, unitPrice: 140, totalPrice: 140 },
            { name: 'X-Ray', quantity: 2, unitPrice: 75, totalPrice: 150 }
          ],
          subtotal: 290,
          tax: 23.20,
          totalAmount: 313.20,
          status: 'pending',
          dueDate: '2024-02-01'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }

  viewBill(bill: Bill): void {
    this.selectedBill = bill;
  }

  closeBill(): void {
    this.selectedBill = null;
  }

  payBill(bill: Bill): void {
    // In a real app, this would open a payment gateway
    console.log('Processing payment for bill:', bill.id);
    alert('Payment gateway would open here. This is a demo.');
  }

  downloadBill(bill: Bill): void {
    // In a real app, this would generate and download a PDF
    console.log('Downloading bill:', bill.id);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'paid':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      case 'overdue':
        return 'status-overdue';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  filterBills(status: string): void {
    this.filterStatus = status;
  }

  getFilteredBills(): Bill[] {
    if (this.filterStatus === 'all') {
      return this.bills;
    }
    return this.bills.filter(bill => bill.status === this.filterStatus);
  }

  getTotalBills(): number {
    return this.getFilteredBills().length;
  }

  getTotalAmount(): number {
    return this.getFilteredBills().reduce((total, bill) => total + bill.totalAmount, 0);
  }

  getPendingBillsCount(): number {
    return this.bills.filter(b => b.status === 'pending').length;
  }

  getOverdueBillsCount(): number {
    return this.bills.filter(b => b.status === 'overdue').length;
  }

  formatCurrency(amount: number): string {
    return amount.toFixed(2);
  }
}
