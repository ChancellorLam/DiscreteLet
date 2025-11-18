import { Injectable } from '@angular/core';

/*
  - When the logical expression is parsed and split up (tokenized), the tokens need to be classified so that the parser
    knows what to do with them.

  - Since this type will really only be used in this service, it's probably best to define it right outside the service.

  - Classifies tokens into:
      - a variable that can be true or false
      - a unary operator (like NOT)
      - a binary operator (like AND, OR)
*/
type Node =
  | { type: "var", name: string }
  | { type: "unary", op: string, expr: Node }
  | { type: "binary", op: string, left: Node, right: Node };

@Injectable({
  providedIn: 'root'
})
export class LogicalExpressionService {

  // logical operators are defined as LaTeX commands for the corresponding logical operators
  private readonly operators: Record<string, { prec: number; assoc: "L" | "R"; n: 1 | 2 }> = {
    "\\neg": {  // NOT (highest precedence, right-associative, unary operator)
      prec: 5,
      assoc: "R",
      n: 1 },

    "\\land": {  // AND (left-associative, binary operator)
      prec: 4,
      assoc: "L",
      n: 2
    },

    "\\lor": {  // OR (left-associative, binary operator)
      prec: 3,
      assoc: "L",
      n: 2
    },

    "\\rightarrow": {  // IMPLICATION (right-associative, binary operator)
      prec: 2,
      assoc: "R",
      n: 2
    },
    "\\to": {  // IMPLICATION (alternate syntax)
      prec: 2,
      assoc: "R",
      n: 2
    },

    "\\leftrightarrow": {  // BICONDITIONAL/IF AND ONLY IF (left-associative, binary operator)
      prec: 1,
      assoc: "L",
      n: 2
    },
  };

  public getSubExpressions(expr: string): string[] {
    // break up given expression into tokens
    const tokens = this.tokenize(expr);

    // parse tokens into Abstract Syntax Tree
    const ast = this.parseToAST(tokens);

    // get list of subexpressions that the expression is composed of
    const subs: string[] = [];
    this.collect(ast, subs);

    return subs;
  }

  private tokenize(expr: string): string[] {
    return expr
      // Normalize spacing to ensure no extra whitespace
      .replace(/([()])/g, ' $1 ')
      .replace(/(\\neg|¬|\\land|∧|\\lor|∨|\\rightarrow|→|\\leftrightarrow|↔)/g, ' $1 ')
      .replace(/\s+/g, ' ')
      // Remove leading and trailing spaces
      .trim()
      // Split the expression into tokens
      .split(' ')
      // Remove any empty tokens from the array
      .filter(Boolean);
  }

  // Convert the list of tokens into an Abstract Syntax Tree (AST)
  private parseToAST(tokens: string[]): Node {

    const out: Node[] = [];    // Stack to hold the nodes (variables, operators, etc.)
    const ops: string[] = [];  // Stack to hold operators for processing precedence

    // Helpers to identify variables and operators
    const isOp = (t: string) => t in this.operators;
    const isVar = (t: string) => /^[A-Za-z]+$/.test(t);

    // Helper for applying an operator (create a new AST node for the operator)
    const apply = (op: string) => {
      const info = this.operators[op];

      if (info.n === 1) {
        const expr = out.pop()!;
        out.push({ type: "unary", op, expr });
      } else {
        const right = out.pop()!;
        const left = out.pop()!;
        out.push({ type: "binary", op, left, right });
      }
    };

    for (const t of tokens) {

      if (isVar(t)) {
        out.push({ type: "var", name: t });
      }

      else if (isOp(t)) {
        const o1 = t;

        // Apply operators based on precedence and associativity
        while (
          ops.length &&
          isOp(ops[ops.length - 1])
          ) {
          const o2 = ops[ops.length - 1];
          const a1 = this.operators[o1];
          const a2 = this.operators[o2];

          const shouldApply =
            (a1.assoc === "L" && a1.prec <= a2.prec) ||
            (a1.assoc === "R" && a1.prec < a2.prec);

          if (shouldApply) {
            ops.pop();
            apply(o2);
          } else break;
        }

        ops.push(o1);
      }

      else if (t === "(") {
        ops.push(t);
      }

      else if (t === ")") {
        // Process all operators until we reach the matching open parentheses
        while (ops[ops.length - 1] !== "(") {
          apply(ops.pop()!);
        }
        ops.pop(); // Remove the opening parenthesis
      }
    }

    // Apply remaining operators
    while (ops.length) apply(ops.pop()!);
    return out[0];
  }

  // Format the AST node back into a string representation
  private format(node: Node): string {
    switch (node.type) {
      case "var":
        return node.name;
      case "unary":
        return `${node.op} ${this.format(node.expr)}`;
      case "binary":
        return `(${this.format(node.left)} ${node.op} ${this.format(node.right)})`;
    }
  }

  // Collect all subexpressions (variables and composite expressions) from the AST
  private collect(node: Node, acc: string[]): void {
    const vars = new Set<string>();
    const subs: string[] = [];

    const traverse = (n: Node) => {
      if (n.type === "var") {
        vars.add(n.name);
      } else if (n.type === "unary") {
        traverse(n.expr);
        subs.push(this.format(n));
      } else if (n.type === "binary") {
        traverse(n.left);
        traverse(n.right);
        subs.push(this.format(n));
      }
    };

    traverse(node);

    // Add variables first
    acc.push(...Array.from(vars));
    // Then add composite subexpressions
    acc.push(...subs);
  };


}
