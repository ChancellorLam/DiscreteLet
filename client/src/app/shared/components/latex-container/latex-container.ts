import { Component, effect, input, ViewChild, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import katex from 'katex';

@Component({
  selector: 'app-latex-container',
  imports: [],
  templateUrl: './latex-container.html',
  styleUrl: './latex-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatexContainer {
  // component inputs
  latex = input<string>('');
  inline = input<boolean>(true);

  @ViewChild('mathDisplay', {static: true})
  mathDisplayRef!: ElementRef<HTMLElement>;

  mathRenderEffect = effect(() => {
    this.renderMath();
  });

  renderMath(): void {
    katex.render(this.latex(), this.mathDisplayRef.nativeElement, {
      throwOnError: false,
      displayMode: !this.inline()
    });
  }
}
