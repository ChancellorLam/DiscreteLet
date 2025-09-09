import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTheoryPage } from './number-theory-page';

describe('NumberTheoryPage', () => {
  let component: NumberTheoryPage;
  let fixture: ComponentFixture<NumberTheoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberTheoryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberTheoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
