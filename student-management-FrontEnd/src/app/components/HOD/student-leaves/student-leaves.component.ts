import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff/staff.service';

@Component({
  selector: 'app-student-leaves',
  templateUrl: './student-leaves.component.html',
  styleUrls: ['./student-leaves.component.css']
})
export class StudentLeavesListComponent implements OnInit {
  pending:any = []
  remaining:any = []
  constructor(private service: StaffService) { }

  ngOnInit(): void {
    this.getStudentPendingLeaves()
  }
  getStudentPendingLeaves(){
    this.service.getPendingLeaves("STUDENT").subscribe(res=>{
      const {pending, remaining}:any = res
      this.pending = pending
      this.remaining = remaining
      console.log(res)
    })
  }
  updateLeave(id:any, status:any){
    const data = {"id":id, "status":status}
    this.service.updateLeave("STUDENT",data).subscribe(res=>{
      const {pending, remaining}:any = res
      this.pending = pending
      this.remaining = remaining
    })
  }

}
