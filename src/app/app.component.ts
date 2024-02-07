import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrGeneratorComponent } from "./qr-generator/qr-generator.component";
import { QrTextComponent } from './qr-text/qr-text.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, QrGeneratorComponent, QrTextComponent]
})
export class AppComponent {
  title = 'qr-generator-front';
}
