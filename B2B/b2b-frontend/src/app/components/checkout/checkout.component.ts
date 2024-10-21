import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public orderObj: any = {
    name: '',
    email: '',
    mobileNumber: '',
    status: 'confirmed',
    orderDate: new Date().toISOString().split('T')[0],
    products: [],
  };
 
  cartItems: any[] = [];
 
  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private ds: DataService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.orderObj.products = items.map(item => item.id);
    });
  }
 
  checkout() {
    if (!this.cartItems.length) {
      alert('Your cart is empty. Please add items before checkout.');
      return;
    }
    this.orderObj.products = this.cartItems.map(item => item.id);
 
    this.ds.createOrder(this.orderObj).subscribe({
      next: (res: any) => {
        console.log('Order placed:', res);
        alert('Order placed successfully!');
        this.pushToThirdPartyAPI(res.order);
        this.cartService.clearCart();
        this.resetForm();
        this.router.navigate(['orders']);
      },
      error: (err: any) => {
        console.error('Error placing order:', err);
        alert('Failed to place the order. Please try again.');
      }
    });
  }
 
  pushToThirdPartyAPI(order: any) {
    const thirdPartyApiUrl =
      'https://thingproxy.freeboard.io/fetch/https://third-party-api.com/salesOrder';
   
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'Content-Type': 'application/json',
    });
    const productIds = order.Products.map((product:any) => product.id);
 
    const payload = {
      name: order.name,
      email: order.email,
      mobileNumber: order.mobileNumber,
      status: order.status,
      orderDate: order.orderDate,
      products: productIds,
    };
   
    this.http.post(thirdPartyApiUrl, payload, { headers }).subscribe({
      next: (res) => {
        console.log('Pushed to third-party API:', res);
      },
      error: (err) => {
        console.error('Failed to push to third-party API:', err);
       
      }
    });
  }
 
  resetForm() {
    this.orderObj = {
      name: '',
      email: '',
      mobileNumber: '',
      status: 'confirmed',
      orderDate: new Date().toISOString().split('T')[0],
      products: [],
    };
  }}
