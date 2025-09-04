import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graphtheory } from './graphtheory';

describe('Graphtheory', () => {
  let component: Graphtheory;
  let fixture: ComponentFixture<Graphtheory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graphtheory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Graphtheory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
