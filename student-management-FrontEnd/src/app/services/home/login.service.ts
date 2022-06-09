import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogged = new BehaviorSubject(false)
  public profile = new BehaviorSubject('')
  public userId = new BehaviorSubject('')
  // isError = false
  details:any;
  constructor(private http:HttpClient) {
  }
  loginService(user:any){
    return this.http.post("http://127.0.0.1:8000/logged/",user)
  }
  logoutService(){
    return this.http.get("http://127.0.0.1:8000/logout/")
  }
  isStudent(){
    return localStorage.getItem('role')==="STUDENT"
  }
  isStaff(){
    return localStorage.getItem('role')==="TEACHER"
  }
  isHod(){
    return localStorage.getItem('role')==="HOD"
  }
}
