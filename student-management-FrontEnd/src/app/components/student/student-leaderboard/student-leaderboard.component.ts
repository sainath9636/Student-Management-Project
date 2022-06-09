import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/student/home/home.service';

@Component({
  selector: 'app-student-leaderboard',
  templateUrl: './student-leaderboard.component.html',
  styleUrls: ['./student-leaderboard.component.css']
})
export class StudentLeaderboardComponent implements OnInit {
  data:any;
  constructor(private service:HomeService) { }

  ngOnInit(): void {
    this.getLeaderBoard()
  }
  getLeaderBoard(){
    this.service.leaderboard().subscribe(res=>{
      console.log(res)
      this.data = res
    })
  }

}
