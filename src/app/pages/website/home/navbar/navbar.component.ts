import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../services/product/product.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cart/cart.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  productObj: any =
  {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 2147483647,
    "productImageUrl": "",
    "userId": 0,
    "isOnSale": false,
    "discount": 0,
    "isFreeShipping": false,
    "inStock": false,
    "rating": [0, 0, 0, 0, 0],
    "reviews": 0
  }
  
  cartSrv = inject(CartService);
  router = inject(Router);
  get cartItems(){
    return this.cartSrv.items;
  }
  categoryList: any[] = [];
  
  constructor(private productSrv: ProductService, rout:Router) {


  }
  
  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      this.categoryList = res;
      // console.log(res)
    },
      (error) => {
        console.error('Error fetching categories', error);

      })
  }
  calculateTotalAmount(): number {
    const total =  this.cartItems.reduce((acc, item) => {
      const discountAmount = item.product.discount ? (item.product.productPrice * item.product.discount / 100) : 0; // Calculate discount
      const finalPrice = item.product.productPrice - discountAmount; // Final price after discount
      return acc + finalPrice * item.quantity; // Accumulate total
    }, 0);
    return parseFloat(total.toFixed(2));
  }

  onSearch(e:any){
    if(e.target.value){
      this.router.navigateByUrl("/product?search="+ e.target.value)
    }
  }
}
