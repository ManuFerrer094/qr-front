import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme$ = new BehaviorSubject<Theme>('light');
  public theme$ = this.currentTheme$.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Load theme from localStorage or default to light
      const savedTheme = localStorage.getItem('theme') as Theme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      this.setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    }
  }

  setTheme(theme: Theme): void {
    this.currentTheme$.next(theme);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', theme);
      document.body.className = theme + '-theme';
    }
  }

  toggleTheme(): void {
    const currentTheme = this.currentTheme$.value;
    this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  getCurrentTheme(): Theme {
    return this.currentTheme$.value;
  }
}
