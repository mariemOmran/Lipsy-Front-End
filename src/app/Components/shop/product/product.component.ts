import { Component, Input, OnInit } from '@angular/core';
import { Iproduct } from '../../../Models/iproduct';
import { ICart } from '../../../Models/icart';
import { CartService } from '../../../Serivces/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input()  public product!: Iproduct;

  

  constructor(private cartServices:CartService) {}
 
  saveProductLocalStorage(productID:number){
    this.cartServices.saveProductLocalStorage(productID);
  }
}
