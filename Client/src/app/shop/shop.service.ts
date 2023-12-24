import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/paging';
import { Product } from '../shared/models/product';
import { Type } from '../shared/models/types';
import { Brand } from '../shared/models/brands';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient : HttpClient) { }
  baseUrl : string = 'https://localhost:7247/api/'

  GetProducts(shopParams : ShopParams){
    return this.httpClient.get<Pagination<Product[]>>(this.baseUrl+`Product?typeid=${(shopParams.typeId>0)?shopParams.typeId:''}&brandid=${(shopParams.brandId>0)?shopParams.brandId : ''}&sort=${shopParams.sort}&pageIndex=${shopParams.pageNumber}&pageSize=${shopParams.pageSize}${(shopParams.search!==null && shopParams.search.trim()!=='')?'&search='+shopParams.search : ''}`);
  }

  GetProduct(id : number){
    return this.httpClient.get<Product>(`${this.baseUrl}product/${id}`)
  }

  GetTypes(){
    return this.httpClient.get<Type[]>(this.baseUrl+"product/types")
  }

  GetBrands(){
    return this.httpClient.get<Brand[]>(this.baseUrl+"product/brands")
  }
}
