import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Basket, BasketItem } from '../models/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent implements OnInit{
  @Output() addItem = new EventEmitter<BasketItem>();
  @Output() removeItem = new EventEmitter<{id:number,quantity:number}>();
  @Input() isBasket = true;
  basket? : Basket;
  constructor(public basketService : BasketService){}
  ngOnInit(): void {
    this.basketService.basketSource$.subscribe({
      next:basketValue=>{
        if(basketValue) this.basket = basketValue
      }
    })
  }

  addBasketItem(item : BasketItem){ 
    this.addItem.emit(item)
  }

  removeBasketItem(id : number , quantity = 1){
    this.removeItem.emit({id,quantity})
  }
}
