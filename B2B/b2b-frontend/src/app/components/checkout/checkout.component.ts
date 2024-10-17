import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
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

    this.ds.createOrder(this.orderObj).subscribe({
      next: (res: any) => {
        console.log('Order placed:', res);
        alert('Order placed successfully!');
        this.cartService.clearCart(); 
        this.resetForm();
        this.router.navigate(['home']);
      },
      error: (err: any) => {
        console.error('Error placing order:', err);
        alert('Failed to place the order. Please try again.');
      },
    });
  }

  resetForm() {
    this.orderObj = {
      name: '',
      email: '',
      mobileNumber: '',
      products: [],
    };
  }
}
