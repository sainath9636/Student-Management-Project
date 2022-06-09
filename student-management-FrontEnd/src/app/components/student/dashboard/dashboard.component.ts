import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/home/login.service';
import { HomeService } from 'src/app/services/student/home/home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //user = faUser;
  // UserId= ''
  // failed = 0;
  // passed = 0
  // cgpa = 0
  // label : Array<any>
  // overall:Array<any>;
  name = localStorage.getItem('name')
  url = localStorage.getItem('url')

  constructor(private service: HomeService, private loginService: LoginService,private router:Router) {
   
   }

  ngOnInit(): void {
    //this.getData()
  }
  logout(){
    this.loginService.logoutService().subscribe(res=>{
      //this.url = localStorage.getItem('url')!
      console.log(res)
    })
    localStorage.clear()
    this.router.navigate(['']).then(()=>window.location.reload())
  }
  // getData(){
  //   this.UserId = localStorage.getItem('id')!

  //   this.service.getRes(this.UserId).subscribe(res=> {
  //    console.log(res);
  //    const {failed,passed,cgpa,label,overall}:any = res
  //    //console.log("data: ",failed,passed, cgpa,label, overall)
  //    this.failed = failed
  //    this.passed = passed
  //    this.cgpa = cgpa
  //    this.label = label
  //    this.overall = overall
  //    //console.log("Data 1: ", this.failed, this.passed, this.cgpa, this.label, this.overall)
  //   }, error=> console.log(error))
  // }
}
