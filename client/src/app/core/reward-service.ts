import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RewardService {
  private _count = new BehaviorSubject<number>(0);
  count$ = this._count.asObservable();

  add(n: number) {
    this._count.next(this._count.getValue() + n);
  }

  reset() {
    this._count.next(0);
  }

  get value(): number {
    return this._count.getValue();
  }
}