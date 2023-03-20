import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastModule, ProgressModule } from '@coreui/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyToastComponent } from './components/my-toast/my-toast.component';
import { IconModule, IconSetService } from '@coreui/icons-angular';

@NgModule({
  declarations: [
    AppComponent,
    ProductItemComponent,
    CartComponent,
    ConfirmationComponent,
    ProductItemDetailComponent,
    ProductListComponent,
    MyToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IconModule,
    ToastModule,
    ProgressModule,
    ToastrModule.forRoot()
  ],
  providers: [
    IconSetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
