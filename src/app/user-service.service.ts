import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url="https://uxproducts-9193c-default-rtdb.firebaseio.com/";
  constructor(private http:HttpClient) { }

  addUsers(user){
    return this.http.post(this.url+'users.json',user);
  }
}
