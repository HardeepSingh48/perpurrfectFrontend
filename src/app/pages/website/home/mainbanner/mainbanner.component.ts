import { Component, ElementRef,OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPgProductsComponent } from './main-pg-products/main-pg-products.component';
import { HotSaleComponent } from './hot-sale/hot-sale.component';

@Component({
  selector: 'app-mainbanner',
  standalone: true,
  imports: [MainPgProductsComponent,HotSaleComponent],
  templateUrl: './mainbanner.component.html',
  styleUrls: ['./mainbanner.component.css']
})
export class MainbannerComponent {



}
