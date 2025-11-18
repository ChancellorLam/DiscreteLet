import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatexContainer } from './latex-container';

describe('LatexContainer', () => {
  let component: LatexContainer;
  let fixture: ComponentFixture<LatexContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatexContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatexContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
