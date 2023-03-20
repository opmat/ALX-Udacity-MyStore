import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() productList: Product[] = [];
  @Output() product2Add = new EventEmitter();

  constructor(private productService: ProductService, private cartService: CartService) {

  }

  ngOnInit():void {
    this.productService.getProducts().subscribe(res => this.productList = res as Product[]);
    // console.log(this.productList)
  }

  // addProduct2Cart(product: Product) {
  //   this.product2Add.emit(product);
  // }
  onAddProduct2Cart(cartItem: Cart) {
    this.cartService.addProduct(cartItem);
    this.product2Add.emit(cartItem);
  }

}
