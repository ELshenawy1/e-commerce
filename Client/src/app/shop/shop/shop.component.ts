import { Product } from 'src/app/shared/models/product';
import { ShopService } from './../shop.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Type } from 'src/app/shared/models/types';
import { Brand } from 'src/app/shared/models/brands';
import { ShopParams } from 'src/app/shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  @ViewChild('search') searchTerm?:ElementRef;
  constructor(private shopService:ShopService){}
  products : Product[] = [];
  types : Type[] = [];
  totalCount : number = 0;
  brands : Brand[] = [];
  shopParams = new  ShopParams();
  sortOption = [
    {name:'Alphabetical' , value :'' },
    {name:'Price : Low to High' , value :'PriceAsc' },
    {name:'Price : High to low' , value :'Pricedesc' }
  ]
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes(); 
  }
  onSortSelected(event : any){
    this.shopParams.sort = event.target.value;
    this.getProducts()
  }

  selectBrand(brandId : number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  selectType(typeId : number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;

    this.getProducts();
  }

  getProducts(){
    this.shopService.GetProducts(this.shopParams).subscribe((response)=>{
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
      console.log(response)
    })
  }
  getBrands(){
    this.shopService.GetBrands().subscribe((response)=>{
      this.brands = [{id:0,name:'All'},...response];
    })
  }
  getTypes(){
    this.shopService.GetTypes().subscribe((response)=>{
      this.types = [{id:0,name:'All'},...response];
    })
  }

  onPageChanges(event : any ){
    console.log(event);
    if(this.shopParams.pageNumber !== event.page){
      this.shopParams.pageNumber = event.page;
      this.getProducts();
    }
  }

  onSearch(){
     this.shopParams.search = this.searchTerm?.nativeElement.value;
     this.shopParams.pageNumber = 1;
     this.getProducts();
  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value  = '';
    this.shopParams.search = '';
    // this.shopParams = new ShopParams();
    this.getProducts();
  }
}

