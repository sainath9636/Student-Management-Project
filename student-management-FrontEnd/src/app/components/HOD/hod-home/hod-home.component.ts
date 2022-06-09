import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/student/home/home.service';

@Component({
  selector: 'app-hod-home',
  templateUrl: './hod-home.component.html',
  styleUrls: ['./hod-home.component.css']
})
export class HodHomeComponent implements OnInit {
  data:any
  constructor(private service:HomeService) {
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
