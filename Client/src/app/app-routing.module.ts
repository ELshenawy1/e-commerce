import { LoginComponent } from './account/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ShopComponent } from './shop/shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { BasketComponent } from './basket/basket/basket.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { RegisterComponent } from './account/register/register.component';
import { CheckoutSuccessComponent } from './checkout/checkout-success/checkout-success.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';

const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'basket' , component : BasketComponent  },
  {path : 'orders' , component : OrdersComponent  },
  {path : 'orders/:id' , component : OrderDetailsComponent  },
  {path : 'success' , component : CheckoutSuccessComponent  },
  {path : 'login' , component : LoginComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'checkout' , component : CheckoutComponent},
  {path : 'shop' , component : ShopComponent},
  {path : 'shop/:id' , component : ProductDetailsComponent},
  {path : '**' , redirectTo : ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
