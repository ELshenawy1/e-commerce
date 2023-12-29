import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import { Order } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  order? :Order;
  constructor(private ordersService : OrdersService, private route : ActivatedRoute){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    id && this.ordersService.getOrderDetails(+id).subscribe({
      next:order => this.order = order
    })
  }
}
