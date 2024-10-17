import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];

  private cartItemsSource = new BehaviorSubject<any[]>(this.getStoredCart());
  private cartCountSource = new BehaviorSubject<number>(this.calculateCartCount());

  cartItems$ = this.cartItemsSource.asObservable();
  cartCount$ = this.cartCountSource.asObservable();

  constructor() {
    this.cart = this.getStoredCart();
  }

  private getStoredCart(): any[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  addToCart(product: any) {
    const item = this.cart.find((p) => p.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.updateCart(); 
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.updateCart(); 
  }

  clearCart() {
    this.cart = [];
    this.updateCart(); 
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private calculateCartCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  private updateCart() {
    this.saveCart();
    this.cartItemsSource.next(this.cart);
    this.cartCountSource.next(this.calculateCartCount()); 
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
