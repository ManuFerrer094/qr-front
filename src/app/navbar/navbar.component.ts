import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService, Theme } from '../services/theme.service';
import { TranslationService, Language } from '../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentTheme: Theme = 'light';
  currentLanguage: Language = 'es';

  constructor(
    public themeService: ThemeService,
    public translationService: TranslationService
  ) {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    this.translationService.language$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.translationService.toggleLanguage();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  getThemeIcon(): string {
    return this.currentTheme === 'light' ? 'dark_mode' : 'light_mode';
  }

  getLanguageText(): string {
    return this.currentLanguage === 'es' ? 'EN' : 'ES';
  }

  openGitHub(): void {
    window.open('https://github.com/ManuFerrer094', '_blank');
  }

  openAPI(): void {
    window.open('https://qrapi-rho.vercel.app/', '_blank');
  }

  openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/manuferrer/', '_blank');
  }
}
