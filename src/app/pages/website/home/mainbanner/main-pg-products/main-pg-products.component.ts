import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../../../../../services/product/product.service';
import { CartService } from '../../../../../services/cart/cart.service';
import { Product } from '../../../../../models/products.model';

@Component({
  selector: 'app-main-pg-products',
  standalone: true,
  imports: [RouterModule,CommonModule,RouterLink],
  templateUrl: './main-pg-products.component.html',
  styleUrl: './main-pg-products.component.css'
})
export class MainPgProductsComponent {

  @ViewChild('slider', { static: false }) slider!: ElementRef; // Make sure this is set correctly
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


  products = [
    { id: 1, name: 'Product 1', price: 19.99, image: 'assets/product1.jpg' },
    { id: 2, name: 'Product 2', price: 24.99, image: 'assets/product2.jpg' },
    { id: 3, name: 'Product 3', price: 15.99, image: 'assets/product3.jpg' },
    { id: 4, name: 'Product 3', price: 15.99, image: 'assets/product3.jpg' },
    { id: 5, name: 'Product 3', price: 15.99, image: 'assets/product3.jpg' },
    { id: 6, name: 'Product 3', price: 15.99, image: 'assets/product3.jpg' },
    { id: 7, name: 'Product 3', price: 15.99, image: 'assets/product3.jpg' },
    { id: 8, name: 'Product 3', price: 15.99, image: 'assets/product3.jpg' },
    // Add more products here
  ];

  items: { product: Product, quantity: Number }[] = [];
  categoryList: any[] = [];
  productsList: any[] = [];
  id!: string;

  constructor(private productSrv: ProductService,private cartSrv : CartService) {
    
    
  }
  
  ngOnInit() {
    this.getProducts();
    setTimeout(() => {
      if (this.slider && this.slider.nativeElement) {
        this.itemWidth = this.slider.nativeElement.offsetWidth / this.itemsToShow; // Set item width based on container
      }
    }, 0); // Delay the calculation until the view is initialized
  }


  getProducts() {
    try {
      this.productSrv.getProducts().subscribe((res: any) => {
        this.productsList = res;
      },
        (error) => {
            console.error('Error fetching products', error);
        });
    } catch (error) {
      console.error('Error fetching products', error);
    }
  }

  getCart(){
    this.cartSrv.getCartItems().subscribe(result => {
      this.items = result;
    })
  }
  currentIndex = 0;
  itemsToShow = 4;
  itemWidth = 0;


  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSliderPosition();
    }
  }

  nextSlide() {
    if (this.currentIndex < this.products.length - this.itemsToShow) {
      this.currentIndex++;
      this.updateSliderPosition();
    }
  }

  updateSliderPosition() {
    if (this.slider && this.slider.nativeElement) {
      this.slider.nativeElement.style.transform = `translateX(-${this.currentIndex * this.itemWidth}px)`;
    }
  }

  addToCart(product: Product) {
    // console.log(product);
    if(!this.isProductinCart(product._id!)){
      this.cartSrv.addToCart(product._id!,1).subscribe(()=>{
        this.cartSrv.init();
      })
    }
    else{
      this.cartSrv.removeFromCart(product._id!).subscribe(()=>{
        this.cartSrv.init();
      })
    }

  }

  isProductinCart(productId:string){
    if(this.cartSrv.items.find(x=> x.product._id == productId)){
      return true;
    }
    else {return false;}
  };

}
