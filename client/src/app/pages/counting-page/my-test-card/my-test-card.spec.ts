import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestCard } from './my-test-card';

describe('MyTestCard', () => {
  let component: MyTestCard;
  let fixture: ComponentFixture<MyTestCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTestCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTestCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
