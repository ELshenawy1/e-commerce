import { AccountService } from './../account.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public accountService : AccountService, public router : Router){}
  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required])
  })

  invalidEmailAndPassword : boolean = false;

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next:user=> this.router.navigate(['/shop']),
      error:err => this.invalidEmailAndPassword = true
    })
  }
  hideAlert(){
    this.invalidEmailAndPassword = false;
  }
  get getEmail(){
    return this.loginForm.controls['email'];
  }
  get getPassword(){
    return this.loginForm.controls['password'];
  }
}
