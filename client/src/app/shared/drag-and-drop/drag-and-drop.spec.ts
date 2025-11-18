import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDrop } from './drag-and-drop';

describe('DragAndDrop', () => {
  let component: DragAndDrop;
  let fixture: ComponentFixture<DragAndDrop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragAndDrop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDrop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
