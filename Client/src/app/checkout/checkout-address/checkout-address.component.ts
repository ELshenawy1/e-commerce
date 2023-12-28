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
  @Input() checkOutFrom? : FormGroup;
  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkOutFrom?.get('addressForm')?.value).subscribe({
      next:()=>{
        this.saved = true;
        this.checkOutFrom?.get('addressForm')?.reset(this.checkOutFrom.get('addressForm')?.value)
      }
    })
  }
}
