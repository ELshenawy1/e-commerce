import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/models/brands';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css']
})
export class HomeCategoriesComponent implements OnInit{
  brands : Brand[] = [];
  constructor(private shopService : ShopService){}
  ngOnInit(): void {
    this.getBrands();
  }
  baseUrl = 'https://localhost:7247/api/Product/Brands';
  getBrands(){
    this.shopService.GetBrands().subscribe({
      next:response=>{
        this.brands = response.slice(0,4);
      }
    })
  }
}
