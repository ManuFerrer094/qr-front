import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrVcardComponent } from './qr-vcard.component';

describe('QrVcardComponent', () => {
  let component: QrVcardComponent;
  let fixture: ComponentFixture<QrVcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrVcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrVcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
