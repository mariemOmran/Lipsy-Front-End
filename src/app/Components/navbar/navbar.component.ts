import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {

 
isAdmin!:boolean;
isAdminString!:any;
   countProducts:number=0;
   
constructor(private authenticationServices : AuthenticationService,private cartService:CartService) {
  this.countProducts= this.cartService.getCountProducts();
 this. isAdminString = localStorage.getItem('isAdmin');
  this. isAdmin = JSON.parse(this.isAdminString);
}
/// this is line i mistack on it i  don't subscribe 
ngOnInit() {
  this.cartService.cartItems$.subscribe(cartItems => {
    this.countProducts = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total number of items
  });
}
logout(){
  this.authenticationServices.logout();
}

}
