import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketItem, BasketTotal } from '../shared/models/basket';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl: string = 'https://localhost:7247/api/Basket';
  private basketSource = new BehaviorSubject<Basket|null>(null);
  basketSource$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<BasketTotal|null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  getBasket(id : string){
    return this.httpClient.get<Basket>(`${this.baseUrl}?id=${id}`).subscribe({
      next:basket=>{
        this.basketSource.next(basket);
        this.calcTotal()
      }
    })
  } 
  
  setBasket(basket : Basket){
    return this.httpClient.post<Basket>(this.baseUrl,basket).subscribe({
      next:basket=>{
        this.basketSource.next(basket);
        this.calcTotal()

      }
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  private mapProductToBasketItem(item : Product){
    return {
      id : item.id,
      productName : item.name,
      price : item.price,
      quantity : 0,
      imgUrl : item.imgUrl,
      brand : item.productBrand,
      type : item.productType,
    }
  }

  createBasket() : Basket{
    const basket = new Basket();
    localStorage.setItem("basket_id" , basket.id);
    return basket ;
  }

  addOrUpdateItem(items : BasketItem[], itemtoadd : BasketItem , quantity : number) : BasketItem[]{
    const item = items.find(x => x.id == itemtoadd.id);
    if(item) item.quantity += quantity;
    else{
      itemtoadd.quantity = quantity
      items.push(itemtoadd)
    }
    return items;
  }

  addItemToBasket(item: Product|BasketItem, quantity = 1){
    if(this.isProduct(item)) item = this.mapProductToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items , item , quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(id : number, quantity = 1){
    const basket = this.getCurrentBasketValue()
    if(!basket) return; 
    const item = basket.items.find(x => x.id == id);
    if(item){
      item.quantity-=quantity;
      if(item.quantity ===0){
        basket.items = basket.items.filter(i => i.id !== id)
      }
      if(basket.items.length>0) this.setBasket(basket)
      else{
        this.setBasket(basket)
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket : Basket){
      return this.httpClient.delete(`${this.baseUrl}?id=${basket.id}`).subscribe({
        next:()=>{
          this.basketSource.next(null)
          this.basketTotalSource.next(null)
          localStorage.removeItem("basket_id")
        }
      })
  }


  private calcTotal(){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const shipping = 0;
    let sum = 0;
    basket.items.forEach(item => {
      sum+=(item.price*item.quantity)
    });
    const subtotal = sum;
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping,total,subtotal})
  }
  
  private isProduct(item : Product | BasketItem):item is Product{
    return (item as Product).productType !== undefined;
  }
}

