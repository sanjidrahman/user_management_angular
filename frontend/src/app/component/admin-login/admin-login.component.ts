import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  adminLogin : FormGroup
  user : any
  status = false

  constructor(private fb : FormBuilder , private http : HttpClient , private route : Router) {}

  ngOnInit() {
   this.adminLogin = this.fb.group({
      email : ['' , [Validators.required , Validators.email]],
      password : ['' , Validators.required]
    })
  }

  onSubmit() {
    this.status = true
    this.user = this.adminLogin.controls
    console.log(this.user);
    
    if(this.adminLogin.valid) {
      let value = this.adminLogin.getRawValue()
      console.log(value);
      
      this.http.post('http://localhost:4000/api/admin/login' , value , {
        withCredentials : true
      }).subscribe((res) => {
        console.log(res);
        this.route.navigate(['admin/dashboard'])
      },(err) => {
        console.log('something error occured' , err);
      })
    }
  
  }

}
