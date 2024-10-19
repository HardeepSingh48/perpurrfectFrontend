import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { SignupComponent } from './pages/admin/login/sign-up/sign-up.component';
import { HomeComponent } from './pages/website/home/home.component';
import { AboutUsComponent } from './pages/website/About/about-us/about-us.component';
import { ContactUsComponent } from './pages/website/About/contact-us/contact-us.component';
import { TermsConditionComponent } from './pages/website/About/terms-condition/terms-condition.component';
import { RetrunPolicyComponent } from './pages/website/About/retrun-policy/retrun-policy.component';
import { ProductDetailComponent } from './pages/website/product-detail/product-detail.component';
import { CustomerCartComponent } from './pages/website/customer-cart/customer-cart.component';
import { ProductListComponent } from './pages/website/product-list/product-list.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'AboutUs',
        component:AboutUsComponent
    },
    {
        path:'ContactUs',
        component:ContactUsComponent
    },
    {
        path:'TermsandCondition',
        component:TermsConditionComponent
    },
    {
        path:'Return',
        component:RetrunPolicyComponent
    },
    {
        path:'products/:id',
        component:ProductDetailComponent
    },
    {
        path:'cart',
        component:CustomerCartComponent
    },
    {
        path:'product',
        component:ProductListComponent
    },
    
    {
        path:'',
        component:LayoutComponent,
        children: [
            {
                path:'products',
                component:ProductsComponent
            }
        ]
    }
];
