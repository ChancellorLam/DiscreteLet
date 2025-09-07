import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  styleUrl: './app.css',
  template: `
    <h1>Welcome to DiscreteLet!</h1>
    <nav>
      <a routerLink="/logicandproofs">Logic and Proofs</a>
      <a routerLink="/numtheoryxcrypt">Number Theory and Cryptography</a>
      <a routerLink="/graphtheory">Graph Theory</a>
      <a routerLink="/counting">Counting</a>
      <a routerLink="/basicstructures">Basic Structures</a>
      <a routerLink="/relations">Relations</a>
    </nav>
    <router-outlet></router-outlet>
  `,

})
export class App {
  protected readonly title = signal('DiscreteLet');
   private activatedRoute = inject(ActivatedRoute);

constructor() {
    console.log(this.activatedRoute);
  }


  }



