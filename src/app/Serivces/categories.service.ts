import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(public http :HttpClient) { }
  // private urlApi = "http://localhost:5277/api/Category";
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IldhbGxhQWhtZWQifQ.HgryLNfxeVEXit5PebKxzPHv3KW-ftqxOPAlAfVw3Zk'; 

  featchData():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });
    return this.http.get<any>(`${environment.apiUrl}/Category`, { headers: headers }).pipe(
      retry(3),
      catchError(environment.handleError)
     );
  }
  
}
