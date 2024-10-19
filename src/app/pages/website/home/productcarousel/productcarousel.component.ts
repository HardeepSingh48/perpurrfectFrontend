import { CommonModule } from '@angular/common';
import { Component,HostListener  } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-productcarousel',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './productcarousel.component.html',
  styleUrl: './productcarousel.component.css'
})
export class ProductcarouselComponent {
  isMouseDown = false;
  startX = 0;
  scrollLeft = 0;
  activeCategory = null;

  constructor(private productSrv: ProductService) {


  }

  ngOnInit() {
    this.getProducts();  // Fetch the products when the component loads
  }

  categories = [
    { id: 1, name: 'Featured' },
    { id: 2, name: 'Pregnancy & Postpartum' },
    { id: 3, name: 'Milks & Foods' },
    { id: 4, name: 'Diapers & Wipes' },
    { id: 5, name: 'Infant' },
    { id: 6, name: 'Strollers' }
  ];

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

  product = [
    { id: 1, name: 'Versele-Laga Bird Food', price: 39.00, image: 'assets/versele-laga.jpg', isNew: true, rating: [1, 1, 1, 1, 1], reviews: 5, purchases: 50 },
    { id: 2, name: 'Whiskas Tuna Cat Food', price: 39.00, image: 'assets/whiskas.jpg', isNew: true, rating: [1, 1, 1, 1, 1], reviews: 5, purchases: 50 },
    { id: 3, name: 'Drools Cat Food', price: 39.00, image: 'assets/drools.jpg', isNew: true, rating: [1, 1, 1, 1, 1], reviews: 5, purchases: 50 },
    { id: 1, name: 'Versele-Laga Bird Food', price: 39.00, image: 'assets/versele-laga.jpg', isNew: true, rating: [1, 1, 1, 1, 1], reviews: 5, purchases: 50 },
    { id: 2, name: 'Whiskas Tuna Cat Food', price: 39.00, image: 'assets/whiskas.jpg', isNew: true, rating: [1, 1, 1, 1, 1], reviews: 5, purchases: 50 },
    { id: 3, name: 'Drools Cat Food', price: 39.00, image: 'assets/drools.jpg', isNew: true, rating: [1, 1, 1, 1, 1], reviews: 5, purchases: 50 },{ id: 1, name: 'Versele-Laga Bird Food', price: 39.00, image: 'assets/versele-laga.jpg', isNew: true, rating: [1, 1, 1, 1, 1], reviews: 5, purchases: 50 },
    { id: 2, name: 'Whiskas Tuna Cat Food', price: 39.00, image: 'assets/whiskas.jpg', isNew: true, rating: [1, 1, 1, 1, 1], reviews: 5, purchases: 50 },
    { id: 3, name: 'Drools Cat Food', price: 39.00, image: 'assets/drools.jpg', isNew: true, rating: [1, 1, 1, 1, 1], reviews: 5, purchases: 50 },
  ];
  productsList: any[] = [];
  id!: string;


  filteredProducts = [...this.product];

  filterProducts(category: any) {
    // Filtering logic here (if needed)
    this.activeCategory = category;
    this.filteredProducts = this.product; // Display all products for now
  }


  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.startX = event.pageX;
    this.scrollLeft = (event.target as HTMLElement).scrollLeft;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onMouseMove(event: MouseEvent, container: HTMLElement) {
    if (!this.isMouseDown) return;
    const x = event.pageX - this.startX;
    container.scrollLeft = this.scrollLeft - x;
  }

  @HostListener('wheel', ['$event'])
onWheel(event: WheelEvent) {
  const productList = document.querySelector('.product-list') as HTMLElement;
  const sensitivityFactor = 6;
  productList.scrollLeft += event.deltaY* sensitivityFactor; // Adjust scroll based on the wheel movement
  event.preventDefault(); // Prevent default scrolling behavior
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
}
