import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  createOrder(body:any){
    return this.http.post('http://localhost:3000/createOrder',body);
  }
}
