import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff/staff.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class HodProfileComponent implements OnInit {

  data:any
  constructor(private service:StaffService) { }

  ngOnInit(): void {
    this.getProfile()
  }
  getProfile(){
    this.service.getProfile(localStorage.getItem('id')).subscribe(res=>{
      console.log(res);
      this.data = res
    })
  }

}
