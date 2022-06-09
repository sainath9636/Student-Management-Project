import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/home/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userError = false
  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.email]),
    password : new FormControl('', Validators.required)
  })
  constructor(private service: LoginService, private router:Router) {
    this.userError = false
    if(localStorage.getItem('isLogged')){
      this.router.navigate([''])
    }
   }

  ngOnInit(): void {

  }
login(){
    //console.log(this.loginForm.value)
    this.service.loginService(this.loginForm.value).subscribe(
      res=> {
         console.log(res)
          //this.service.isLogged.next(true)
          this.userError = false
          var values = Object.values(res)
          var log = 'http://127.0.0.1:8000'
          console.log(values)
          const {id, url, name, department, role, token}:any = res
          localStorage.setItem('isLogged','true')
          localStorage.setItem('id',id)
          localStorage.setItem('url',url)
          localStorage.setItem('name', name)
          localStorage.setItem('department',department)
          localStorage.setItem('role',role)
          localStorage.setItem("token",token)
          this.router.navigate(['']).then(()=> window.location.reload())
      },
      error=> {
        this.userError = true
        console.log(error)}
    )
  }
  get emailId(){
    return this.loginForm.get('email')
  }
  get passWord(){
    return this.loginForm.get('password')
  }
}
