import { Injectable } from '@angular/core';
import { ICart } from '../Models/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
//save product in local storage
  saveProductLocalStorage(productID:number){
    let cartData = localStorage.getItem('cart');
    let cart :ICart [] = cartData ? JSON.parse(cartData):[];

    // Check if the product is already in the cart
    let existingItemIndex = cart.findIndex(item => item.productId === productID);

    if (existingItemIndex !== -1) {
        // If the product is already in the cart, increase its quantity by one
        cart[existingItemIndex].quantity++;
    } else {
        // If the product is not in the cart, add it as a new item with a quantity of 1
        cart.push({ productId: productID, quantity: 1 });
    }

    // Save the updated cart data back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
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
    }
  }

  deleteItemFormLocalStorage(productID:number){
    let products:ICart [] = this.getProductFromLocatStorage();
    let index = products.findIndex(n=>n.productId==productID);
      products.splice(index,1);

    localStorage.setItem('cart',JSON.stringify(products));
  }
    
  setQuantitiy(quantity:number,productId:number){
    let products:ICart [] = this.getProductFromLocatStorage();

    let index = products.findIndex(n=>n.productId==productId);
    products[index].quantity=quantity;
      if(products[index].quantity==0){
        products.splice(index,1);
      }
        localStorage.setItem('cart',JSON.stringify(products));
    
  }
}
