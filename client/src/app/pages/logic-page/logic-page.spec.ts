import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicPage } from './logic-page';

describe('LogicPage', () => {
  let component: LogicPage;
  let fixture: ComponentFixture<LogicPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogicPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
