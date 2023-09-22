import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogibComponent {

  submit = false
  user: any

  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  onSubmit() {
    this.submit = true
    this.user = this.loginForm.controls

    if (this.loginForm.valid) {
      let userLog = this.loginForm.getRawValue()
      this.http.post('http://localhost:4000/api/login', userLog, {
        withCredentials: true
      }).subscribe(
        (res) => {
          this.route.navigate(['']),
            (err: any) => {
              Swal.fire("Error", err.error.message);
            }
        })
    }
  }
}
