import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { Store } from '@ngrx/store';
import { Profile, Users } from '../models/app.models';
import { retrieveUserProfile } from '../state/app.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  message = ''
  email = ''
  image: any = ''
  selectedFile: File

  constructor(private http: HttpClient, private store: Store<{ userProfile: Profile }>) { }

  ngOnInit() {
    this.http.get('http://localhost:4000/api/user', {
      withCredentials: true
    }).subscribe((data: any) => {
      this.message = `Hi , ${data.name}`
      this.email = `${data.email}`
      this.image = data.image
      Emitters.authEmitter.emit(true)
    },
      (err) => {
        this.message = 'You are not logged in'
        Emitters.authEmitter.emit(false)
      }
    )
  }

  uploadFile(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }


  onSubmit() {
    let formdata = new FormData()
    formdata.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:4000/api/image', formdata, {
      withCredentials: true
    }).subscribe((res) => {
      Emitters.authEmitter.emit(true)
      this.store.dispatch(retrieveUserProfile())
      console.log('success');
    },
      (err) => {
        console.log('Something went wrong' + err);

      }
    )
  }
}
