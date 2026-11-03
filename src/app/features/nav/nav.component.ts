import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../../core/models/iuser.interface';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/auth/services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ServiceTranslationService } from '../../core/service-translation/service-translation.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [ NgClass , TranslatePipe,RouterLink ,RouterLinkActive ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  private readonly mytranslate = inject(ServiceTranslationService)
    private readonly router = inject(Router)
    private readonly toster = inject(ToastrService)
    private readonly authService = inject(AuthService)
  userData:WritableSignal<IUser> =signal({}as IUser)
  ngOnInit(): void {
  this.userData.set(JSON.parse(localStorage.getItem("socialUser")!))
  }
  logout() {
  localStorage.removeItem('socialToken');
  localStorage.removeItem('socialUser');
  this.toster.success('Logged out successfully', 'Success');
  this.router.navigate(['/login']);
}
selectedLanguage = localStorage.getItem('lang') || 'en';
changeLanguage(lang: string) {
  this.mytranslate.changeLang(lang);
  this.selectedLanguage = lang;
}
}
