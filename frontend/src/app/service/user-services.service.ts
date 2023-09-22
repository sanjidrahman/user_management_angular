import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../component/models/app.models';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost:4000/api/admin/users', {
      withCredentials: true
    })
  }

  loadProfile() : Observable<Users> {
    return this.http.get<Users>('http://localhost:4000/api/user' , {
      withCredentials : true
    })
  }

}
