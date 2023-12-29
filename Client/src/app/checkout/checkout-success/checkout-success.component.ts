import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/orders/orders.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit{
  id? :number;
  constructor(private ordersService : OrdersService){  }
  ngOnInit(): void {
    this.ordersService.getLastOrder().subscribe((res)=>{
      this.id = res.id
    })
  }
  

}
