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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'primeng-test-page' }
})
export class PrimengTestPage {
  logicalExpressionService = inject(LogicalExpressionService);

  @ViewChild('output', { static: true })
  outputRef!: ElementRef<HTMLElement>;

  expression = signal<string>('');
  subExpressions = signal<string[]>([]);
  showSubExpression = signal<boolean>(false);

  mathRenderEffect = effect(() => {
    this.renderMath();
  });

  computeSubExpressions() {
    this.subExpressions.set(this.logicalExpressionService.getSubExpressions(this.expression()));
    this.showSubExpression.set(true);
    console.log(this.subExpressions());
  }

  renderMath(): void {
    const el = this.outputRef.nativeElement;
    katex.render(this.expression(), el, { throwOnError: false });
  }

  renderMathToString(expr: string): string {
    return katex.renderToString(expr, { throwOnError: false });
  }
}
