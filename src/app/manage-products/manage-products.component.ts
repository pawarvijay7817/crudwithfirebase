import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  constructor(private _prodService:ProductsService) { }
  products;
  loader=false;
  Title=this._prodService.getTitle();
  index;
  editBtn=false;
  @ViewChild('id') id: ElementRef;
  @ViewChild('name') name:ElementRef;
  @ViewChild('price') price:ElementRef;
  
  ngOnInit(): void {
    this.getProducts();  
  }
  onAddProduct(id,name,price){
    console.log(id.value+name.value+price.value);
    
    this.products.push({
      id:id.value,
      name: name.value,
      price:price.value
    }); 
  }
  onDeleteProduct(id){
    if(confirm('Are you sure to delete this product')){
      this.products.splice(id,1);
      this.onSaveProduct();
    } 
  }
  getProducts(){
    this.loader=true;
    this._prodService.getProducts().subscribe(res=>{
      this.products=res;
      this.loader=false;
    },err=>{
      console.log(err);
    })
  }
  onEditProduct(id:number){
    this.index=id;
    this.editBtn=true;
    let prod=this.products[id]; 
    this.id.nativeElement.value=prod.id;
    this.name.nativeElement.value=prod.name;
    this.price.nativeElement.value=prod.price;
    console.log(prod); 
  }
  onUpdate(id,name,price){
    // console.log(id.value+name.value,price.value);
    this.products.splice(this.index,1,{id:id.value,name:name.value,price:price.value});
    this.onSaveProduct();
  }
  
  onSaveProduct(){
    this._prodService.saveProducts(this.products).subscribe(
      res=>{
        console.log(res);
      },err=>{
        console.log(err);
      });
  }
}
