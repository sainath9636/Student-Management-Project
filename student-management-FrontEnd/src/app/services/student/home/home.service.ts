import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
  header:any
  constructor(private http: HttpClient) {
    console.log("Token ",localStorage.getItem('token'))
    this.header = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('token'))


   }
   getRes(id : String) {
    return this.http.get("http://127.0.0.1:8000/student-dashboard/"+id, { headers: this.header})

   }
   getProfile(id:any){
    return this.http.get("http://127.0.0.1:8000/student_profile/"+id,{ headers: this.header})
   }
   leaderboard(){
     return this.http.get("http://127.0.0.1:8000/student_leaderboard/"+localStorage.getItem('department'),{ headers: this.header})
   }
   getMarksApi(sem:String){
    return this.http.post("http://127.0.0.1:8000/student_marks/",{'semister':sem, 'id':localStorage.getItem('id')},{ headers: this.header})

   }
   getAllFaculty(){
    return this.http.get("http://127.0.0.1:8000/faculty-info/",{ headers: this.header})
   }
   getFaculty(data:any){
     return this.http.post("http://127.0.0.1:8000/faculty-info/",{'search':data},{ headers: this.header})
   }
   applyLeave(data:any){
     console.log("Leave service", data)
     return this.http.post("http://127.0.0.1:8000/apply_leave_stu/",data,{ headers: this.header})
   }
   viewAllLeaves(id:any){
    return this.http.get("http://127.0.0.1:8000/view_all_leaves/"+id,{ headers: this.header})
   }
   getSemsList(id:any){
     return this.http.get("http://127.0.0.1:8000/get_sem_list/"+id,{ headers: this.header})
   }
  }
