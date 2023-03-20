import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { NavigationService } from 'src/app/services/navigation.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart.model';

import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { MyToastComponent } from '../my-toast/my-toast.component';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent {
  @Input() product: Product;
  @Output() product2Add = new EventEmitter();

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(
    private productService: ProductService,
    private navigation: NavigationService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {
    this.product = {
      id: 0,
      product_name: '',
      price: 0,
      image: '',
      description: '',
    };
  }

  ngOnInit(): void {
    let id: number = 0;
    let product: Product[];
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      id = Number(paramMap.get('id'));
    });

    this.productService.getProducts(id).subscribe((res) => {
      product = res as Product[];
      this.product = product[0];
    });
  }

  goBack(): void {
    this.navigation.back();
  }

  addProduct2Cart(product: Product) {
    let cart:Cart = {
      ...product,
      quantity: 1,
      total: Number(product.price)
    }
    this.cartService.addProduct(cart)
    this.product2Add.emit(cart);
    this.addToast((`${cart.product_name} added Successfully to cart with quantity ${cart.quantity}`))
  }

  addToast(content: string, messageType: 'info' | 'success' | 'warning'='info') {
    const options = {
      title: `Alpha Store Notification`,
      content: content,
      delay: 5000,
      placement: ToasterPlacement.TopCenter,
      color: messageType,
      autohide: true
    }
  
    const componentRef = this.toaster.addToast(MyToastComponent, { ...options });
  }
}
