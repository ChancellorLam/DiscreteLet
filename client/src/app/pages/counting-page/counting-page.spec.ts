import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountingPage } from './counting-page';

describe('CountingPage', () => {
  let component: CountingPage;
  let fixture: ComponentFixture<CountingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
