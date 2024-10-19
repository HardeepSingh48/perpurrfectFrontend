import { Component, inject } from '@angular/core';
import { Product } from '../../../models/products.model';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent {

  totalAmount: number = 0;

  cartSrv = inject(CartService);

  get cartItems(){
    return this.cartSrv.items;
  }


  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    // this.cartItems = this.cartService.getCartItems();
    // this.calculateTotalAmount();
  }

  // calculateTotalAmount(): void {
  //   this.totalAmount = this.cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
  // }

  removeItem(product: Product): void {
    this.cartSrv.removeFromCart(product._id!).subscribe(()=>{
      this.cartSrv.init();
  })
}

  clearCart(): void {
    // this.cartService.clearCart();
    this.getCartItems();
  }

  checkout(): void {
    console.log(`Total amount to be paid: $${this.totalAmount.toFixed(2)}`);
  }

  calculateTotalAmount(): number {
    const total =  this.cartItems.reduce((acc, item) => {
      const discountAmount = item.product.discount ? (item.product.productPrice * item.product.discount / 100) : 0; // Calculate discount
      const finalPrice = item.product.productPrice - discountAmount; // Final price after discount
      return acc + finalPrice * item.quantity; // Accumulate total
    }, 0);
    return parseFloat(total.toFixed(2));
  }
}
