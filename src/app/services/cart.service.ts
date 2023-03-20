import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Cart[] = [];
  private cartTotal = new BehaviorSubject(0);
  myCartTotal = this.cartTotal.asObservable();
  private cartSize = new BehaviorSubject(0);
  myCartSize = this.cartSize.asObservable();
  storageName = 'cartin';


  constructor(private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.looadFromStorage();
  }

  looadFromStorage() {
    try {
      const localStorage = JSON.parse(this.localStorageService.getData(this.storageName));
      if (localStorage) {
        this.cart = localStorage;
      }
    } catch (e) {
      
    }
  }

  getCart() {
    this.looadFromStorage()
    this.recalculateCart();
    this.getCartSize();
    return this.cart

  }

  productIsInCart(cartItem: Cart): boolean {
    const i = this.cart.findIndex((_element) => _element.id === cartItem.id);
    return i > -1;
  }

  recalculateCart() {
    try {
      let cart = this.cart;
      this.cartTotal.next(Number(
        cart
          .map((item) => item.price * item.quantity)
          .reduce((sum, cost) => sum + cost)
      ));
    } catch (e) {
      // throw Error
    }

  }

  getCartSize() {
    this.cartSize.next(this.cart.length);
  }

  addProduct(cartItem: Cart): string {
    if (cartItem.quantity <= 0) {
      //delete item from cart
      this.removeProduct(cartItem);
      return 'Item Removed;'
    }
    let ret: string;
    const i = this.cart.findIndex((_element) => _element.id === cartItem.id);
    if (i > -1) {
      this.cart[i] = cartItem;
      ret = "Item Updated";
    } else {
      this.cart.push(cartItem);
      this.getCartSize();
      ret = "Item Added";
    }

    this.localStorageService.saveData(this.storageName, JSON.stringify(this.cart));
    this.recalculateCart();
    return ret;
  }

  removeProduct(cartItem: Cart): string {
    let ret: string = "";
    this.cart.forEach((value, index) => {
      if (value.id == cartItem.id) {
        this.cart.splice(index, 1);
        ret = "Item Removed";
      }
    });
    if (ret == "") { ret = "Unable to Remove Item" }
    this.localStorageService.saveData(this.storageName, JSON.stringify(this.cart));
    this.getCartSize();
    this.recalculateCart();
    return ret;
  }

  emptyCart() {
    this.cart.length = 0;
    this.localStorageService.clearData();
    this.getCartSize();
    this.recalculateCart();
  }
}
