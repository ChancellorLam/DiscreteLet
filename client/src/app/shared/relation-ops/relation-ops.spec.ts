import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationOps } from './relation-ops';

describe('RelationOps', () => {
  let component: RelationOps;
  let fixture: ComponentFixture<RelationOps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelationOps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationOps);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});