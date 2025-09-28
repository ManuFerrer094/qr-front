import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Language = 'es' | 'en';

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage$ = new BehaviorSubject<Language>('es');
  public language$ = this.currentLanguage$.asObservable();

  private translations: Translations = {
    // App General
    'app.title': { es: 'Generador QR', en: 'QR Generator' },
    'app.subtitle': { es: 'Generador de Código QR', en: 'QR Code Generator' },
    
    // Navigation
    'nav.github': { es: 'GitHub', en: 'GitHub' },
    'nav.api': { es: 'API', en: 'API' },
    'nav.linkedin': { es: 'LinkedIn', en: 'LinkedIn' },
    'nav.theme.light': { es: 'Tema Claro', en: 'Light Theme' },
    'nav.theme.dark': { es: 'Tema Oscuro', en: 'Dark Theme' },
    'nav.language': { es: 'Idioma', en: 'Language' },
    
    // Tabs
    'tabs.text': { es: 'Texto QR', en: 'Text QR' },
    'tabs.url': { es: 'URL QR', en: 'URL QR' },
    'tabs.vcard': { es: 'Vcard QR', en: 'Vcard QR' },
    
    // Text QR
    'text.title': { es: 'Escribe tu texto aquí', en: 'Write your text here' },
    'text.label': { es: 'Texto:', en: 'Text:' },
    'text.placeholder': { es: 'Ingrese el texto', en: 'Enter the text' },
    'text.error': { es: 'Ingrese un texto válido.', en: 'Please enter valid text.' },
    
    // URL QR
    'url.title': { es: 'Introduce la URL', en: 'Enter the URL' },
    'url.label': { es: 'URL:', en: 'URL:' },
    'url.placeholder': { es: 'https://ejemplo.com', en: 'https://example.com' },
    'url.error': { es: 'Ingrese una URL válida.', en: 'Please enter a valid URL.' },
    
    // Vcard QR
    'vcard.title': { es: 'Información de Contacto', en: 'Contact Information' },
    'vcard.name': { es: 'Nombre:', en: 'Name:' },
    'vcard.phone': { es: 'Teléfono:', en: 'Phone:' },
    'vcard.email': { es: 'Email:', en: 'Email:' },
    'vcard.organization': { es: 'Organización:', en: 'Organization:' },
    
    // QR Display
    'qr.generated': { es: 'Código QR Generado:', en: 'Generated QR Code:' },
    'qr.default': { es: 'Código QR', en: 'QR Code' },
    'qr.download': { es: 'Descargar QR', en: 'Download QR' },
    
    // Languages
    'language.spanish': { es: 'Español', en: 'Spanish' },
    'language.english': { es: 'Inglés', en: 'English' }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Load language from localStorage or default to Spanish
      const savedLanguage = localStorage.getItem('language') as Language;
      const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';
      
      this.setLanguage(savedLanguage || browserLang);
    }
  }

  setLanguage(language: Language): void {
    this.currentLanguage$.next(language);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', language);
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage$.value;
  }

  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[this.getCurrentLanguage()];
  }

  toggleLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    this.setLanguage(currentLang === 'es' ? 'en' : 'es');
  }
}
