import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { Iproduct } from '../../../Models/iproduct';
import { CartService } from '../../../Serivces/cart.service';
import { ICart } from '../../../Models/icart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-cart.component.html',
  styleUrl: './item-cart.component.css'
})
export class ItemCartComponent {
@Input() product!:Iproduct;
@Output () removeProductClicked : EventEmitter<ICart[]> = new EventEmitter<ICart[]>();
constructor(private cartServices:CartService) {}
removeProduct(id:number){
  this.cartServices.deleteItemFormLocalStorage(id); 
  this.removeProductClicked.emit(this.cartServices.getProductFromLocatStorage())
}
updateQuantity(productId:number,quantity:number){
  this.cartServices.setQuantitiy(quantity,productId);
}
}
