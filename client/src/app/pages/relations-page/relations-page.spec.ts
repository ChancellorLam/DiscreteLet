import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsPage } from './relations-page';

describe('RelationsPage', () => {
  let component: RelationsPage;
  let fixture: ComponentFixture<RelationsPage>;

  beforeEach(async () => {
    // Configure testing module for RelationsPage component
    await TestBed.configureTestingModule({
      imports: [RelationsPage]    // Import standalone component
    })
    .compileComponents();   // Compile component and template

    // Create component instance and fixture for testing
    fixture = TestBed.createComponent(RelationsPage);
    component = fixture.componentInstance;
    // Trigger initial data binding and lifecycle hooks
    fixture.detectChanges();
  });

  // Basic test to ensure the component initializes correctly
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
