import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsPage } from './relations-page';

describe('RelationsPage', () => {
  let component: RelationsPage;
  let fixture: ComponentFixture<RelationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelationsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
