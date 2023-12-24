import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ShopComponent } from './shop/shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { BasketComponent } from './basket/basket/basket.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';

const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'basket' , component : BasketComponent  },
  {path : 'shop' , component : ShopComponent},
  {path : 'checkout' , component : CheckoutComponent},
  {path : 'shop/:id' , component : ProductDetailsComponent},
  {path : '**' , redirectTo : ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
