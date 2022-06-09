import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.css']
})
export class AcademicsComponent implements OnInit,OnDestroy {

  constructor() {
  }
  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }

  ngOnInit(): void {
    console.log("Academics")
  }

}
