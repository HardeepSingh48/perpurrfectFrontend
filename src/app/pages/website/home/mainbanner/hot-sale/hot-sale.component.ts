import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../../../services/product/product.service';
import { Product } from '../../../../../models/products.model';
import { CartService } from '../../../../../services/cart/cart.service';

@Component({
  selector: 'app-hot-sale',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './hot-sale.component.html',
  styleUrls: ['./hot-sale.component.css']
})
export class HotSaleComponent implements AfterViewInit {

  @ViewChild('slider', { static: false }) slider!: ElementRef;

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


  items: { product: Product, quantity: Number }[] = [];
  categoryList: any[] = [];
  productsList: any[] = [];
  id!: string;

  constructor(private productSrv: ProductService, private cartSrv: CartService) {


  }

  ngOnInit(): void {
    this.getProducts();
    this.getAllCategory();
    this.getCart();


    // setTimeout(() => {
    //   if (this.slider && this.slider.nativeElement) {
    //     this.itemWidth = this.slider.nativeElement.offsetWidth / this.itemsToShow; // Set item width based on container
    //   }
    // }, 0);
    this.calculateItemWidth();
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

  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      this.categoryList = res;
      // console.log(res)
    },
      (error) => {
        console.error('Error fetching categories', error);

      })
  }

  getCart(){
    this.cartSrv.getCartItems().subscribe(result => {
      this.items = result;
    })
  }











  currentIndex = 0;
  itemsToShow = 4;
  itemWidth = 0;


  ngAfterViewInit() {
    // this.itemWidth = this.slider.nativeElement.offsetWidth / this.itemsToShow;
    this.calculateItemWidth();
  }

  nextSlide() {
    if (this.currentIndex < this.productsList.length - this.itemsToShow) {
      this.currentIndex++;
      this.updateSliderPosition();
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSliderPosition();
    }
  }

  updateSliderPosition() {
    if (this.slider && this.slider.nativeElement) {
      this.slider.nativeElement.style.transform = `translateX(-${this.currentIndex * this.itemWidth}px)`;
    }
  }

  // @HostListener('window:resize', ['$event'])
  onResize() {
    // Recalculate width on window resize
    this.calculateItemWidth();
  }
  calculateItemWidth() {
    if (this.slider && this.slider.nativeElement) {
      this.itemWidth = this.slider.nativeElement.offsetWidth / this.itemsToShow;
      this.updateSliderPosition();
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
