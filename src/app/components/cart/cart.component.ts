import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../models/cart.model';
// import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl , Validators, ValidationErrors } from '@angular/forms';

import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { MyToastComponent } from '../my-toast/my-toast.component';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() cartItems: Cart[] = [];
  cartSize: number = 0;
  cartTotal: number = 0;
  checkoutForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    creditcard: new FormControl(''),
    expiry: new FormControl(''),
    cvv: new FormControl(''),
  });
  expiryPattern = "^(0?[1-9]|1[0-2])\/\\d{2}$";

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private router: Router) {
    
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.cartService.myCartSize.subscribe((cartSize: number) => {this.cartSize = cartSize;})
    this.cartService.myCartTotal.subscribe((cartTotal: number) => {this.cartTotal = cartTotal;})

    this.checkoutForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      creditcard: ['', Validators.compose([Validators.required, Validators.minLength(16)])],
      expiry: ['', Validators.compose([Validators.required, Validators.pattern(this.expiryPattern)])],
      cvv: ['', Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3)])]
    });
  }

  get fullname() {
    return this.checkoutForm.get('fullname');
  }

  get address() {
    return this.checkoutForm.get('address');
  }

  get phone() {
    return this.checkoutForm.get('phone');
  }

  get creditcard() {
    return this.checkoutForm.get('creditcard');
  }

  get expiry() {
    return this.checkoutForm.get('expiry');
  }

  get cvv() {
    return this.checkoutForm.get('cvv');
  }

  removeItem(cart:Cart) {
    if (confirm('Are you sure you want to remove this item?')) {
      const ret: string = this.cartService.removeProduct(cart);
      this.cartItems = this.cartService.getCart();
      this.addToast((`${ret}`))
    }
    
    return false;
  }

  cancelOrder() {
    if (confirm('Are you sure you want to cancel this order? This operation will empty your cart')) {
      this.cartService.emptyCart();
      this.cartItems = this.cartService.getCart();
      this.cartTotal = 0;
      // this.toastr.info("Completed", "Alpha Store")
      this.addToast((`All Order Cancelled Successfully`))
    }
    
    return false;
  }

  onQtyChange(cart:Cart, quantity:string) {
    cart.quantity = Number(quantity);
    cart.total = Number(quantity) * cart.price;
    const ret: string = this.cartService.addProduct( cart);
    // this.toastr.info(ret, "Alpha Store")
    this.addToast((`${ret}`))
  }

  onSubmit() {
    console.warn(this.checkoutForm.value);
    const sendData = {
      ...this.checkoutForm.value,
      totalPrice: this.cartTotal
    }
    let data = Buffer.from(JSON.stringify(sendData)).toString('base64');
    this.cartService.emptyCart();
    this.router.navigateByUrl(`/confirmation/${data}`);
    return false;
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

  getFormValidationErrors() {
    let myError: [] = [];
    Object.keys(this.checkoutForm.controls).forEach(key => {
      const controlErrors: ValidationErrors | null | undefined = this.checkoutForm.get(key as string)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

}
