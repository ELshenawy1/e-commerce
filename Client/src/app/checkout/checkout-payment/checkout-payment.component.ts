  import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
  import { FormGroup } from '@angular/forms';
  import { CheckoutService } from '../checkout.service';
  import { BasketService } from 'src/app/basket/basket.service';
  import { Basket } from 'src/app/shared/models/basket';
  import { Address } from 'src/app/shared/models/user';
  import { OrderToCreate } from 'src/app/shared/models/order';
  import { NavigationExtras, Router } from '@angular/router';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';

  @Component({
    selector: 'app-checkout-payment',
    templateUrl: './checkout-payment.component.html',
    styleUrls: ['./checkout-payment.component.css']
  })
  export class CheckoutPaymentComponent implements OnInit{
    @Input() checkoutForm? : FormGroup;
    @ViewChild('cardNumber') cardNumberElement? : ElementRef
    @ViewChild('cardExpiry') cardExpiryElement? : ElementRef
    @ViewChild('cardCvc') cardCvcElement? : ElementRef
    orderCreated : boolean = false;

    stripe : Stripe|null = null;
    cardNumber? : StripeCardNumberElement
    cardExpiry? : StripeCardExpiryElement;
    cardCvc? : StripeCardCvcElement;

    cardErrors : any

    constructor(private checkoutService : CheckoutService,
                private basketService : BasketService,
                private router : Router){}
    ngOnInit(): void {
      loadStripe('pk_test_51OSeQ7Kx96ecGa1uEPMUp8TBzu7NkItPV508NYzSnHi3Ycd0YWYQKHFbtW458sGO9rF0jlCtaFPKzVHvnUu4Pe2j00zQUsVVA6').then(stripe=>{
        this.stripe = stripe
        const elements = stripe?.elements();
        if(elements){
          this.cardNumber=elements.create('cardNumber');
          this.cardNumber.mount(this.cardNumberElement?.nativeElement)
          this.cardNumber.on('change',event=>{
            if(event.error) this.cardErrors = event.error.message
            else this.cardErrors = null
          })

          this.cardExpiry=elements.create('cardExpiry');
          this.cardExpiry.mount(this.cardExpiryElement?.nativeElement)
          this.cardExpiry.on('change',event=>{
            if(event.error) this.cardErrors = event.error.message
            else this.cardErrors = null
          })

          this.cardCvc=elements.create('cardCvc');
          this.cardCvc.mount(this.cardCvcElement?.nativeElement)
          this.cardCvc.on('change',event=>{
            if(event.error) this.cardErrors = event.error.message
            else this.cardErrors = null
          })
        }
      })
    }

    private getOrderToCreate(basket : Basket) {
      const deliveryMethodID = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
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
          this.stripe?.confirmCardPayment(basket.clientSecret!,{
            payment_method:{
              card:this.cardNumber!,
              billing_details:{
                name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
              }
          }}).then(result=>{
            console.log(result)
            if(result.paymentIntent){
              this.orderCreated = true;
              setTimeout(() => {
                this.basketService.deleteLocalBasket()
                this.router.navigate([`/success`])}, 2000);
    
            }
          })
          
        },
        error:err=>{console.log(err); console.log(orderToCreate)}
      })
    }
  }
