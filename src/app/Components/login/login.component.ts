import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Serivces/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  constructor(private AuthSerivces:AuthenticationService,private router:Router) {
  }
  username:string="";
  password:string="";
  
  onSubmit() {
   
    this.AuthSerivces.login(this.username,this.password).subscribe({
      
      next: (response) => {
        // Extract the token from the response
        console.log(response.token);
        console.log(response);
        console.log("in Login Page")
        
        // Save the token in local storage
        this.AuthSerivces.saveToke(response.token);
        this.AuthSerivces.saveAdmin(response.isAdmin);
        // Redirect or perform other actions after successful login
        this.router.navigate(['/Home']);
      },
      error:(error) => {
        console.error('Login failed:', error);
        // Handle error (display error message, etc.)
      }}
    );}
}
