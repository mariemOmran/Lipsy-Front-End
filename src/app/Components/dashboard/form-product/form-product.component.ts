import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../Models/iproduct';
import { Icategory } from '../../../Models/icategory';
import { CategoriesService } from '../../../Serivces/categories.service';
import { CommonModule } from '@angular/common';
import { IBrand } from '../../../Models/ibrand';
import { BrandService } from '../../../Serivces/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../Serivces/product.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IAddProduct } from '../../../Models/iadd-product';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css'
})
//Not compelete
export class FormProductComponent implements OnInit {
  id!: number;
  product: Iproduct = { id: 0, name: '', description: '', price: 0, qunatity: 0, categoryName: '', brandName: '', rate: 0, image: '' };
  productUpdated: Iproduct = { id: 0, name: '', description: '', price: 0, qunatity: 0, categoryName: '', brandName: '', rate: 0, image: '' };
  AddProduct:IAddProduct={id: 0, name: '', description: '', price: 0, qunatity: 0, categoryid:0, brandid: 0, image: ''}
  categories!: Icategory[];
  brands!: IBrand[];
  selectedFile: File | null = null;
  constructor(private categoryService: CategoriesService,
    private brandServices: BrandService, private route: ActivatedRoute,
    private productService: ProductService, private router: Router,private  http:HttpClient) {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id') ?? '0');
    });
  }

  ngOnInit(): void {
    this.categoryService.featchData().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });

    this.brandServices.featchData().subscribe({
      next: (data) => {
        this.brands = data;
      }
    });

    if (this.id != 0) {
      this.productService.featchDate(this.id).subscribe({
        next: (data) => {
          if (data) {
            this.product = data;
            this.productUpdated = { ...data }; // Deep copy to prevent reference issues
          }
        }, error: (error) => {
          console.log(error);
        }
      });
    }
  }

  editeProduct(id: number) {
    if(id!==0){
      this.productService.updateProduct(id, this.productUpdated).subscribe({
        next: (data) => {
          this.router.navigate(['/Dashboard']);
        }, error: (error) => {
          console.log(error);
        }
      });
    }else{
      this.categories.forEach(e=>{
        if(e.name==this.productUpdated.categoryName){
          this.AddProduct.categoryid=e.id;
        }
      })
      this.brands.forEach(e=>{
        if(e.name==this.productUpdated.brandName){
          this.AddProduct.brandid=e.id;
        }
      })
      if (!this.selectedFile) {
        console.error('No file selected');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      this.http.post<any>('http://localhost:5277/api/Images/upload',formData).subscribe(
        {next:(response) => {
          console.log('Image uploaded successfully:', response);
          this.AddProduct.image= response;
          this.AddProduct.name=this.productUpdated.name;
          this.AddProduct.price=this.productUpdated.price;
          this.AddProduct.qunatity=this.productUpdated.qunatity;
          this.AddProduct.description=this.productUpdated.description;
          // Handle response from the server
          this.productService.AddProduct(this.AddProduct).subscribe({
            next:(res)=>{
              console.log(res)
            },error:()=>{}
          })
        },
        error:(error) => {
          console.error('Error uploading image:', error);
          // Handle error
        }}
      );
    }
    this.router.navigate(['/Dashboard']);
  }
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

cateogriId!:number;

  //try two 
//   uploadProductWithImage(product: IAddProduct, imageFile: File) {
//     const formData = new FormData();
//     formData.append('name', product.name);
//     formData.append('price', product.price.toString());
//     formData.append('description', product.description);
//     formData.append('qunatity', product.qunatity.toString());
//     // Add other product properties as needed
    
//     formData.append('image', imageFile);
  
//     // Send the POST request to your API endpoint
//     return this.http.post<any>('http://localhost:5277/api/Products/add', formData);
//   }
// // Function to handle file selection
// onFileSelected(event: any) {
//   const file: File = event.target.files[0];
//   if (file) {
//     const formData = new FormData();
//     formData.append('file', file);

    

//     // Add the product with image and product data
//     this.uploadProductWithImage(this.AddProduct, file).subscribe(
//       {next:(response) => {
//         console.log('Product uploaded successfully:', response);
//         // Handle response from the server
//       },
//       error:(error) => {
//         console.error('Error uploading product:', error);
//         // Handle error
//       }}
//     );
//   }
// }
}
