import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
registerLocaleData(localeEsCo, 'es-CO');

import { AppRoutingModule } from './app-routing.module';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FiltersComponent } from './components/shopping-cart/filters/filters.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchPipe } from './pipes/search.pipe';
import { Globals } from './globals';
import { PoliticasComponent } from './components/privacidad/politicas/politicas.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { FinalizarComponent } from './components/shopping-cart/finalizar/finalizar.component';

const routes: Route[] = [
  {path: '', component: ShoppingCartComponent},
  {path: 'home', component: ShoppingCartComponent},
  {path: 'privacidad', component: PoliticasComponent},
  {path: 'producto', component: ViewProductComponent},
  {path: 'carrito', component: CartComponent},
  {path: 'finalizar', component: FinalizarComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    CarouselComponent,
    ShoppingCartComponent,
    FiltersComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    SearchPipe,
    PoliticasComponent,
    FilterPipe,
    ViewProductComponent,
    FinalizarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [RouterModule],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-Co' },
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
