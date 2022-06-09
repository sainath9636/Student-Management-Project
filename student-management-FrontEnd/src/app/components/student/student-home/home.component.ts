import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/home/login.service';
import { HomeService } from 'src/app/services/student/home/home.service';
import {Chart, registerables} from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class StudentHomeComponent implements OnInit {
  canvas:any;
  UserId= ''
  failed = 0;
  passed = 0
  cgpa = 0
  semisters = 0
  label : Array<any>
  overall:Array<Number>;
  name = localStorage.getItem('name')
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }
  public barChartType = 'bar';
  public barChartLegend = true;
  constructor(private service: HomeService,private loginService: LoginService,private router:Router) { }
  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement> document.getElementById('mychart');
    Chart.register(...registerables)
    this.getData()

  }
  getData(){
      this.UserId = localStorage.getItem('id')!
      this.service.getRes(this.UserId).subscribe(res=> {
      console.log(res);
      const {failed,passed,cgpa,label,overall, semisters}:any = res
      //console.log("data: ",failed,passed, cgpa,label, overall)
      this.failed = failed
      this.passed = passed
      this.cgpa = cgpa
      this.label = label
      this.overall = overall
      this.semisters = semisters+1
      console.log(overall)
      console.log(label)
      console.log(semisters)
      this.getBarChart()
      //console.log("Data 1: ", this.failed, this.passed, this.cgpa, this.label, this.overall)
      }, error=> console.log(error))

  }
  getBarChart(){

    //console.log("labels", this.label)
    var ctx = <CanvasRenderingContext2D>  this.canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
          labels:this.label,
          datasets: [{
              label: 'Overall Semisters Performance in %',
              data: this.overall,
              backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              "#6970d5",
              ],
              barThickness:80
          }]
      },
      options: {
        maintainAspectRatio:false,
        responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });


  }


}
