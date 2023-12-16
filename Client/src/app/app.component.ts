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
  constructor(private httpClient : HttpClient){}
  ngOnInit(): void {
    this.httpClient.get<Pagination<Product[]>>("https://localhost:7247/api/Product?pagesize=8").subscribe((response)=>{
      this.product = response.data;
      console.log(this.product)
    })
  }
}
