import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  constructor(public basketService : BasketService){}
  ngOnInit(): void {
    this.basketService.basketSource$.subscribe((res)=>{
      if(res)this.getCount(res.items);
    })
  }
  count : number = 0;
  getCount(items : BasketItem[]){
    let sum = 0
    items.forEach(item => {
      sum+=item.quantity;
    });
    this.count = sum;
  }
}
