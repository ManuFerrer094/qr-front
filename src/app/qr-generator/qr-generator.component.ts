import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrTextComponent } from "../qr-text/qr-text.component";
import { QrUrlComponent } from "../qr-url/qr-url.component";
import { MatTabsModule } from '@angular/material/tabs';
import { QrVcardComponent } from "../qr-vcard/qr-vcard.component";
import { TranslationService } from '../services/translation.service';

@Component({
    selector: 'app-qr-generator',
    standalone: true,
    templateUrl: './qr-generator.component.html',
    styleUrl: './qr-generator.component.css',
    imports: [
        CommonModule,
        QrTextComponent,
        QrUrlComponent,
        MatTabsModule,
        QrVcardComponent
    ]
})
export class QrGeneratorComponent {
    constructor(public translationService: TranslationService) {}

    translate(key: string): string {
        return this.translationService.translate(key);
    }
}

