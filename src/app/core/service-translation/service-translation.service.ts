import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceTranslationService {
private readonly Translate  = inject(TranslateService)
  changeDirection():void{
    if (localStorage.getItem("lang")) {
      if (localStorage.getItem("lang")=="ar"){
        document.documentElement.dir="rtl"
        document.documentElement.lang="ar"
      }
    else if (localStorage.getItem("lang")=="en"){
      document.documentElement.dir="ltr"
      document.documentElement.lang="en"
    }
  }
  }
  changeLang(lang:string):void{
    //     1. save to local storage
    localStorage.setItem('lang' , lang)
    //     2. use language
    this.Translate.use(lang)
    //     3. change direction
    this.changeDirection()
  }
}
