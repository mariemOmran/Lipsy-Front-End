import { Component } from '@angular/core';
import {  RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../app.routes';
import { AuthenticationService } from '../../Serivces/authentication.service';
import { CartService } from '../../Serivces/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
/**
 *
 */
isAdmin!:boolean;
isAdminString!:any;
   countProducts:number;
constructor(private authenticationServices : AuthenticationService,private cartService:CartService) {
  this.countProducts= this.cartService.getCountProducts();
 this. isAdminString = localStorage.getItem('isAdmin');
  this. isAdmin = JSON.parse(this.isAdminString);
}

logout(){
  this.authenticationServices.logout();
}

}
