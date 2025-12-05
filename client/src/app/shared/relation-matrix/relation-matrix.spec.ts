import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationMatrix } from './relation-matrix';

describe('RelationMatrix', () => {
  let component: RelationMatrix;
  let fixture: ComponentFixture<RelationMatrix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelationMatrix]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationMatrix);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});