import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/home/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnChanges {
  // isLogged= false
  isLogged = localStorage.getItem('isLogged');
  url = localStorage.getItem('url')
  constructor(private service: LoginService, private router:Router) {
    console.log("Constructor")
    this.isLogged = localStorage.getItem('isLogged');

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes Occured")
  }

  ngOnInit(): void {
    console.log("On Init")

  }
  logout(){
    this.service.logoutService().subscribe(res=>{
      this.url = localStorage.getItem('url')!
      localStorage.clear()
      window.location.reload()
    })
  }
  dashboard(){
    if(localStorage.getItem('role')==='HOD'){
      this.router.navigate(['/hod'])
    }
    else if(localStorage.getItem('role')==='TEACHER'){
      this.router.navigate(['/staff'])
    }
    else if(localStorage.getItem('role')==='STUDENT'){
      this.router.navigate(['/student'])
    }
    else{
      this.router.navigate([''])
    }

  }

}
