import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixDragDrop } from './matrix-drag-drop';

describe('MatrixDragDrop', () => {
  let component: MatrixDragDrop;
  let fixture: ComponentFixture<MatrixDragDrop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixDragDrop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixDragDrop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
