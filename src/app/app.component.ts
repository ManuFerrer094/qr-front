import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrGeneratorComponent } from "./qr-generator/qr-generator.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, QrGeneratorComponent]
})
export class AppComponent {
  title = 'qr-generator-front';
}
