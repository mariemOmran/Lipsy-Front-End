import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ShopComponent } from './Components/shop/shop.component';
import { CartComponent } from './Components/cart/cart.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { RegisterComponent } from './Components/register/register.component';
import { authGuard } from './Gaurds/auth.guard';
import { authAdminGuard } from './Gaurds/auth-admin.guard';
import { ProductsTableComponent } from './Components/dashboard/products-table/products-table.component';
import { FormProductComponent } from './Components/dashboard/form-product/form-product.component';

export const routes: Routes = [
    {path:"",component:LayoutComponent,
    canActivate:[authGuard] ,children:[
        {path:"",redirectTo:'/Home',pathMatch:'full'},
        {path:"Home",component:HomeComponent},
        {path:"Shop",component:ShopComponent},
        {path:"cart",component:CartComponent}
    ]},
    // {path:"Dashboard",component:DashboardComponent ,canActivate:[authAdminGuard]},
    {
        path: "Dashboard",
        component: DashboardComponent,canActivate:[authAdminGuard] ,
        children: [
            { path: "", component: ProductsTableComponent, pathMatch: 'full' }, // Redirects to ProductsTableComponent by default
            { path: ":id", component: FormProductComponent,pathMatch: 'full', data: { regex: '^[0-9]+$' } } // Displays FormProductComponent with dynamic id parameter
        ]
    },
    {path:"Register",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"**",component:NotFoundComponent}
];
