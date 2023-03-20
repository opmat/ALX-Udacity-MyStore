import { Component, OnInit, Input, Output, EventEmitter, ViewChild  } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import {Cart} from 'src/app/models/cart.model';
import { ToastrService } from 'ngx-toastr';

import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { MyToastComponent } from '../my-toast/my-toast.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product;
  @Output() product2Add = new EventEmitter();

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor( private toastrService: ToastrService) {
    this.product = {
      "id": 0,
      "product_name": "",
      "price": 0,
      "image": "",
      "description": ""
    }
  }

  addProduct2Cart(product: Product) {
    let cart:Cart = {
      ...product,
      quantity: 1,
      total: Number(product.price)
    }
    this.product2Add.emit(cart);
    // this.toastrService.info("Added Successfully")
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
