import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  isSubmitted: boolean = false;

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
      "userId": 0
    }

  categoryList: any[] = [];
  productsList: any[] = [];
  id!: string;

  constructor(private productSrv: ProductService) {


  }
  ngOnInit(): void {
    this.getProducts();
    this.getAllCategory();
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

  onSave() {
    this.isSubmitted = true;

    if (this.isFormValid()) {
      const userId = this.getUserId();
      this.productObj.userId = userId;

      const token = this.productSrv.getToken();
      if (!token) {
        console.error('No token found');
        return;
      }

      // console.log('Token:', token);
      const headers = new HttpHeaders().set('x-auth-token', token);

      this.productSrv.saveProduct(this.productObj, { headers }).subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res._id) {
            alert('Product created');
            this.getProducts();
          } else {
            alert('Failed to create product');
          }
        },
        (error) => {
          console.error('Error saving product', error);
        })

    }
  }
  isFormValid(): boolean {
    return (
      this.productObj.productSku &&
      this.productObj.productName &&
      this.productObj.productPrice &&
      this.productObj.productShortName &&
      this.productObj.productDescription &&
      this.productObj.deliveryTimeSpan &&
      this.productObj.categoryId &&
      this.productObj.productImageUrl
    );
  }

  resetForm() {
    this.productObj = {
      productId: 0,
      productSku: '',
      productName: '',
      productPrice: 0,
      productShortName: '',
      productDescription: '',
      createdDate: new Date(),
      deliveryTimeSpan: '',
      categoryId: 2147483647,
      productImageUrl: '',
      userId: 0
    };
  }
  onUpdate() {
    this.productSrv.updateProduct(this.id, this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert("Product updated");
        this.getProducts();
      }
      else {
        alert(res.message);
      }
    })

  }

  onDelete(item: any) {
    console.log(item)
    const isDelete = confirm('Are you sure you want to delete');
  if (isDelete) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || '');

    this.productSrv.deleteProduct(item._id).subscribe(
      () => {
        this.productsList = this.productsList.filter(product => product._id !== item._id);
      },
      error => {
        console.error('Error deleting product', error);
      }
    );
  }
}


  onEdit(item: any) {
    this.productObj = item;
    this.id = item._id;
    this.openSidePanel();
  }

  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }

  getUserId(): number {
    // Fetch the userId from a service or local storage
    // For example:
    return parseInt(localStorage.getItem('userId') || '0', 10);
  }
  // getToken() {
  //   return localStorage.getItem('token');
  // }

}
