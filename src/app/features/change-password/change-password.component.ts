import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { ChangePassService } from '../../core/services/change-pass/change-pass.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  imports: [TranslatePipe ,RouterLink , ReactiveFormsModule] ,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  body : WritableSignal<{}> = signal({})
  private readonly toster = inject(ToastrService)
  private readonly changePassService  = inject(ChangePassService)

  // Form Group 
  changepassword = new FormGroup({
    curren_pass : new FormControl ( "" , [Validators.required]  ) , 
    new_pass : new FormControl ( "",[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/)]),
    conf_pass :  new FormControl ( "",Validators.required),
  } ,{validators:this.ckeckRepassword})
  // showPassword
  showPassword(inputelement:any){
    if (inputelement.type=="password") {
      inputelement.type="text"
    }
    else{
      inputelement.type="password"
    }

  }
  // ckeckRepassword =====================================
ckeckRepassword(control:AbstractControl){
  let new_pass = control.get("new_pass")?.value
  let conf_pass = control.get("conf_pass")?.value
  if (new_pass!==conf_pass) {
    // control.get('rePassword')?.setErrors({mismatch:true})
    return {mismatch:true}
  }
  else{
    return null
  }
}
  // madeBody
madeBody (control:AbstractControl)
{
  console.log(control.value.new_pass);
  this.body.set({
  password: control.value.curren_pass , 
  newPassword: control.value.new_pass
})
return this.body()
}
  // submitPass
  submitPass(){
    if (this.changepassword.valid) {
      this.madeBody(this.changepassword)
      this.changePassService.changPass(this.body()).subscribe({
        next:(res)=>{
          console.log(res);
          this.toster.success(res.message , `Success`)
          localStorage.removeItem('socialToken');
          window.location.reload();
        },
        error:(err)=>{
          console.log(err);
          alert("err.message")
        }
      })
    }
    else {
     this.changepassword.markAllAsTouched();
    }
    this.resetform()
  }
  // resetform
  resetform(){
    this.changepassword.reset()
  }
}
