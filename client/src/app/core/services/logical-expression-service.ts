import { Injectable } from '@angular/core';

type Associativity = 'Left' | 'Right';

interface OperatorInfo {
  precedence: number;
  associativity: Associativity;
  numOperands: 1 | 2;
}

@Injectable({
  providedIn: 'root'
})
export class LogicalExpressionService {
  private readonly operators: Record<string, OperatorInfo> = {
    '\\neg': { precedence: 5, associativity: 'Right', numOperands: 1 },
    '\\land': { precedence: 4, associativity: 'Left', numOperands: 2 },
    '\\lor': { precedence: 3, associativity: 'Left', numOperands: 2 },
    '\\rightarrow': { precedence: 2, associativity: 'Right', numOperands: 2 },
    '\\leftrightarrow': { precedence: 1, associativity: 'Left', numOperands: 2 },
  };

  private readonly openers = new Set(['(', '[', '{']);
  private readonly closers: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  getSubExpressions(expr: string): string[] {
    const tokens = this.tokenize(expr);
    const stack: string[] = [];
    const subExpressions: string[] = [];

    for (const token of tokens) {
      if (this.isVariable(token)) {
        this.handleVariable(token, stack, subExpressions);
      } else if (this.openers.has(token)) {
        this.handleOpeningBracket(token, stack);
      } else if (token in this.closers) {
        this.handleClosingBracket(token, stack, subExpressions);
      } else if (this.isOperator(token)) {
        this.handleOperator(token, stack, subExpressions);
      } else {
        throw new Error(`Unexpected token: ${token}`);
      }
    }

    return subExpressions;
  }

  tokenize(expr: string): string[] {
    const spaced = expr
      .replace(/([\(\)])/g, ' $1 ')
      .replace(/(\\neg|\\land|\\lor|\\rightarrow|\\leftrightarrow)/g, ' $1 ')
      .replace(/\s+/g, ' ')
      .trim();

    return spaced.split(' ').filter(Boolean);
  }

  private handleVariable(token: string, stack: string[], subExpressions: string[]): void {
    stack.push(token);
    subExpressions.push(token);
  }

  private handleOpeningBracket(token: string, stack: string[]): void {
    stack.push(token);
  }

  private handleClosingBracket(token: string, stack: string[], subExpressions: string[]): void {
    const expectedOpener = this.closers[token];
    const temp: string[] = [];

    while (stack.length && stack.at(-1) !== expectedOpener) {
      temp.unshift(stack.pop()!);
    }

    if (!stack.length || stack.at(-1) !== expectedOpener) {
      throw new Error(`Mismatched closing bracket: expected ${expectedOpener}, got ${token}`);
    }

    stack.pop(); // Remove the matching opener

    const combined = `${expectedOpener}${temp.join(' ')}${token}`;
    stack.push(combined);
    subExpressions.push(combined);
  }

  private handleOperator(token: string, stack: string[], subExpressions: string[]): void {
    const numOperands = this.operators[token].numOperands;

    if (numOperands === 1) {
      const a = stack.pop();
      if (!a) throw new Error('Invalid expression for unary operator');

      const combined = `${token}${a}`;
      stack.push(combined);
      subExpressions.push(combined);

    } else if (numOperands === 2) {
      const b = stack.pop();
      const a = stack.pop();
      if (!a || !b) throw new Error('Invalid expression for binary operator');

      const combined = `(${a} ${token} ${b})`; // still using round brackets for operators
      stack.push(combined);
      subExpressions.push(combined);
    }
  }


  private isOperator(t: string): boolean {
    return Object.hasOwn(this.operators, t);
  }

  private isVariable(t: string): boolean {
    return /^[A-Za-z]+$/.test(t);
  }
}
