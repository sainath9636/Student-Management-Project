import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/student/home/home.service';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.css']
})
export class StaffHomeComponent implements OnInit {
  data:any;
  constructor(private service: HomeService) {
    this.getLeaderBoard()
   }

  ngOnInit(): void {
  }
  getLeaderBoard(){
    this.service.leaderboard().subscribe(res=>{
      console.log(res)
      this.data = res
    })
  }

}
