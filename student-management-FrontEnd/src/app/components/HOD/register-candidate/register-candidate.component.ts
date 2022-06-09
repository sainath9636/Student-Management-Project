import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffService } from 'src/app/services/staff/staff.service';

@Component({
  selector: 'app-register-candidate',
  templateUrl: './register-candidate.component.html',
  styleUrls: ['./register-candidate.component.css']
})
export class RegisterCandidateComponent implements OnInit {
  passError:any;
  userError:any;
  emailError:any;
  mobileError:any;
  is_student:any;
  finalErrorr:any;
  registerForm = new FormGroup({
    id : new FormControl('', Validators.required),
    name : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    mobile : new FormControl('', [Validators.required, Validators.minLength(10)]),
    gender : new FormControl('', Validators.required),
    user_type : new FormControl('', Validators.required),
    parent_name : new FormControl(''),
    parent_number : new FormControl(''),
    password: new FormControl('', [Validators.minLength(3), Validators.required]),
    password2: new FormControl('', Validators.required)
  })
  constructor(private service: StaffService, ) { }

  ngOnInit(): void {
  }

  registerCandidate(){
    const data = {...this.registerForm.value,'department':"MECH"}
    if(this.emailError || this.passError || this.userError || this.mobileError || this.registerForm.invalid){

      this.finalErrorr= true
    }
    else{
      this.finalErrorr =false
      this.service.registerCandidate(data).subscribe(res=>{
        console.log(res)
        this.registerForm.reset()

      }, err=>{
        console.log(err)
      })

    }
    console.log(this.registerForm.value)
  }
  get userId(){
    return this.registerForm.get('id')
  }
  get emailId(){
    return this.registerForm.get('email')
  }
  get passWord(){
    return this.registerForm.get("password")
  }
  get userName(){
    return this.registerForm.get('name')
  }
  get mobileNo(){
    return this.registerForm.get("mobile")
  }
  get parentNo(){
    return this.registerForm.get('parent_number')
  }
  get parentName(){
    return this.registerForm.get('parent_name')
  }
  // get emailValid(){
  //   return this.registerForm.get('email')
  // }
  checkUser(value:any){
    this.service.getCandidate(value).subscribe(res=>{
      const {found}:any = res
      if(found===true){
        this.userError = true
      }
      else{
        this.userError = false
      }
      console.log(found)
    })
  }
  checkEmail(value:any){
    //console.log(value)
    this.service.getUser(value).subscribe(res=>{
      const {found}:any = res
      if(found===true){
        this.emailError = true
      }
      else{
        this.emailError = false
      }
      console.log(found)
    })
  }
  checkMobile(value:any){
    this.service.getCandidate(value).subscribe(res=>{
      const {found}:any = res
      if(found===true){
        this.mobileError = true
      }
      else{
        this.mobileError = false
      }
      console.log(found)
    })
  }
  checkPass(pass1:any,pass2:any){
    if(pass1!==pass2){
      this.passError=true
    }
    else{
      this.passError=false
    }
  }
  checkUserType(value:any){
    console.log("User Type", value)
    if(value==="STUDENT"){
      this.is_student = true
    }
    else{
      this.is_student = false
    }
  }

}
