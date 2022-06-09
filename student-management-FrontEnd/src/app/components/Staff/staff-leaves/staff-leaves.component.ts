import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/student/home/home.service';

@Component({
  selector: 'app-staff-leaves',
  templateUrl: './staff-leaves.component.html',
  styleUrls: ['./staff-leaves.component.css']
})
export class StaffLeavesComponent implements OnInit {

  leaveForm = new FormGroup({
    reason : new FormControl('', Validators.required),
    start_date : new FormControl('', Validators.required),
    end_date : new FormControl('', Validators.required),
  })
  data:any
  constructor(private service: HomeService) { }

  ngOnInit(): void {
    this.viewAllLeaves()
  }
  leaveApply(){
    console.log(this.leaveForm.value)
    this.service.applyLeave({...this.leaveForm.value,'role':'TEACHER',"id": localStorage.getItem('id')}).subscribe(res=>{
      console.log("Leaves apply", res)
      this.data = res
    })

  }
  viewAllLeaves(){
    this.service.viewAllLeaves(localStorage.getItem('id')).subscribe(res=>{
      console.log("Leaves", res)
      this.data = res;
    })
  }

}
