import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {

  isAuthenticated : boolean

  constructor(private http : HttpClient , private router : Router) {}

  ngOnInit() {
    Emitters.adminAuthEmitter.subscribe((auth : boolean) => {
      this.isAuthenticated = auth
    })
  }

  logout() {
    this.http.post('http://localhost:4000/api/admin/logout' , {} , { withCredentials : true }).subscribe(() => {
      this.isAuthenticated = false
      this.router.navigate(['/admin'])
    })
  }

}
