import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StaffService } from 'src/app/services/staff/staff.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl('')
  })
  data:any;
  constructor(private service:StaffService) { }

  ngOnInit(): void {
    this.allStudents()
  }
  allStudents(){
    this.searchForm.value.search = ''
    this.service.getAllStudents().subscribe(res=>{
      console.log(res)
      this.data = res;
    })
  }
  searchStudent(){
    console.log(this.searchForm.value)
    this.service.searchStudent(this.searchForm.value.search).subscribe(res=>{
      console.log("Search Faculty", res)
      this.data = res
    })
  }

}
