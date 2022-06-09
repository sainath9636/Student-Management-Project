import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff/staff.service';

@Component({
  selector: 'app-staff-leaves',
  templateUrl: './staff-leaves.component.html',
  styleUrls: ['./staff-leaves.component.css']
})
export class StaffLeavesListComponent implements OnInit {
  pending:any = []
  remaining:any = []
  constructor(private service: StaffService) { }

  ngOnInit(): void {
    this.getStaffPendingLeaves()
  }
  getStaffPendingLeaves(){
    this.service.getPendingLeaves("TEACHER").subscribe(res=>{
      const {pending, remaining}:any = res
      this.pending = pending
      this.remaining = remaining
      console.log(this.pending, this.remaining);
      console.log(res)
    })
  }
  updateLeave(id:any, status:any){
    const data = {"id":id, "status":status}
    this.service.updateLeave("TEACHER",data).subscribe(res=>{
      const {pending, remaining}:any = res
      this.pending = pending
      this.remaining = remaining
      console.log(this.pending, this.remaining);
      this.pending = res;
    })
  }

}
