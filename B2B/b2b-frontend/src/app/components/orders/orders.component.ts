import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  salesOrders: any = [];
  filters: any = {
    name: '',
    email: '',
    mobileNumber: '',
    status: '',
    orderDate: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    const params = new URLSearchParams();

    for (const key in this.filters) {
      if (this.filters[key]) {
        params.append(key, this.filters[key]);
      }
    }

    this.http.get(`http://localhost:3000/getSales?${params.toString()}`).subscribe({
      next:(data) => {
        this.salesOrders = data;
      },
      error:(error) => {
        console.error('Error fetching sales orders:', error);
      }
    }
    );
  }

  searchOrders() {
    this.fetchOrders();
  }
}
