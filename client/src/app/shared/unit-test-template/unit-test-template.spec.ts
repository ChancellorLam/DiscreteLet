import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTestTemplate } from './unit-test-template';

describe('UnitTestTemplate', () => {
  let component: UnitTestTemplate;
  let fixture: ComponentFixture<UnitTestTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitTestTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitTestTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
