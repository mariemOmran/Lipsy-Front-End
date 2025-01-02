import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export const environment = {
    production: false,
  apiUrl: 'http://localhost:5277/api',
  handleError:(error:HttpErrorResponse)=>{
    if(error.status ===0){
        console.error("status 0");
    }else {
        console.error(error.message);
    }
    return throwError(()=> new Error (error.message));
  },
};
