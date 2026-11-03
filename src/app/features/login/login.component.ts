import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsideLoginRegisterComponent } from '../../layouts/auth-layout/components/aside-login-register/aside-login-register.component';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';
import { AuthService } from '../../core/auth/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceTranslationService } from '../../core/service-translation/service-translation.service';
import { NgClass } from '@angular/common';
import { translate, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ TranslatePipe ,   RouterLink, AsideLoginRegisterComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly toster = inject(ToastrService)
  private readonly mytranslate = inject(ServiceTranslationService)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  // loginForm
  loginForm = new FormGroup({
    email:new FormControl ("" ,[Validators.required,Validators.email] ),
    password:new FormControl ("" ,[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/)]),
  })
  // onSubmit
  onSubmit(){
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.toster.success(res.message , `Success`)
          this.router.navigate(['/feed'])
          localStorage.setItem("socialToken",res.data.token)
          localStorage.setItem("socialUser",JSON.stringify(res.data.user))
        },
        error:(err)=>{
          console.log(err);
        }
      
      })
    }
    else{
      this.loginForm.markAllAsTouched()
      return 
    }
  }
  // showPassword
  showPassword(inputelement:any){
    if (inputelement.type=="password") {
      inputelement.type="text"
    }
    else{
      inputelement.type="password"
    }

  }
  //changeLanguage
  selectedLanguage = localStorage.getItem('lang') || 'en';
  changeLanguage(lang: string) {
    this.mytranslate.changeLang(lang);
      this.selectedLanguage = lang;
  }
}
