import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Type alias for ordered pairs like (a, b)
type Pair = [string, string];

@Component({
  selector: 'app-equiv-checker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equiv-checker.html',
  styleUrls: ['./equiv-checker.css']
})
export class EquivChecker {

  // User input strings (bound to form inputs)
  setInput = '1, 2, 3, 4, 5, 6';  // Comma-separated set elements
  relationInput = '(1,4), (4,1), (2,5), (5,2), (3,6), (6,3)';  // Pairs in format (a,b)

  // Parsed data structures
  A: string[] = [];  // The set of elements
  R: Pair[] = [];    // The relation as array of pairs

  // Property flags (true if property holds, false otherwise)
  reflexive = false;
  symmetric = false;
  transitive = false;

  // Arrays to store missing pairs for each property
  missingReflexive: Pair[] = [];   // Pairs like (a,a) that are missing
  missingSymmetric: Pair[] = [];   // Pairs like (b,a) missing when (a,b) exists
  missingTransitive: Pair[] = [];  // Pairs like (a,c) missing when (a,b) and (b,c) exist

  // Map from each element to its equivalence class
  equivalenceClasses: Record<string, string[]> = {};

  // Main update function - called when user modifies inputs
  updateAll() {
    this.parseSet();              // Parse set from input string
    this.parseRelation();         // Parse relation from input string
    this.checkReflexive();        // Check reflexive property
    this.checkSymmetric();        // Check symmetric property
    this.checkTransitive();       // Check transitive property
    this.buildEquivalenceClasses(); // Build equivalence classes
  }

  // Parse the set input string into array of elements
  parseSet() {
    this.A = this.setInput
      .split(',')              // Split by commas
      .map(s => s.trim())      // Remove whitespace
      .filter(s => s.length > 0); // Remove empty strings
  }

  // Parse relation input string into array of pairs
  // Matches patterns like (a,b) and extracts a and b
  parseRelation() {
    const regex = /\(([^,]+),([^()]+)\)/g;  // Regex to find (x,y) patterns
    let match;
    this.R = [];

    // Loop through all matches in the input string
    while ((match = regex.exec(this.relationInput)) !== null) {
      const a = match[1].trim();  // First element of pair
      const b = match[2].trim();  // Second element of pair
      this.R.push([a, b]);
    }
  }

  // Check if relation is reflexive: every element must relate to itself
  // A relation is reflexive if (a,a) ∈ R for all a ∈ A
  checkReflexive() {
    this.missingReflexive = [];

    // For each element in the set
    for (const a of this.A) {
      // Check if (a,a) exists in relation
      if (!this.hasPair(a, a)) {
        this.missingReflexive.push([a, a]);  // Track missing pair
      }
    }

    // Reflexive only if no pairs are missing
    this.reflexive = this.missingReflexive.length === 0;
  }

  // Check if relation is symmetric: if (a,b) exists, then (b,a) must exist
  // A relation is symmetric if (a,b) ∈ R implies (b,a) ∈ R
  checkSymmetric() {
    this.missingSymmetric = [];

    // For each pair (a,b) in the relation
    for (const [a, b] of this.R) {
      // Check if the reverse pair (b,a) exists
      if (!this.hasPair(b, a)) {
        this.missingSymmetric.push([b, a]);  // Track missing reverse pair
      }
    }

    // Symmetric only if no reverse pairs are missing
    this.symmetric = this.missingSymmetric.length === 0;
  }

  // Check if relation is transitive: if (a,b) and (b,c) exist, then (a,c) must exist
  // A relation is transitive if (a,b) ∈ R and (b,c) ∈ R implies (a,c) ∈ R
  checkTransitive() {
    this.missingTransitive = [];

    // For each pair (a,b) in the relation
    for (const [a, b] of this.R) {
      // Find all elements c where (b,c) exists
      const relatedToB = this.R.filter(p => p[0] === b).map(p => p[1]);

      // For each c that b relates to
      for (const c of relatedToB) {
        // Check if (a,c) exists
        if (!this.hasPair(a, c)) {
          this.missingTransitive.push([a, c]);  // Track missing transitive pair
        }
      }
    }

    // Transitive only if no implied pairs are missing
    this.transitive = this.missingTransitive.length === 0;
  }

  // Helper method: check if pair (x,y) exists in relation R
  hasPair(x: string, y: string): boolean {
    return this.R.some(([a, b]) => a === x && b === y);
  }

  // Build equivalence classes: for each element, find all elements it relates to
  // If relation is an equivalence relation, these form partitions of the set
  buildEquivalenceClasses() {
    this.equivalenceClasses = {};

    // For each element in the set
    for (const a of this.A) {
      // Find all elements that a relates to
      this.equivalenceClasses[a] = this.A.filter(b =>
        this.hasPair(a, b)
      );
    }
  }

  // Computed property: true if relation satisfies all three properties
  // An equivalence relation must be reflexive, symmetric, AND transitive
  get isEquivalenceRelation(): boolean {
    return this.reflexive && this.symmetric && this.transitive;
  }
}