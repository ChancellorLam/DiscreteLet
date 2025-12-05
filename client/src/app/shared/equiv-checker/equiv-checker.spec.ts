import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquivChecker } from './equiv-checker';

describe('EquivChecker', () => {
  let component: EquivChecker;
  let fixture: ComponentFixture<EquivChecker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquivChecker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquivChecker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});