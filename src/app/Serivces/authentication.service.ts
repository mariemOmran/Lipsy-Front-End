import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, retry } from 'rxjs';
import { IuserInfo } from '../Models/iuser-info';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isloggedSubject:BehaviorSubject<boolean>;
  constructor(private http:HttpClient,private router:Router) {
    //set initial value to behavior Subject
    this.isloggedSubject=new BehaviorSubject<boolean>(this.isUserLogged());
  }
  login(userName:string,passward:string):Observable<any>{
    const body= {userName:userName,password:passward};
    this.isloggedSubject.next(true);
    return this.http.post<any>(`${environment.apiUrl}/Account/login`,body).pipe(
      retry(2),
      catchError(environment.handleError)
    );
  }


Register(userDataRegister:IuserInfo):Observable<any>{
  const body= {
    username: userDataRegister.Username,
    password: userDataRegister.Password,
    address: userDataRegister.address,
    email: userDataRegister.Email
  };
  return this.http.post<any>(`${environment.apiUrl}/Account`,body);
}

  saveToke(token:string):void{
    localStorage.setItem('token',token);
  }
  saveAdmin(isAdmin:string):void{
    localStorage.setItem('isAdmin',isAdmin);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
 
  isUserLogged(): boolean {
    return !!localStorage.getItem('token');
  }

 
  logout():void{
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
    this.isloggedSubject.next(false);
  }

  get isUserLoggedSubject(){
    return this.isloggedSubject.asObservable();
  }
}
