import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { Product } from '../../../models/products.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  isAdded = false;

  product: Product =
  {
    "_id":"",
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

  customerservice = inject(ProductService);
  cartSrv=inject(CartService);
  route = inject(ActivatedRoute);
  // product!:Product;
  ngOnInit(){
    const id = this.route.snapshot.params["id"];
    this.customerservice.getProductsById(id).subscribe(result =>{
      this.product = result;
      // console.log(this.product);

    })
  }

  newReview = {
    comment: '',
    rating: 5
  };

  onRatingChange(event: MouseEvent): void {
    // Prevent event propagation to avoid conflict with the "Add Review" stars
    event.stopPropagation();
  }

  setReviewRating(rating: number): void {
    this.newReview.rating = rating;
  }

  submitReview(): void {
    // if (this.newReview.comment) {
    //   this.product.reviews.push({
    //     userName: 'Anonymous', // Ideally, get user info
    //     comment: this.newReview.comment,
    //     rating: this.newReview.rating
    //   });

    //   // Reset the form
    //   this.newReview = { comment: '', rating: 5 };
    // }
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
