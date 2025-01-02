import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../Serivces/shop.service';
import { ProductService } from '../../../Serivces/product.service';
import { Iproduct } from '../../../Models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent  implements OnInit {
  products!:Iproduct[];
constructor(private productService:ProductService,private router:Router) {}

ngOnInit(): void {
  this.productService.getAllProduct().subscribe({
    next:(data)=>{
      console.log(data);
      this.products=data;
    },
    error:(error)=>{
      console.log(error)
    }
  })
}
edite(id:number){
  this.router.navigate(['/Dashboard',id]);
}
delete(id:number){
  console.log("deleted")
  this.productService.deleteProduct(id).subscribe({
    next:(data)=>{
      this.products = this.products.filter(n=>n.id !== id);
    },error:(error)=>{
    }
  });
}
addProduct(){
  this.router.navigate(["/Dashboard",'0'])
}
}
