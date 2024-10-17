import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  products: any[] = []; 
  filteredProducts: any[] = []; 
  searchTerm: string = '';

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts(); 
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:3000/getAllProducts').subscribe({
      next: (data: any) => {
        this.products = data.map((item: any) => {
          item.image = "http://localhost:3000" + item.imageUrl;
          return item;
        });
        this.filteredProducts = [...this.products];
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  filterProducts() {
    const searchValue = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchValue)
    );
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Product added to cart!');
    this.router.navigate(['/cart']);
  }
}
