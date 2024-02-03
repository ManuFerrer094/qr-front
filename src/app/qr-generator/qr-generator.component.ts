import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './qr-generator.component.html',
  styleUrl: './qr-generator.component.css'
})
export class QrGeneratorComponent {
  text: string = '';
  format: string = 'png';
  errorCorrectionLevel: string = 'H';
  qrCodeImageUrl: string = '';

  constructor(private http: HttpClient) { }

  generateQRCode(): void {
    const apiUrl = 'https://qrapi-rho.vercel.app/generate';
    const requestBody = {
      text: this.text,
      format: this.format
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
