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
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  title: string = '';
  url: string = '';
  isVCardSelected: boolean = false;

  constructor(private http: HttpClient) { }

  generateQR(): void {
    const apiUrl = 'http://localhost:3000/generate';
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

  generateVCardQR(): void {
    const apiUrl = 'http://localhost:3000/generate/vcard';
    const requestBody = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      title: this.title,
      url: this.url
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

