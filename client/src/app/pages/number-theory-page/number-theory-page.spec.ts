import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTheoryPage } from './number-theory-page';

describe('NumberTheoryPage', () => {
  let component: NumberTheoryPage;    // Holds the component instance
  let fixture: ComponentFixture<NumberTheoryPage>;    // Manages the component's testing environment

  // Runs before each test case
  beforeEach(async () => {
    // Configures the testing module and declares the component for testing
    await TestBed.configureTestingModule({
      imports: [NumberTheoryPage]   // Importing the standalone component
    })
    .compileComponents();   // Compiles the component’s HTML, CSS, and TypeScript

    // Creates the component test fixture and initializes it
    fixture = TestBed.createComponent(NumberTheoryPage);
    component = fixture.componentInstance;    // Access the actual component instance
    fixture.detectChanges();    // Trigger initial data binding and lifecycle hooks
  });

  // Basic sanity test to ensure the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();   // Expect the component to exist
  });
});
