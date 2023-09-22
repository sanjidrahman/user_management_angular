import { Component } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isAuthenticated = false;

  constructor(private http : HttpClient) {}

  ngOnInit() {
    Emitters.authEmitter.subscribe((auth : boolean) => {
      this.isAuthenticated = auth
    })
  }

  logout() {
    this.http.post('http://localhost:4000/api/logout' , {} , { withCredentials : true }).subscribe(() => {
      this.isAuthenticated = false
    })
  }

}
