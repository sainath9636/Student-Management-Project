import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged = localStorage.getItem('isLogged')?true:false;
  title = 'student-management-FrontEnd';
}
