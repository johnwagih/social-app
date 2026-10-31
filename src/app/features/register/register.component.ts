import { Component, inject } from '@angular/core';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { AsideLoginRegisterComponent } from '../../layouts/auth-layout/components/aside-login-register/aside-login-register.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { AuthService } from '../../core/auth/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  imports: [ RouterLink, AsideLoginRegisterComponent , ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly toster = inject(ToastrService)
  today = new Date() ;
  year = this.today.getFullYear()
  month = (this.today.getMonth()) + 1
  day = this.today.getDate() 
  formatedmonth = String(this.month).padStart(2,"0")
  formatedday = String(this.day).padStart(2,"0")
  maxDate = `${this.year+"-"+this.formatedmonth+"-"+this.formatedday}`
// Injects ===========================================
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
//  validateDateOfBirth ==============================
  validateDateOfBirth=(control:AbstractControl)=>{
   const value = control.value
   if ((value>="1900-01-01" && value<=this.maxDate)||(!value)) {
    return null
   }
   else{
return { invalidDateOfBirth: true };
   }
  }
  // registerform =====================================
  registerform = new FormGroup({
    name : new FormControl ( "",[ Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
    username : new FormControl ( "",[Validators.maxLength(20),Validators.minLength(3)]),
    email : new FormControl ( "",[Validators.email, Validators.required]),
    dateOfBirth : new FormControl ( "" ,[Validators.required ,this.validateDateOfBirth]),
    gender : new FormControl ( "",[Validators.required] ),
    password : new FormControl ( "",[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/)]),
    rePassword : new FormControl ( "",Validators.required),
  },{validators:this.ckeckRepassword})
  onSubmit(){
    if (this.registerform.valid) {
      console.log(this.registerform.value);
      this.authService.register(this.registerform.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.toster.success(res.message , `Success`)
          this.router.navigate( ['/login'] )
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    else{
      this.registerform.markAllAsTouched()
      return
    }
  }
// ckeckRepassword =====================================
ckeckRepassword(control:AbstractControl){
  let password = control.get("password")?.value
  let rePassword = control.get("rePassword")?.value
  if (password!==rePassword) {
    // control.get('rePassword')?.setErrors({mismatch:true})
    return {mismatch:true}
  }
  else{
    return null
  }
}
//  showPassword
  showPassword(inputelement:any){
    if (inputelement.type=="password") {
      inputelement.type="text"
    }
    else{
      inputelement.type="password"
    }

  }
  
}
