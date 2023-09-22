import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.css']
})
export class AdminCreateUserComponent {

  u : any

  constructor(private http : HttpClient , private fb : FormBuilder , private route : Router) {}

  newUser = this.fb.group({
    name : ['' , Validators.required],
    email : ['' , [Validators.required , Validators.email]],
    password : ['' , Validators.required]
  })

  adduser() {
    this.u = this.newUser.controls
    if(this.newUser.valid) {
      let newUser = this.newUser.getRawValue()
      this.http.post('http://localhost:4000/api/admin/add-user' , newUser , {
        withCredentials : true
      }).subscribe((res) => {
        console.log('added successfully');
        this.route.navigate(['/admin/dashboard'])
      }, (err) => {
        console.log('something went wrong');
      })
    }
  }

  redirect() {
    this.route.navigate(['/admin/dashboard'])
  }

}
