import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
}) 
export class ManageusersComponent implements OnInit {
  @ViewChild('usersForm') usersForm:NgForm;
  apiUrl="https://uxproducts-9193c-default-rtdb.firebaseio.com/users.json";
     
  users:any;
  success=false;   
  errr=false;message=''; 
  userId='';
  edit=false;
  constructor(private router:Router,
              private _userService:UserServiceService,  
              private http:HttpClient,
              ) { }
  
  ngOnInit(): void { 
    this.getUsers();
    // console.log(this.users);
  } 

  onAddUsers(userData:{name:string,mobile:string,email:string}){
    if(!this.edit){
      // console.log(userData); 
      this.users.push(userData); 
      this.http.post(this.apiUrl,userData).subscribe(res=>{
        console.log(res);
        this.message="User Added Successfull !!";
      },err=>{
        this.message=err;
      }); 
      this.success=true;
    }else{
      ///////////// UPDATE USER  /////////////////
      console.log(userData); 
      let url="https://uxproducts-9193c-default-rtdb.firebaseio.com/users/"+this.userId+".json";
      this.http.put(url,userData).subscribe(res=>{
        this.message="User Updated !!";
        this.success=true;  
        this.edit=false; 
        this.getUsers();
      },err=>{  
        this.message=err;
        this.errr=true;
      }); 
    }
  } 
  
  getUsers(){
    this.http.get(this.apiUrl)
    .pipe(map(resData=>{
      // console.log(resData);
      const userArray=[];
      for(const key in resData){ 
        // console.log(resData[key]);
        if(resData.hasOwnProperty(key)){
          // userArray.push({userId:key,name:resData[key].name,email:resData[key].email,mobile:resData[key].mobile})
          userArray.push({userId:key, ...resData[key]})
        }
      }  
      return userArray;
    })).subscribe(res=>{
      // console.log(res);
      this.users=res;
    })
  } 
  deleteUser(userId){
    if(confirm("Are you sure to delete this user")){
    let url="https://uxproducts-9193c-default-rtdb.firebaseio.com/users/"+userId+".json";
    this.http.delete(url).subscribe(res=>{
      this.message="User Deleted Successfully";
      this.success=true;
      this.getUsers();
    },
    err=>{
      this.message=err;
      this.errr=true;
    }); 
    }
  }
  editUser(userId,index){
    this.edit=true;
    let user=this.users[index];
    console.log(user);
    this.userId=user.userId;
    this.usersForm.setValue({
      name:user.name,
      mobile:user.mobile,
      email:user.email,
    });
  } 
   
}
