import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrTextComponent } from './qr-text.component';

describe('QrTextComponent', () => {
  let component: QrTextComponent;
  let fixture: ComponentFixture<QrTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
