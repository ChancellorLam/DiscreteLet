import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTheoryPage } from './graph-theory-page';

describe('GraphTheoryPage', () => {
  let component: GraphTheoryPage;
  let fixture: ComponentFixture<GraphTheoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphTheoryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphTheoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
