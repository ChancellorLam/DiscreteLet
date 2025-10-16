import { Component, signal, effect, inject, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import katex from 'katex';
import { LogicalExpressionService } from '../../core/services/logical-expression-service';

@Component({
  selector: 'app-primeng-test-page',
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './primeng-test-page.html',
  styleUrl: './primeng-test-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimengTestPage {
  logicalExpressionService = inject(LogicalExpressionService);
  @ViewChild('output', { static: true }) output!: ElementRef;
  expression = signal<string>('\\lnot(A \\land B)');
  subExpressions = signal<string[]>([]);
  showSubExpression = signal<boolean>(false);

  // renderMathEffect = effect(() => {
  //   this.renderMath(this.expression());
  // });

  computeSubExpressions() {
    console.log(this.expression());
    console.log(this.logicalExpressionService.getSubExpressions(this.expression()));
  }

  // renderMath(input: string): void {
  //   try {
  //     katex.render(input, this.output.nativeElement, {
  //       throwOnError: false,
  //     });
  //   } catch (e) {
  //     this.output.nativeElement.textContent = 'Rendering error';
  //   }
  // }
}
