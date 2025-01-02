import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Iproduct } from '../Models/iproduct';
import { IAddProduct } from '../Models/iadd-product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,private authenticationServcies:AuthenticationService) { }
  Authentication = this.authenticationServcies.getToken();
  
  featchDate(id:number):Observable<any>{
    const headers = new HttpHeaders({
      'Autherization' :`Bearer ${this.Authentication}`
    });
   return this.http.get<any>(`${environment.apiUrl}/Products/id?id=${id}`,{ headers:headers }).pipe(
    retry(3),
    catchError(environment.handleError)
   )
  }
  getAllProduct():Observable<any>{
    const headers = new HttpHeaders({
      'Autherization' :`Bearer ${this.Authentication}`
    });
    return this.http.get<any>(`${environment.apiUrl}/Products`,{ headers:headers }).pipe(
      retry(3),
      catchError(environment.handleError)
     )
  }
  deleteProduct(id:number):Observable<any>{
    const headers = new HttpHeaders({
      'Autherization' :`Bearer ${this.Authentication}`
    });
    return this.http.delete<any>(`${environment.apiUrl}/Products?id=${id}`,{ headers:headers }).pipe(
      retry(3),
      catchError(environment.handleError)
     )
  }
  updateProduct(id:number,product:Iproduct):Observable<any>{
    const headers = new HttpHeaders({
      'Autherization' :`Bearer ${this.Authentication}`
    });
    return this.http.put<any>(`${environment.apiUrl}/Products`,product,{ headers:headers }).pipe(
      retry(3),
      catchError(environment.handleError)
     )
  }
  AddProduct(product:IAddProduct):Observable<any>{
    const headers = new HttpHeaders({
      'Autherization' :`Bearer ${this.Authentication}`
    });
    return this.http.put<any>(`${environment.apiUrl}/Products/add`,product,{ headers:headers }).pipe(
      retry(3),
      catchError(environment.handleError)
     )
  }
}
