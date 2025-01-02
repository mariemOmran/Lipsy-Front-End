import { Injectable } from '@angular/core';
import { ICart } from '../Models/icart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // those lines i wrong in it i didn't make subject and don't subscribe on it 
  private cartSubject = new BehaviorSubject<ICart[]>(this.getProductFromLocatStorage());
  cartItems$ = this.cartSubject.asObservable();
  constructor() { }
  saveProductLocalStorage(productID:number){
    let cartData = localStorage.getItem('cart');
    let cart :ICart [] = cartData ? JSON.parse(cartData):[];

    let existingItemIndex = cart.findIndex(item => item.productId === productID);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity++;
    } else {
         cart.push({ productId: productID, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart); 
  }

  getProductFromLocatStorage():ICart[] {
    let products:ICart[] =  JSON.parse( localStorage.getItem('cart') || '[]');
    return products;
  }

  getCountProducts():number{
    let products:ICart[] =  JSON.parse( localStorage.getItem('cart') || '[]');
    return products.length;
  }
  decreaseProductQuantity(productID:number){
    let products:ICart [] = this.getProductFromLocatStorage();

    let index = products.findIndex(n=>n.productId==productID);

    if(index!=-1){
      products[index].quantity--;
      if(products[index].quantity==0){
        products.splice(index,1);
      }

      localStorage.setItem('cart',JSON.stringify(products));
      this.cartSubject.next(products);
    }
  }

  deleteItemFormLocalStorage(productID:number){
    let products:ICart [] = this.getProductFromLocatStorage();
    let index = products.findIndex(n=>n.productId==productID);
      products.splice(index,1);

    localStorage.setItem('cart',JSON.stringify(products));
    this.cartSubject.next(products); 
  }
    
  setQuantitiy(quantity:number,productId:number){
    let products:ICart [] = this.getProductFromLocatStorage();

    let index = products.findIndex(n=>n.productId==productId);
    products[index].quantity=quantity;
      if(products[index].quantity==0){
        products.splice(index,1);
      }
        localStorage.setItem('cart',JSON.stringify(products));
        this.cartSubject.next(products);
    
  }
}
