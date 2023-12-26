import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public accountService : AccountService, public router : Router){}
  invalidData : boolean = false;
  hideAlert(){
    this.invalidData = false
  }
  registerationForm = new FormGroup({
    displayName : new FormControl('',[Validators.required,Validators.minLength(3)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required])
  })

  get getEmail(){
    return this.registerationForm.controls['email'];
  }
  get getPassword(){
    return this.registerationForm.controls['password'];
  }
  get getDisplayName(){
    return this.registerationForm.controls['displayName'];
  }

  onSubmit(){
    this.accountService.register(this.registerationForm.value).subscribe({
      next:()=>this.router.navigate(['/shop']),
      error:()=> this.invalidData = true
    })
  }
}
