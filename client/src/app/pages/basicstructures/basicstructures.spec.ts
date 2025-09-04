import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basicstructures } from './basicstructures';

describe('Basicstructures', () => {
  let component: Basicstructures;
  let fixture: ComponentFixture<Basicstructures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basicstructures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Basicstructures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
