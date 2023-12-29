import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent {
  constructor(private basketService : BasketService){}
  @Input() appStepper?:CdkStepper
  createPaymentIntent(){
    this.basketService.createPaymentIntent().subscribe({
      next:()=>{this.appStepper?.next()},
      error:(err)=>{console.log(err)}
    })
  }
}
