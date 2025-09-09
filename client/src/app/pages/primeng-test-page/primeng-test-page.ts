import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-primeng-test-page',
  imports: [ButtonModule],
  templateUrl: './primeng-test-page.html',
  styleUrl: './primeng-test-page.css'
})
export class PrimengTestPage {
  counter = signal(0);

  incrementCounter(): void {
    this.counter.set(this.counter() + 1);
  }
}
