import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengTestPage } from './primeng-test-page';

describe('PrimengTestPage', () => {
  let component: PrimengTestPage;
  let fixture: ComponentFixture<PrimengTestPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimengTestPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimengTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
