import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Numtheoryxcrypt } from './numtheoryxcrypt';

describe('Numtheoryxcrypt', () => {
  let component: Numtheoryxcrypt;
  let fixture: ComponentFixture<Numtheoryxcrypt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Numtheoryxcrypt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Numtheoryxcrypt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
