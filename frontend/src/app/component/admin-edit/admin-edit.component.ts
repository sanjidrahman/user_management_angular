import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent {

  id : any
  name : any
  email : any
  param : any
  editForm : FormGroup
  e : any

  constructor(private http : HttpClient , private route : ActivatedRoute , private router : Router , private fb : FormBuilder , private toaster : ToastrService) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      id : [this.id],
      name : [this.name , Validators.required],
      email : [this.email]
    })

    this.route.params.subscribe(params => {
      this.param = params['id']
    })

    this.http.get('http://localhost:4000/api/admin/users' , {
      withCredentials : true
    }).subscribe((res) => {
      this.getUser(this.param)
    })

  }

  getUser(id : any) {
    this.http.post(`http://localhost:4000/api/admin/edit/${id}` , {
      withCredentials: true
    }).subscribe((res : any) => {
      console.log(res);
      this.id = res._id
      this.name = res.name
      this.email = res.email
      Emitters.adminAuthEmitter.emit(true)
    }, (err) => {
      Emitters.adminAuthEmitter.emit(false)
      this.router.navigate(['/admin/dashboard'])
    })
  }

  onSubmit() {
    this.e = this.editForm.controls
    let editdata = this.editForm.getRawValue()
    console.log(editdata);
    
    editdata.id = this.id
    editdata.name = this.name,
    editdata.email = this.email

    if(this.editForm.valid) {
      this.toaster.success('Updated Succesfully')
      this.http.post('http://localhost:4000/api/admin/edit' , editdata , {
        withCredentials : true
      }).subscribe((res) => {
        this.router.navigate(['/admin/dashboard'])
      },(err) => {
        console.log('went wrong');
      })
    }else{
      this.toaster.error('Please fill the field')
    }
  }
 
  redirect() {
    this.router.navigate(['/admin/dashboard'])
  }

}
