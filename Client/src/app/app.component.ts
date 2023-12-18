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
  product : any;
  constructor(private shopService : ShopService){}
  ngOnInit(): void {
    // this.shopService.GetProducts().subscribe((response)=>{
    //   this.product = response.data;
    // });
  }
}
