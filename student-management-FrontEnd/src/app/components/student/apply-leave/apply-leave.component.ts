import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/student/home/home.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
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
    this.service.applyLeave({...this.leaveForm.value,'role':'STUDENT',"id": localStorage.getItem('id')}).subscribe(res=>{
      console.log("Leaves apply", res)
      this.data = res
      this.leaveForm.reset()
    })

  }
  viewAllLeaves(){
    this.service.viewAllLeaves(localStorage.getItem('id')).subscribe(res=>{
      console.log("Leaves", res)
      this.data = res;
    })
  }

}
