  import { Component, Input } from '@angular/core';
  import { FormGroup } from '@angular/forms';
  import { CheckoutService } from '../checkout.service';
  import { BasketService } from 'src/app/basket/basket.service';
  import { Basket } from 'src/app/shared/models/basket';
  import { Address } from 'src/app/shared/models/user';
  import { OrderToCreate } from 'src/app/shared/models/order';
  import { NavigationExtras, Router } from '@angular/router';

  @Component({
    selector: 'app-checkout-payment',
    templateUrl: './checkout-payment.component.html',
    styleUrls: ['./checkout-payment.component.css']
  })
  export class CheckoutPaymentComponent {
    @Input() checkoutForm? : FormGroup;
    orderCreated : boolean = false;
    constructor(private checkoutService : CheckoutService,
                private basketService : BasketService,
                private router : Router){}

    private getOrderToCreate(basket : Basket) {
      const deliveryMethodID = this.checkoutForm?.get('deliveryFrom')?.get('deliveryMethod')?.value;
      const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;
      if(!deliveryMethodID || !shipToAddress) return;
      return {
        basketID : basket.id,
        deliveryMethod :deliveryMethodID,
        shipToAddress : shipToAddress,
      }
    }

    submitOrder(){
      const basket = this.basketService.getCurrentBasketValue();
      if(!basket ) return;
      const orderToCreate = this.getOrderToCreate(basket);
      if(!orderToCreate)return;
      this.checkoutService.createOrder(orderToCreate).subscribe({
        next:order=>{
          this.orderCreated = true;
          setTimeout(() => {
            const navigation : NavigationExtras = {state : order};
            this.basketService.deleteLocalBasket()
            this.router.navigate(['/success'],navigation)}, 3000);
          
        },
        error:err=>{console.log(err); console.log(orderToCreate)}
      })
    }
  }
