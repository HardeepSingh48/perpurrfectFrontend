import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";

import { ProductcarouselComponent } from "./productcarousel/productcarousel.component";
import { MainbannerComponent } from "./mainbanner/mainbanner.component";
import { FooterComponent } from './footer/footer.component';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ProductcarouselComponent, MainbannerComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private cartSrv: CartService){}
  ngOnInit(){

    this.cartSrv.init();
  }

}
