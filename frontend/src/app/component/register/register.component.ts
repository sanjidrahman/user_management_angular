import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: any
  submit = false

  constructor(private fb: FormBuilder, private http: HttpClient , private router : Router) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  onSubmit() {
    this.submit = true
    this.user = this.registerForm.controls
    console.log(this.user);
    if (this.registerForm.valid) {
      let user = this.registerForm.getRawValue()
      console.log(user);
      this.http.post('http://localhost:4000/api/register' , user , {
        withCredentials : true
      }).subscribe(() => {
        this.router.navigate(['']),(err: any) => {
          console.log(err.message);
        }
      })
    }


  }

}
