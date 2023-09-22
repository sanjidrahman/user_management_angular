import { profileRootSelector } from './../state/app.selectors';
import { Users } from './../models/app.models';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { uniquedata } from '../state/app.selectors';
import { retrieveUser } from '../state/app.actions';
import { Emitters } from '../emitters/emitters';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {


  constructor(private http : HttpClient , private fb : FormBuilder , private store : Store<{ allUsers : Users[] }> , private route : Router) {}

  userdata$ = this.store.pipe(select(uniquedata))
  u : any

  ngOnInit() {
    this.http.get('http://localhost:4000/api/admin/users' , {
      withCredentials : true
    }).subscribe((res) => {
      this.store.dispatch(retrieveUser())
      Emitters.adminAuthEmitter.emit(true)
    })
  }

  searchForm = this.fb.group({
    name : ['']
  })

  editUser(id : any) {
    this.route.navigate(['/admin/dashboard/edit_user' , id])
  }

  deleteUser(id : any) {
    this.http.post(`http://localhost:4000/api/admin/delete/${ id } ` , {
      withCredentials : true
    }).subscribe((res) => {
      this.store.dispatch(retrieveUser())
      Emitters.adminAuthEmitter.emit(true)
    },(err) => {
      console.log('something went wrong');
      
    })
  }

  search() {
    let searchVal = this.searchForm.getRawValue()
    this.http.post('http://localhost:4000/api/admin/search' , searchVal , {
      withCredentials : true
    }).subscribe((res : any) => {
      this.userdata$ = of(res)
    },(err) => {
      console.log('something went wrong');
    })
  }

  redirect() {
    this.route.navigate(['/admin/dashboard/add_user'])
  }

}
