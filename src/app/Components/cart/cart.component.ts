import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ItemCartComponent } from './item-cart/item-cart.component';
import { CartService } from '../../Serivces/cart.service';
import { ICart } from '../../Models/icart';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../Models/iproduct';
import { ProductService } from '../../Serivces/product.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ItemCartComponent,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit ,OnDestroy {
  private subscriptions: Subscription[] = [];

  
  constructor(private cartServices:CartService,private  productService:ProductService) {}
  
  productsInCart!:ICart[];
  products:Iproduct[]=[];
  ngOnInit(): void {
    
   this.MappingFromIcarToIproduct();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  updateListProduct(){
    this.MappingFromIcarToIproduct();
  }
// function to get products from local storage using product serivice
  MappingFromIcarToIproduct() {
    this.productsInCart = this.cartServices.getProductFromLocatStorage();
    console.log('productsInCart'+this.productsInCart);
    this.products = [];
    this.productsInCart.forEach((e) => {
      const subscription = this.productService.featchDate(e.productId).subscribe({
        next: (data) => {
          data.qunatity = e.quantity;
          console.log(data);
          this.products.push(data);
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.subscriptions.push(subscription);
    });
  }
  
}
