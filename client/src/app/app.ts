import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppMenubar } from './core/components/menubar/menubar';
import { AccordionModule } from 'primeng/accordion';
import { Footer } from './core/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppMenubar, AccordionModule, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']

})
export class App {
  protected readonly title = signal('DiscreteLet');
   private activatedRoute = inject(ActivatedRoute);


  }



