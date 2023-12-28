import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Address, User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = 'https://localhost:7247/api/Account';
  private currentUserSource = new BehaviorSubject<User|null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private httpClient : HttpClient, private router : Router) { }

  loadCurrentUser(token : string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);
    return this.httpClient.get<User>(this.baseUrl,{headers}).pipe(
      map(user=>{
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  register(values : any){
    return this.httpClient.post<User>(`${this.baseUrl}/Register`, values).pipe(
      tap(user =>{
        localStorage.setItem('token' , user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  login(values : any){
    return this.httpClient.post<User>(`${this.baseUrl}/login`, values).pipe(
      tap(user =>{
      console.log(this.currentUser$)
        localStorage.setItem('token' , user.token);
        this.currentUserSource.next(user);
      })
    )
  }



  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    console.log(this.currentUser$)
    this.router.navigate(['/'])
  }

  checkEmailExists(email : string){
    return this.httpClient.get<boolean>(`${this.baseUrl}/EmailExists?email=${email}`);
  }

  getUserAddress(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get<Address>(`${this.baseUrl}/Address`,{headers})
  }

  updateUserAddress(address : Address){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.put(`${this.baseUrl}/Address`,address,{headers})
  }
}

