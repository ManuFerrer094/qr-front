import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { QrGeneratorComponent } from "./qr-generator/qr-generator.component";
import { QrTextComponent } from './qr-text/qr-text.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ThemeService } from './services/theme.service';
import { TranslationService } from './services/translation.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet, 
        QrGeneratorComponent, 
        QrTextComponent, 
        NavbarComponent
    ]
})
export class AppComponent implements OnInit {
  title = 'qr-generator-front';

  constructor(
    private themeService: ThemeService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    // Initialize theme and translation services
    this.themeService.setTheme(this.themeService.getCurrentTheme());
    this.translationService.setLanguage(this.translationService.getCurrentLanguage());
  }
}
