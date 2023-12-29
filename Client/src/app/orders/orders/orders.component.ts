import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orders : Order[] = [];
  constructor(private ordersService : OrdersService){}
  ngOnInit(): void {
    this.ordersService.getOrdersForUser().subscribe({
      next:orders=>this.orders=orders
    })
  }

}
