import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/home/navigation/navigation.component';
import { HomeComponent } from './components/home/home/home.component';
import { AcademicsComponent } from './components/home/academics/academics.component';
import { FacilitiesComponent } from './components/home/facilities/facilities.component';
import { DepartmentsComponent } from './components/home/departments/departments.component';
import { AboutUsComponent } from './components/home/about-us/about-us.component';
import { LoginComponent } from './components/home/login/login.component';
import { MarksComponent } from './components/student/marks/marks.component';
import { ProfileComponent } from './components/student/profile/profile.component';
import { StudentLeaderboardComponent } from './components/student/student-leaderboard/student-leaderboard.component';
import { FacultyComponent } from './components/student/faculty/faculty.component';
import { ApplyLeaveComponent } from './components/student/apply-leave/apply-leave.component';
import { DashboardComponent } from './components/student/dashboard/dashboard.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

//import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { StudentHomeComponent } from './components/student/student-home/home.component';
import { StaffHomeComponent } from './components/Staff/staff-home/staff-home.component';
import { StaffDashboardComponent } from './components/Staff/staff-dashboard/staff-dashboard.component';
import { StaffLeavesComponent } from './components/Staff/staff-leaves/staff-leaves.component';
import { StaffProfileComponent } from './components/Staff/staff-profile/staff-profile.component';
import { StudentDetailsComponent } from './components/Staff/student-details/student-details.component';
import { StudentLeavesListComponent } from './components/HOD/student-leaves/student-leaves.component';
import { HodDashboardComponent } from './components/HOD/dashboard/dashboard.component';
import { HodHomeComponent } from './components/HOD/hod-home/hod-home.component';
import { HodProfileComponent } from './components/HOD/profile/profile.component';
import { StaffLeavesListComponent } from './components/HOD/staff-leaves/staff-leaves.component';
import { AddMarksComponent } from './components/HOD/add-marks/add-marks.component';
import { RegisterCandidateComponent } from './components/HOD/register-candidate/register-candidate.component';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AcademicsComponent,
    FacilitiesComponent,
    DepartmentsComponent,
    AboutUsComponent,
    LoginComponent,
    MarksComponent,
    ProfileComponent,
    StudentLeaderboardComponent,
    FacultyComponent,
    ApplyLeaveComponent,
    DashboardComponent,
    StudentHomeComponent,
    StaffHomeComponent,
    StaffDashboardComponent,
    StaffLeavesComponent,
    StaffProfileComponent,
    StudentDetailsComponent,
    StudentLeavesListComponent,
    HodDashboardComponent,
    HodHomeComponent,
    HodProfileComponent,
    StaffLeavesListComponent,
    AddMarksComponent,
    RegisterCandidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas, far)

   }

}
