import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  constructor(private fb : FormBuilder, 
              private accountService : AccountService, 
              private basketService : BasketService){}
  ngOnInit(): void {
    this.getAddressFormValues();
    this.getDeliveryMethodValue();
  }
  checkOutForm = this.fb.group({

    addressForm : this.fb.group({
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      street : ['',[Validators.required]],
      city : ['',[Validators.required]],
      state : ['',[Validators.required]],
      zipCode : ['',[Validators.required]],
    }),

    deliveryForm : this.fb.group({
      deliveryMethod : ['',[Validators.required]],
    }),

    paymentForm : this.fb.group({
      nameOnCard : ['',[Validators.required]],
    })
    
  })

  getAddressFormValues(){
    this.accountService.getUserAddress().subscribe({
      next:address=>{
        address && this.checkOutForm.get('addressForm')?.patchValue(address);
      }
    })
  }

  getDeliveryMethodValue(){
    const basket = this.basketService.getCurrentBasketValue();
    if(basket && basket.deliveryMethodID){
      this.checkOutForm.get('deliveryForm')
                      ?.get('deliveryMethod')
                      ?.patchValue(basket.deliveryMethodID.toString())
    }
  }
}
