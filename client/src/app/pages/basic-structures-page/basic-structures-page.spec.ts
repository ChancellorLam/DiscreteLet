import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicStructuresPage } from './basic-structures-page';

describe('BasicStructuresPage', () => {
  let component: BasicStructuresPage;
  let fixture: ComponentFixture<BasicStructuresPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicStructuresPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicStructuresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
