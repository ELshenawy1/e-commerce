import { ActivatedRoute } from '@angular/router';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  product?: Product;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private basketService : BasketService
  ) {}

  quantity = 1;
  quantityInBasket=0;

  ngOnInit(): void {
    this.loadProduct();
    this.basketService.basketSource$.subscribe((res)=>{
      res?.items.forEach(item => { if(item.id === +this.productId){
        this.quantity = item.quantity
        this.quantityInBasket = item.quantity
      }        
      });
    })
  }

  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    this.quantity--;
  }
  updateBasket(){
    if(this.product){
      if(this.quantity > this.quantityInBasket){
        let dif = this.quantity - this.quantityInBasket;
        this.basketService.addItemToBasket(this.product,dif)
      }else{
        const itemtoremove = this.quantityInBasket - this.quantity;
        this.basketService.removeItemFromBasket(this.productId , itemtoremove)
      }
    }
  }

  get getButtonTxt(){
    return (this.quantityInBasket === 0) ? "Add To Basket" : "Update Basket";
  }

  loadProduct() {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.shopService.GetProduct(this.productId).subscribe((response) => {
      this.product = response;
    });
  }
}
