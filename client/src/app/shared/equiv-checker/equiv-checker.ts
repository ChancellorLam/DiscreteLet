import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Pair = [string, string];

@Component({
  selector: 'app-equiv-checker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equiv-checker.html',
  styleUrls: ['./equiv-checker.css']
})
export class EquivChecker {

  setInput = '1, 2, 3, 4, 5, 6';
  relationInput = '(1,4), (4,1), (2,5), (5,2), (3,6), (6,3)';

  A: string[] = [];
  R: Pair[] = [];

  reflexive = false;
  symmetric = false;
  transitive = false;

  missingReflexive: Pair[] = [];
  missingSymmetric: Pair[] = [];
  missingTransitive: Pair[] = [];

  equivalenceClasses: Record<string, string[]> = {};

  updateAll() {
    this.parseSet();
    this.parseRelation();
    this.checkReflexive();
    this.checkSymmetric();
    this.checkTransitive();
    this.buildEquivalenceClasses();
  }

  parseSet() {
    this.A = this.setInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  parseRelation() {
    const regex = /\(([^,]+),([^()]+)\)/g;
    let match;
    this.R = [];

    while ((match = regex.exec(this.relationInput)) !== null) {
      const a = match[1].trim();
      const b = match[2].trim();
      this.R.push([a, b]);
    }
  }

  checkReflexive() {
    this.missingReflexive = [];

    for (const a of this.A) {
      if (!this.hasPair(a, a)) {
        this.missingReflexive.push([a, a]);
      }
    }

    this.reflexive = this.missingReflexive.length === 0;
  }

  checkSymmetric() {
    this.missingSymmetric = [];

    for (const [a, b] of this.R) {
      if (!this.hasPair(b, a)) {
        this.missingSymmetric.push([b, a]);
      }
    }

    this.symmetric = this.missingSymmetric.length === 0;
  }

  checkTransitive() {
    this.missingTransitive = [];

    for (const [a, b] of this.R) {
      const relatedToB = this.R.filter(p => p[0] === b).map(p => p[1]);

      for (const c of relatedToB) {
        if (!this.hasPair(a, c)) {
          this.missingTransitive.push([a, c]);
        }
      }
    }

    this.transitive = this.missingTransitive.length === 0;
  }

  hasPair(x: string, y: string): boolean {
    return this.R.some(([a, b]) => a === x && b === y);
  }

  buildEquivalenceClasses() {
    this.equivalenceClasses = {};

    for (const a of this.A) {
      this.equivalenceClasses[a] = this.A.filter(b =>
        this.hasPair(a, b)
      );
    }
  }

  get isEquivalenceRelation(): boolean {
    return this.reflexive && this.symmetric && this.transitive;
  }
}
