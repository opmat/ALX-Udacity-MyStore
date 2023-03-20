import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import * as productlist from '../../assets/products-dummy.json'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];

  constructor() { }

  // method to load products from json file 
  getProducts(id: number=0, limit: number =10): Observable<Product | Product[]> { 
    
    const products: Product[]= (productlist as any).default;
    if (id) {
      return of(products.filter(product => {
        return product.id === id;
      }));
    } else {
      return of(products);
    }
    
   }

}
