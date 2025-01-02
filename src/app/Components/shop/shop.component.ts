import { Component, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { CategoriesService } from '../../Serivces/categories.service';
import { ShopService } from '../../Serivces/shop.service';
import { Iproduct } from '../../Models/iproduct';
import { CommonModule } from '@angular/common';
import { Icategory } from '../../Models/icategory';
import { IBrand } from '../../Models/ibrand';
import { BrandService } from '../../Serivces/brand.service';
import { Ifilteration } from '../../Models/ifilteration';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductComponent,CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  data: any;
  productList!:Iproduct [];
  categoryList !:Icategory[];
  BrandList !:IBrand[];
  pageNumber!:number;
  pageSize!:number;
  filter: Ifilteration = {
    brands: [],
    categories: [],
    pageNumber: 1,
    pageSize: 9
};

  constructor(private categorySerivces: CategoriesService,private shopServices:ShopService,private brandServices:BrandService) {
    console.log("dfd")
   }

  ngOnInit(): void {
    this.categorySerivces.featchData().subscribe({
      next:(data)=>{
        this.categoryList=data;
        console.log(this.categoryList);
      },error:(error )=>{
        console.log(error);
      }
    });
    this.brandServices.featchData().subscribe({
      next:(data)=>{
        this.BrandList=data;
        console.log(this.BrandList);
      },error:(errro)=>{
        console.log(errro);
      }
    });
    
    this.getProduct (this.filter)
  }

   ChangeListBasedOnInputCheckBox(ListOfInt:number[],e:Event) {
    const checked = (e.target as HTMLInputElement).checked;
    const inputValue = (e.target as HTMLInputElement).value;
    const parsedValue = parseInt(inputValue, 10);
    if(checked){
      ListOfInt.push(parsedValue)
    }else{
      const index = ListOfInt.indexOf(parsedValue);
      if (index > -1) {
        ListOfInt.splice(index, 1); 
      }
    }
  }
  getProduct (filter:Ifilteration){
    this.shopServices.featchData(filter).subscribe({
      next:(response)=>{
        this.productList= response.products;
        this.pageNumber=response.pageNumber;
        this.pageSize=response.pageSize
      },error:(error)=>{
        console.log(error);
      }
     });
  }
  onCheckboxCategoryChange(e :Event){
    this.ChangeListBasedOnInputCheckBox(this.filter.categories,e);
    this.getProduct (this.filter)
  }
  onCheckboxBrandsChange(e :Event){
    this.ChangeListBasedOnInputCheckBox(this.filter.brands,e);
    this.getProduct (this.filter)
  }
  getRange (n:number){
    return Array.from({length:n},(_,i)=> i+1);
  }
  clearFilters(){
    this.filter.brands=[];
    this.filter.categories=[];
    this
  }

}
