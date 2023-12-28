import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryMethod } from '../shared/models/deliveryMethod';
import { map } from 'rxjs';
import { OrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl: string = 'https://localhost:7247/api/';
  constructor(private httpClient : HttpClient) { }

  getDeliveryMethods(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);

    return this.httpClient.get<DeliveryMethod[]>(`${this.baseUrl}Orders/DeliveryMethod`,{headers}).pipe(
      map(dm=>{
        return dm.sort((a,b)=>b.price-a.price)
      })
    )
  }


  createOrder(order : OrderToCreate){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);

    return this.httpClient.post(`${this.baseUrl}Orders`,order,{headers});
  }
}
