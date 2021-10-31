import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url="https://uxproducts-9193c-default-rtdb.firebaseio.com/";
  constructor(private http:HttpClient) { }

  saveProducts(products:any){
    return this.http.put(this.url+'products.json',products);
  }
  getProducts(){
    return this.http.get(this.url+'products.json');
  } 
  getTitle(){
    return this.http.get(this.url+'dataTitle.json');
  }
}
