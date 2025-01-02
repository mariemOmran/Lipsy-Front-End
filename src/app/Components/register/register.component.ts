import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from '../../Serivces/authentication.service';
import { FormsModule } from '@angular/forms';
import { IuserInfo } from '../../Models/iuser-info';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
userName:string="";
Passward:string="";
Address:string="";
Email:string="";
userInfo!:IuserInfo;
constructor(private AuthServices:AuthenticationService,private router:Router) {}


onSubmit(){
  this.userInfo = {
    Username:this.userName,
    address:this.Address,
    Password:this.Passward,
    Email:this.Email,
  }
  this.AuthServices.Register(this.userInfo).subscribe({
    next:(response)=>{
      console.log(response);
      this.AuthServices.saveToke(response);
      this.router.navigateByUrl("");
    },error:(error)=>{
      console.log(error);
    }
  })
}
}
