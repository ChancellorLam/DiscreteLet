import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Counting } from './counting';

describe('Counting', () => {
  let component: Counting;
  let fixture: ComponentFixture<Counting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Counting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
