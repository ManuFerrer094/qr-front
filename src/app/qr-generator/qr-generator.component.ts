import { Component} from '@angular/core';
import { QrTextComponent } from "../qr-text/qr-text.component";
import { QrUrlComponent } from "../qr-url/qr-url.component";
import { MatTabsModule } from '@angular/material/tabs';


@Component({
    selector: 'app-qr-generator',
    standalone: true,
    templateUrl: './qr-generator.component.html',
    styleUrl: './qr-generator.component.css',
    imports: [
        QrTextComponent,
        QrUrlComponent,
        MatTabsModule
    ]
})
export class QrGeneratorComponent {

}

