import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';
import {FilterPipeModule }from'ngx-filter-pipe';
import { OrdersComponent } from './components/orders/orders.component';
import { FilterByPipe } from './pipes/filter-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    ProductGridComponent,
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    AdminComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    FilterByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FilterPipeModule
  ],
  providers: [CartService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
