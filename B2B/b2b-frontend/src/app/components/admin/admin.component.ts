import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private http: HttpClient,private router:Router) {}

  submitForm(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    this.http.post('http://localhost:3000/createProduct', formData).subscribe({
      next:(response) => {
        console.log('Product created:', response);
        alert('Product Created Successfully!');
        this.router.navigate(['product'])
      },
      error:(error) => {
        console.error('Error creating product:', error);
      }
    }
    );
  }
}
