import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  header:any
  constructor(private http: HttpClient) {
    console.log("Token ",localStorage.getItem('token'))
    this.header = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('token'))
  }
  getAllStudents(){
    return this.http.get("http://127.0.0.1:8000/staff_search/", { headers: this.header})
  }
  searchStudent(data:any){
    console.log("search service", data)
    return this.http.post("http://127.0.0.1:8000/staff_search/", {"search": data},{ headers: this.header})
  }
  getProfile(id:any){
    return this.http.get("http://127.0.0.1:8000/staff_profile/"+id, { headers: this.header})
  }
  getPendingLeaves(user:any){
    return this.http.get("http://127.0.0.1:8000/leaves/"+user, { headers: this.header})
  }
  updateLeave(user:any, data:any){
    return this.http.post("http://127.0.0.1:8000/leaves/"+user, data, { headers: this.header})
  }
  getUser(id:any){
    return this.http.get("http://127.0.0.1:8000/getUser/"+id, { headers: this.header})
  }
  getCandidate(value:any){
    return this.http.get("http://127.0.0.1:8000/getCandidate/"+value, { headers: this.header})
  }
  registerCandidate(data:any){
    return this.http.post("http://127.0.0.1:8000/register_candidate/", data,{ headers: this.header})
  }
}
