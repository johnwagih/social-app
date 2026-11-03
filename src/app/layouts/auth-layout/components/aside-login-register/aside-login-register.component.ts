import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-aside-login-register',
  imports: [ TranslatePipe ],
  templateUrl: './aside-login-register.component.html',
  styleUrl: './aside-login-register.component.css',
})
export class AsideLoginRegisterComponent {}
