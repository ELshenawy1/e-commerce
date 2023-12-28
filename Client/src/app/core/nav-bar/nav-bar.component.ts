import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  currentUser? : User;
  constructor(public basketService : BasketService,public accountService : AccountService){}
  ngOnInit(): void {
    this.basketService.basketSource$.subscribe((res)=>{
      if(res) this.getCount(res.items);
      else this.count = 0
    });
    this.accountService.currentUser$.subscribe((res)=>{
      if(res) this.currentUser = res;
      else this.currentUser = undefined
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
