import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/student/home/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  student_name = ''
  student_id = ''
  gender = ''
  department = ''
  phone_number = ''
  student_email = ''
  parent_name = ''
  parent_mobile_number = ''
  url = localStorage.getItem('url')
  constructor(private service:HomeService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.service.getProfile(localStorage.getItem('id')).subscribe(res=>{
      const {student_email,student_id,student_name,gender,department,phone_number,parent_mobile_number,parent_name}:any = res
      this.student_id = student_id
      this.student_email = student_email
      this.student_name = student_name
      this.gender = gender
      this.department = department
      this.phone_number = phone_number
      this.parent_mobile_number = parent_mobile_number
      this.parent_name = parent_name
      console.log(res)
    })
  }

}
