import { BasketItem } from 'src/app/shared/models/basket';
import { BasketService } from './../basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{
  items : BasketItem[]  = [];
  constructor(private basketService : BasketService){}
  ngOnInit(): void {
    this.basketService.basketSource$.subscribe((response)=>{
      if(response) this.items = response?.items;
    })
  }

  incrementQuantity(item:BasketItem){
    this.basketService.addItemToBasket(item);
  }

  removeItem(event : {id:number,quantity:number}){
    this.basketService.removeItemFromBasket(event.id,event.quantity);
  }
}
