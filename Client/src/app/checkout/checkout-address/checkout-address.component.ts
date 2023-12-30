import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent {
  saved : boolean = false;
  change(){
    this.saved = false;
  }
  constructor(private accountService : AccountService){}
  @Input() checkOutForm? : FormGroup;
  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkOutForm?.get('addressForm')?.value).subscribe({
      next:()=>{
        this.saved = true;
        this.checkOutForm?.get('addressForm')?.reset(this.checkOutForm.get('addressForm')?.value)
      }
    })
  }
}
