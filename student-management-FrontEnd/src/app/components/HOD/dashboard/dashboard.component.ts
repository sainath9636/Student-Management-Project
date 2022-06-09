import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/home/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class HodDashboardComponent implements OnInit {

  name = localStorage.getItem("name")
  url = localStorage.getItem('url')
  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.logoutService().subscribe(res=>{
      //this.url = localStorage.getItem('url')!
      localStorage.clear()
      this.router.navigate(['']).then(()=>window.location.reload())
      console.log(res)
    })

  }

}
