import { Component } from '@angular/core';
import { ProductsTableComponent } from './products-table/products-table.component';
import { RouterOutlet } from '@angular/router';
import { FormProductComponent } from './form-product/form-product.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,FormProductComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
