export interface Product{
  _id: any;
  productId: number;
  productSku: string;
  productName: string;
  productPrice: number;
  productShortName: string;
  productDescription: string;
  createdDate: Date;
  deliveryTimeSpan: string;
  categoryId: number;
  productImageUrl: string;
  userId: number;
  isOnSale: boolean;
  discount: number;
  isFreeShipping: boolean;
  inStock: boolean;
  rating: number[]; // Array to represent the rating system
  reviews: number;
}