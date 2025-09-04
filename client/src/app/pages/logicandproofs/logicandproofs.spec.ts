import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicandproofsComponent } from './logicandproofs.component';

describe('Logicandproofs', () => {
  let component: LogicandproofsComponent;
  let fixture: ComponentFixture<LogicandproofsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogicandproofsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogicandproofsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
