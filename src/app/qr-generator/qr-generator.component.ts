import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-qr-generator',
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
  templateUrl: './qr-generator.component.html',
  styleUrl: './qr-generator.component.css'
})
export class QrGeneratorComponent {
  text: FormControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  format: string = 'png';
  errorCorrectionLevel: string = 'H';
  qrCodeImageUrl: string = '';
  qrCodeImageText: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  title: string = '';
  url: FormControl = new FormControl('', [Validators.required, Validators.pattern('(http|https)://.+')]);
  isVCardSelected: boolean = false;

  constructor(private http: HttpClient) { }

  isTextValid: boolean = true;

  generateQR(): void {
    if (this.text.invalid) {
      console.error('El texto no es válido.');
      return;
    }

    const apiUrl = 'http://localhost:3000/generate';
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

  generateUrlQR() : void {
    const apiUrl = 'http://localhost:3000/generate/url';

    if (this.url.invalid) {
      this.url.markAsTouched();
      return;
    }

    const requestBody = {
      url: this.url.value
    };

    this.http.post<any>(apiUrl, requestBody).subscribe(
      (response) => {
        this.qrCodeImageUrl = response.qr_code_url;
      },
      (error) => {
        console.error('Error generating QR code:', error);
      }
    );
  }
}

