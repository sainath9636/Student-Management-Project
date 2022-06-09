import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { HomeService } from 'src/app/services/student/home/home.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit {
  sem =''
  semChart:any;
  mid1Chart:any;
  mid2Chart:any;
  slipChart:any;
  sem_list:any;
  marksForm = new FormGroup({
    sem : new FormControl('')
  })
  constructor(private service:HomeService) { }

  ngOnInit(): void {
    this.semChart = document.getElementById("sem");
    this.mid1Chart = document.getElementById('mid1');
    this.mid2Chart = document.getElementById('mid2');
    this.slipChart = document.getElementById("slip");
    Chart.register(...registerables)
    this.service.getSemsList(localStorage.getItem('id')).subscribe(res=>{
      this.sem_list = res
      this.marksForm.setValue({sem: this.sem_list[this.sem_list.length-1]})
      this.getMarks(this.marksForm.value.sem)
      console.log("end",this.sem_list[this.sem_list.length-1])
    })


  }
  getMarks(value:any){
    this.service.getMarksApi(value).subscribe(res=>{
      const {mid1,mid1_label,mid2,mid2_label,sem_marks, sem_label, slip, slip_label, sem}:any = res
      this.sem = sem
      this.getChart(this.semChart,sem_marks, sem_label,"Sem Exam");
      this.getChart(this.slipChart, slip, slip_label,"Slip Test");
      this.getChart(this.mid1Chart,mid1, mid1_label," Mid1 Exam");
      this.getChart(this.mid2Chart, mid2, mid2_label, "Mid2 Exam");
      console.log(res)
    })

  }
  getChart(chart:any,data:any, label:any, exam_name:any){
    const ctx = chart.getContext('2d')
    new Chart(ctx, {
      type: 'bar',
      data: {
          labels:label,
          datasets: [{
              label: 'Overall '+exam_name+' Performance in %',
              data: data,
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
