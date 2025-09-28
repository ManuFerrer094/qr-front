import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-qr-text',
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
  templateUrl: './qr-text.component.html',
  styleUrl: './qr-text.component.css'
})
export class QrTextComponent {
  text: FormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  format: string = 'png';
  errorCorrectionLevel: string = 'H';
  qrCodeImageUrl: string = '';
  qrCodeImageText: string = '';
  isGenerating: boolean = false;
  url: FormControl = new FormControl('', [Validators.required, Validators.pattern('(http|https|Http|Https)://.+')]);

  constructor(
    private http: HttpClient,
    public translationService: TranslationService
  ) {
    this.text.valueChanges.subscribe(() => {
      if (this.text.valid && this.text.value.trim()) {
        this.generateQR();
      } else {
        this.qrCodeImageText = '';
      }
    });
  }

  generateQR(): void {
    if (this.text.invalid || !this.text.value.trim()) {
      return;
    }

    this.isGenerating = true;
    const apiUrl = 'https://qrapi-rho.vercel.app/generate';
    const requestBody = {
      text: this.text.value.trim(),
      format: this.format
    };

    this.http.post<any>(apiUrl, requestBody).subscribe(
      (response) => {
        this.qrCodeImageText = response.qr_code_url;
        this.isGenerating = false;
      },
      (error) => {
        console.error('Error generating QR code:', error);
        this.isGenerating = false;
      }
    );
  }

  @ViewChild('qrCodeImage')
  qrCodeImage!: ElementRef;

  downloadQR() {
    if (!this.qrCodeImageText) return;
    
    const qrImageElement = this.qrCodeImage.nativeElement;
    const qrImageURL = qrImageElement.src;
    const a = document.createElement('a');
    a.href = qrImageURL;
    a.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
