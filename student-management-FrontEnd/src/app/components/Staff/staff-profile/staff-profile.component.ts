import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff/staff.service';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit {
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
