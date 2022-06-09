import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMarksComponent } from './components/HOD/add-marks/add-marks.component';
import { HodDashboardComponent } from './components/HOD/dashboard/dashboard.component';
import { HodHomeComponent } from './components/HOD/hod-home/hod-home.component';
import { HodProfileComponent } from './components/HOD/profile/profile.component';
import { RegisterCandidateComponent } from './components/HOD/register-candidate/register-candidate.component';
import { StaffLeavesListComponent } from './components/HOD/staff-leaves/staff-leaves.component';
import { StudentLeavesListComponent } from './components/HOD/student-leaves/student-leaves.component';
import { AboutUsComponent } from './components/home/about-us/about-us.component';
import { AcademicsComponent } from './components/home/academics/academics.component';
import { DepartmentsComponent } from './components/home/departments/departments.component';
import { FacilitiesComponent } from './components/home/facilities/facilities.component';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { StaffDashboardComponent } from './components/Staff/staff-dashboard/staff-dashboard.component';
import { StaffHomeComponent } from './components/Staff/staff-home/staff-home.component';
import { StaffLeavesComponent } from './components/Staff/staff-leaves/staff-leaves.component';
import { StaffProfileComponent } from './components/Staff/staff-profile/staff-profile.component';
import { StudentDetailsComponent } from './components/Staff/student-details/student-details.component';
import { ApplyLeaveComponent } from './components/student/apply-leave/apply-leave.component';
import { DashboardComponent } from './components/student/dashboard/dashboard.component';
import { FacultyComponent } from './components/student/faculty/faculty.component';
import { MarksComponent } from './components/student/marks/marks.component';
import { ProfileComponent } from './components/student/profile/profile.component';
import { StudentHomeComponent } from './components/student/student-home/home.component';
import { StudentLeaderboardComponent } from './components/student/student-leaderboard/student-leaderboard.component';
import { HodGuard } from './guards/hod.guard';
import { StaffGuard } from './guards/staff.guard';
import { UserGuardGuard } from './guards/user-guard.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about_us',component:AboutUsComponent},
  {path:'facilities', component:FacilitiesComponent},
  {path:'departments', component:DepartmentsComponent},
  {path:'academics',component:AcademicsComponent},
  {path:'login', component:LoginComponent},
  {path:'student', component:DashboardComponent,canActivate:[UserGuardGuard],canActivateChild:[UserGuardGuard], children:[
    {path:'',component:StudentHomeComponent},
    {path:'marks',component:MarksComponent},
    {path:'apply_leave', component:ApplyLeaveComponent},
    {path:'profile',component:ProfileComponent},
    {path:'leaderboard',component:StudentLeaderboardComponent},
    {path:'faculty-info', component:FacultyComponent}
  ]},
  {path:"staff", component: StaffDashboardComponent, canActivate:[StaffGuard], canActivateChild:[StaffGuard],children:[
    {path:"", component:StaffHomeComponent},
    {path:'staff_leaves', component:StaffLeavesComponent},
    {path:"staff_profile", component: StaffProfileComponent},
    {path:"student_details",component:StudentDetailsComponent}

  ]},
  {path:'hod', component: HodDashboardComponent, canActivate:[HodGuard],canActivateChild:[HodGuard], children:[
    {path:"", component:HodHomeComponent},
    {path:"profile", component:HodProfileComponent},
    {path:"staff_leaves", component:StaffLeavesListComponent},
    {path:"student_leaves",component:StudentLeavesListComponent},
    {path:'add_marks', component:AddMarksComponent},
    {path:"register_candidate",component:RegisterCandidateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}