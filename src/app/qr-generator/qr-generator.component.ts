import { Component} from '@angular/core';
import { QrTextComponent } from "../qr-text/qr-text.component";
import { QrUrlComponent } from "../qr-url/qr-url.component";
import { MatTabsModule } from '@angular/material/tabs';
import { QrVcardComponent } from "../qr-vcard/qr-vcard.component";


@Component({
    selector: 'app-qr-generator',
    standalone: true,
    templateUrl: './qr-generator.component.html',
    styleUrl: './qr-generator.component.css',
    imports: [
        QrTextComponent,
        QrUrlComponent,
        MatTabsModule,
        QrVcardComponent
    ]
})
export class QrGeneratorComponent {

}

