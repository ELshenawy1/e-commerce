import { BasketItem } from './shared/models/basket';
import { BasketService } from './basket/basket.service';
import { ShopService } from './shop/shop.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pagination } from './shared/models/paging';
import { Product } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Store Application';
  constructor(private basketService:BasketService){}

  ngOnInit(): void {
    const basketId = localStorage.getItem("basket_id")
    if(basketId) this.basketService.getBasket(basketId)
  }

}
