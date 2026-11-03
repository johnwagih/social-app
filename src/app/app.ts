import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceTranslationService } from './core/service-translation/service-translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('social-app');
  private readonly translate = inject(TranslateService)
  private readonly myTranslation = inject(ServiceTranslationService)
  constructor(){
//1
this.translate.addLangs(['ar','en'])

if( localStorage.getItem('lang')){
// 2
this.translate.use( localStorage.getItem('lang')!)

// 3 call the changeDirection method from mytranslate service

this.myTranslation.changeDirection()
}
}
}
