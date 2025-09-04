import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logicandproofs } from './logicandproofs';

describe('Logicandproofs', () => {
  let component: Logicandproofs;
  let fixture: ComponentFixture<Logicandproofs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logicandproofs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logicandproofs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
