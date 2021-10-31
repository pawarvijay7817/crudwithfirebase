import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ProductsService } from './products.service';
import { HttpClientModule } from '@angular/common/http';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ManageProductsComponent,
    ManageusersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
