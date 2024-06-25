import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
    currentLang = 'en';
    languages = ['en', 'es'];

    constructor(private translate: TranslateService) {
      this.currentLang = translate.currentLang;
    }

    useLanguage(language: string): void {
      this.translate.use(language);
    }

}
