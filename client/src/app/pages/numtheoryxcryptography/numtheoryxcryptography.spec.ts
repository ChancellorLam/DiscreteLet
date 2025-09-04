import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Numtheoryxcryptography } from './numtheoryxcryptography';

describe('Numtheoryxcryptography', () => {
  let component: Numtheoryxcryptography;
  let fixture: ComponentFixture<Numtheoryxcryptography>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Numtheoryxcryptography]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Numtheoryxcryptography);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
