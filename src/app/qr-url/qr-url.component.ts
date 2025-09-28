import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-qr-url',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './qr-url.component.html',
  styleUrl: './qr-url.component.css'
})
export class QrUrlComponent {
  url: FormControl = new FormControl('', [Validators.required, Validators.pattern('(http|https|Http|Https)://.+')]);
  qrCodeImageUrl: string = '';
  isGenerating: boolean = false;

  constructor(
    private http: HttpClient,
    public translationService: TranslationService
  ) {
    this.url.valueChanges.subscribe(() => {
      if (this.url.valid && this.url.value.trim()) {
        this.generateUrlQR();
      } else {
        this.qrCodeImageUrl = '';
      }
    });
  }

  generateUrlQR(): void {
    if (this.url.invalid || !this.url.value.trim()) {
      return;
    }

    this.isGenerating = true;
    const apiUrl = 'https://qrapi-rho.vercel.app/generate/url';
    const requestBody = { url: this.url.value.trim() };

    this.http.post<any>(apiUrl, requestBody).subscribe(
      (response) => {
        this.qrCodeImageUrl = response.qr_code_url;
        this.isGenerating = false;
      },
      (error) => {
        console.error('Error generating URL QR code:', error);
        this.isGenerating = false;
      }
    );
  }

  @ViewChild('qrCodeImage')
  qrCodeImage!: ElementRef;

  downloadQR() {
    if (!this.qrCodeImageUrl) return;
    
    const qrImageElement = this.qrCodeImage.nativeElement;
    const qrImageURL = qrImageElement.src;
    const a = document.createElement('a');
    a.href = qrImageURL;
    a.download = `url-qr-code-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
