import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl: string = 'https://localhost:7247/api/Orders';
  constructor(private httpClient : HttpClient) { }

  getOrdersForUser(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);

    return this.httpClient.get<Order[]>(this.baseUrl,{headers});
  }
  getOrderDetails(id:number){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);

    return this.httpClient.get<Order>(`${this.baseUrl}/${id}`,{headers});
  }
  getLastOrder(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get<Order>(`${this.baseUrl}/Last`,{headers});
  }
}
