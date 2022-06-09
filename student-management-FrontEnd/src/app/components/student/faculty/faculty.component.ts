import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HomeService } from 'src/app/services/student/home/home.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('')
  })
  data:any;
  constructor(private service:HomeService) { }

  ngOnInit(): void {
    this.allFaculty()
  }
  allFaculty(){
    this.service.getAllFaculty().subscribe(res=>{
      this.searchForm.reset()
      console.log(res)
      this.data = res;
    })
  }
  searchFaculty(){
    this.service.getFaculty(this.searchForm.value.search).subscribe(res=>{
      console.log("Search Faculty", res)
      this.data = res
    })
    this.searchForm.reset()
  }

}
