import { Component, OnInit } from '@angular/core';
import { faGem, faShoppingCart, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { Cart } from  './models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Alpha-Store'; 
  faGem = faGem;
  faShoppingCart = faShoppingCart;
  faBarcode = faBarcode;

  cartItems: Cart[] = [];
  cartSize: number = 0;

  constructor(private cartService: CartService) {
    
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.cartService.getCartSize();
    this.cartService.myCartSize.subscribe((cartSize: number) => {this.cartSize = +cartSize;})
  }

}
