import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-qr-text',
  standalone: true,
  imports: [
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
  text: FormControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]);
  format: string = 'png';
  errorCorrectionLevel: string = 'H';
  qrCodeImageUrl: string = '';
  qrCodeImageText: string = '';
  url: FormControl = new FormControl('', [Validators.required, Validators.pattern('(http|https|Http|Https)://.+')]);

  constructor(private http: HttpClient) {
    this.text.valueChanges.subscribe(() => {
      this.generateQR();
    });
  }

  generateQR(): void {
    if (this.text.invalid) {
      console.error('El texto no es válido.');
      return;
    }

    const apiUrl = 'https://qrapi-rho.vercel.app/generate';
    const requestBody = {
      text: this.text.value,
      format: this.format
    };

    this.http.post<any>(apiUrl, requestBody).subscribe(
      (response) => {
        this.qrCodeImageText = response.qr_code_url;
      },
      (error) => {
        console.error('Error generating QR code:', error);
      }
    );
  }

  @ViewChild('qrCodeImage')
  qrCodeImage!: ElementRef;

  downloadQR() {
    const qrImageElement = this.qrCodeImage.nativeElement;
    const qrImageURL = qrImageElement.src;
    const a = document.createElement('a');
    a.href = qrImageURL;
    a.download = 'codigo_qr.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
