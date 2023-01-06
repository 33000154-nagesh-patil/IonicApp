import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AllConfigDataService } from 'index';
@Injectable({
  providedIn: 'root'
})
export class MultipleLanguagesService {
  languageList: any;
  selectedLanguage: any;
  currentLanguageName: string;
  private currentLanguage = new ReplaySubject<any>(1);
  public currentLanguage$ = this.currentLanguage.asObservable();
  private currentLanguageNameSubject = new ReplaySubject<any>(1);
  public currentLanguageNameSubject$ = this.currentLanguageNameSubject.asObservable();

  constructor(private appConfigService: AllConfigDataService) {
    this.loadLanguage()
   }

   loadLanguage(){
    this.languageList = this.appConfigService.getConfig('languageList');
    this.selectedLanguage = this.appConfigService.getCurrentLanguage();
    if (this.selectedLanguage in this.languageList) {
      //console.log("this.selectedThemeName",this.selectedLanguage)
      this.setLanguage(this.selectedLanguage);
      this.setLanguageName(this.selectedLanguage);
    } else {
      //console.log("else")
      this.setLanguage(Object.keys(this.languageList)[0]);
      this.setLanguageName('en');
    }
   }

   setLanguage(theme: string) {
    this.currentLanguageName = theme;
    this.setLanguageName(theme);
    this.languageList  = this.languageList[theme];

    this.currentLanguage.next(this.languageList);
  }

  setLanguageName(themeName: string) {
    this.currentLanguageNameSubject.next(themeName);
  }

  translate(str) {
    //console.log("this.languageList[str]",str)
    return this.languageList[str];
  }
}
