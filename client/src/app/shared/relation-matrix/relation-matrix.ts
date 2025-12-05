import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-relation-matrix',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relation-matrix.html',
  styleUrls: ['./relation-matrix.css']
})
export class RelationMatrix {

  // User input strings (bound to form inputs)
  setInput = 'a1, a2, a3';                    // Comma-separated set elements
  relationInput = '(a1,a2), (a2,a3)';         // Pairs in format (a,b)

  // Parsed data structures
  A: string[] = [];                           // Array of set elements
  matrix: number[][] = [];                    // 2D matrix representation (0 or 1)
  relationPairs: [string, string][] = [];     // Array of ordered pairs in the relation

  // Parse set input and rebuild matrix from relation
  updateSet() {
    // Parse the set input string into array of elements
    this.A = this.setInput
      .split(',')                  // Split by commas
      .map(x => x.trim())          // Remove whitespace
      .filter(x => x.length > 0);  // Remove empty strings

    // Create empty matrix based on set size
    this.buildEmptyMatrix();
    
    // Parse relation and fill matrix
    this.updateRelationFromInput();
  }

  // Parse relation input string and update matrix
  updateRelationFromInput() {
    const regex = /\(([^,]+),([^()]+)\)/g;  // Regex to match (x,y) patterns
    let match;

    this.relationPairs = [];

    // Extract all pairs from input string
    while ((match = regex.exec(this.relationInput)) !== null) {
      const a = match[1].trim();  // First element
      const b = match[2].trim();  // Second element
      
      // Only include pair if both elements are in the set
      if (this.A.includes(a) && this.A.includes(b)) {
        this.relationPairs.push([a, b]);
      }
    }

    // Build matrix representation from parsed pairs
    this.buildMatrixFromRelation();
  }

  // Create an n×n matrix filled with zeros
  buildEmptyMatrix() {
    const n = this.A.length;
    this.matrix = Array.from({ length: n }, () =>
      Array(n).fill(0)  // Each row is array of n zeros
    );
  }

  // Convert relation pairs to matrix representation
  // matrix[i][j] = 1 if (A[i], A[j]) is in the relation
  buildMatrixFromRelation() {
    // Start with empty matrix
    this.buildEmptyMatrix();

    // For each pair in the relation
    this.relationPairs.forEach(([x, y]) => {
      const i = this.A.indexOf(x);  // Row index (first element)
      const j = this.A.indexOf(y);  // Column index (second element)
      
      // Set matrix cell to 1 if both elements are in set
      if (i !== -1 && j !== -1) {
        this.matrix[i][j] = 1;
      }
    });
  }

  // Toggle matrix cell between 0 and 1 when user clicks
  // This allows interactive editing of the relation
  toggleCell(i: number, j: number) {
    this.matrix[i][j] = this.matrix[i][j] === 1 ? 0 : 1;
    
    // Update relation pairs and input string to match new matrix
    this.updateRelationFromMatrix();
  }

  // Convert current matrix back to relation pairs and update input string
  // This syncs the matrix representation with the text representation
  updateRelationFromMatrix() {
    const newPairs: [string, string][] = [];
    const n = this.A.length;

    // Scan through entire matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // If cell is 1, add corresponding pair to relation
        if (this.matrix[i][j] === 1) {
          newPairs.push([this.A[i], this.A[j]]);
        }
      }
    }

    // Update relation pairs array
    this.relationPairs = newPairs;
    
    // Convert pairs back to string format and update input field
    this.relationInput = newPairs.map(p => `(${p[0]}, ${p[1]})`).join(', ');
  }
}