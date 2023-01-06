import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AllConfigDataService } from './all-config-data.service';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _themes: any = {};
  private _theme = {};
  private selectedThemeName:string | any;
  private currentTheme = new ReplaySubject<any>(1);
  public currentTheme$ = this.currentTheme.asObservable();
  private currentThemeNameSubject = new ReplaySubject<any>(1);
  public currentThemeNameSubject$ = this.currentThemeNameSubject.asObservable();
  public currentThemeName: string | undefined;

  constructor(private appConfigService: AllConfigDataService) { 
    this.loadTheme()
  }

  loadTheme(){
    this.setAnimationValues();
    this._themes = this.appConfigService.getConfig('themeList');
    this.selectedThemeName = this.appConfigService.getCurrentThemeName();
    if (this.selectedThemeName in this._themes) {
      this.setTheme(this.selectedThemeName);
      this.setThemeName(this.selectedThemeName);
    } else {
      this.setTheme(Object.keys(this._themes)[0]);
      this.setThemeName('light');
    }
  }
  setThemeCSSVars() {
    const documentElement = document.documentElement;
    for (const [key, value] of Object.entries(this._theme)) {
      documentElement.style.setProperty(`--${key}`, `${value}`);
    }
  }

  setAnimationValues() {
    const documentElement = document.documentElement;
    for (const [key, value] of Object.entries(
      this.appConfigService.getAnimationTimings()
    )) {
      documentElement.style.setProperty(
        `--animation-timing-${key}`,
        `${value}ms`
      );
    }
  }

  /**
   * For setting the theme
   *
   * @param {Theme} theme
   * @memberof ThemeService
   */
  setTheme(theme: string) {
    this.currentThemeName = theme;
    this.setThemeName(theme);
    this._theme  = this._themes[theme];

    this.currentTheme.next(this._theme);
    this.setThemeCSSVars();

    //this.themeChangeEvent.next(this._theme);
    // Can have a service call here to save the theme settings to the profile
  }

  setThemeName(themeName: string) {
    this.currentThemeNameSubject.next(themeName);
  }
}
