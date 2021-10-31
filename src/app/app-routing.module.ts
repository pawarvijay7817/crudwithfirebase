import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageusersComponent } from './manageusers/manageusers.component';

const routes: Routes = [
  {path:'',component:ManageProductsComponent },
  {path:'users',component:ManageusersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
