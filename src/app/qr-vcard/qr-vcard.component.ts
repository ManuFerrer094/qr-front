import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qr-vcard',
  standalone: true,
  imports: [RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule],
  templateUrl: './qr-vcard.component.html',
  styleUrl: './qr-vcard.component.css'
})
export class QrVcardComponent {
  vcardData = {
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required])
  };
  qrCodeImageText: string = '';

  constructor(private http: HttpClient) {}

  generateVCardQR(): void {
    if (!this.isValidVCardData()) {
      console.error('Los datos de vCard no son válidos.');
      return;
    }

    const apiUrl = 'https://qrapi-rho.vercel.app/generate/vcard';
    const requestBody = {
      name: this.vcardData.name.value,
      phoneNumber: this.vcardData.phoneNumber.value,
      email: this.vcardData.email.value,
      address: this.vcardData.address.value
    };

    this.http.post<any>(apiUrl, requestBody).subscribe(
      (response) => {
        this.qrCodeImageText = response.qr_code_url;
      },
      (error) => {
        console.error('Error generando código QR de vCard:', error);
      }
    );
  }

  isValidVCardData(): boolean {
    const { name, phoneNumber, email, address } = this.vcardData;
    return name.valid && phoneNumber.valid && email.valid && address.valid;
  }

  @ViewChild('qrCodeImage') qrCodeImage!: ElementRef;

  downloadQR() {
    const qrImageElement = this.qrCodeImage.nativeElement;
    const qrImageURL = qrImageElement.src;
    const a = document.createElement('a');
    a.href = qrImageURL;
    a.download = 'codigo_qr_vcard.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
