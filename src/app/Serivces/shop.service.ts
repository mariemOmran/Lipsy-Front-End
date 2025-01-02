import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable, catchError, observable, retry } from 'rxjs';
import { Ifilteration } from '../Models/ifilteration';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http:HttpClient,private authServices:AuthenticationService) { }

  // url = "http://localhost:5277/api/Products/filter";
  AuthenticationLocalStorage = this.authServices.getToken();

  featchData( filter:Ifilteration):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.AuthenticationLocalStorage}`
    });
    return this.http.post<any>(`${environment.apiUrl}/Products/filter`,filter,{headers:headers}).pipe(
      retry(3),
      catchError(environment.handleError)
     );
  }
  
}
