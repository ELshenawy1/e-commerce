import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketTotal } from '../models/basket';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.css']
})
export class OrderTotalComponent implements OnInit{
  basketTotal? : BasketTotal;
  constructor(private basketService : BasketService){}
  ngOnInit(): void {
    this.basketService.basketTotalSource$.subscribe((res)=>{
      if(res) this.basketTotal = res;
    })
  }
}
