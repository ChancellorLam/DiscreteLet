import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { RewardService } from '../../core/reward-service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-rsa-challenge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rsa-challenge.html',
  styleUrls: ['./rsa-challenge.css']
})
export class RsaChallenge implements OnInit, OnDestroy {
  //public rewards = inject(RewardService);

  // RSA key parameters
  p!: number;      // First prime number
  q!: number;      // Second prime number
  n!: number;      // Modulus (n = p × q)
  phi!: number;    // Euler's totient φ(n) = (p-1)(q-1)
  e!: number;      // Public exponent (encryption key)
  d!: number;      // Private exponent (decryption key)

  // Challenge configuration and data
  mode: 'encrypt' | 'decrypt' = 'encrypt';  // Whether user encrypts or decrypts
  plaintext = '';                            // Original message
  ciphertext: number[] = [];                 // Encrypted message as array of numbers

  // User input and feedback
  userAnswer = '';     // User's submitted answer
  feedback = '';       // Feedback message (correct/incorrect)

  // Timer properties
  timer = 90;          // Current time remaining in seconds
  maxTime = 90;        // Total time allowed for challenge
  isLocked = false;    // Whether submission is locked (time up or already submitted)
  interval!: ReturnType<typeof setInterval>;  // Timer interval reference

  // Angular lifecycle hook - runs when component initializes
  ngOnInit(): void {
    this.generateChallenge();
  }

  // Angular lifecycle hook - runs when component is destroyed
  ngOnDestroy(): void {
    clearInterval(this.interval);  // Clean up timer to prevent memory leaks
  }

  // Generate a new RSA challenge
  generateChallenge(): void {
    // Clear any existing timer
    clearInterval(this.interval);

    // Reset state
    this.feedback = '';
    this.userAnswer = '';
    this.isLocked = false;

    // Randomly choose encrypt or decrypt mode
    this.mode = Math.random() < 0.5 ? 'encrypt' : 'decrypt';

    // Generate RSA key parameters
    this.p = this.randomPrime();                    // Pick first prime
    this.q = this.randomPrime(this.p);              // Pick second prime (different from first)
    this.n = this.p * this.q;                       // Calculate modulus
    this.phi = (this.p - 1) * (this.q - 1);        // Calculate Euler's totient

    this.e = this.pickE(this.phi);                  // Pick public exponent coprime to φ(n)
    this.d = this.modInverse(this.e, this.phi);    // Calculate private exponent (modular inverse)

    // Generate plaintext message
    const words = ['HELLO', 'MATH', 'CRYPTO', 'SECRET', 'NUMBER', 'TEST'];
    this.plaintext = words[Math.floor(Math.random() * words.length)];

    // Encrypt plaintext to create ciphertext
    const nums = this.stringToNums(this.plaintext);  // Convert text to numbers (A=1, B=2, etc.)
    this.ciphertext = nums.map(m => this.modPow(m, this.e, this.n));  // Encrypt each number

    // Start countdown timer
    this.startTimer();
  }

  // Start countdown timer
  startTimer(): void {
    this.timer = this.maxTime;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        // Time's up - lock submission
        this.lock();
        this.feedback = 'Time\'s up!';
      }
    }, 1000);  // Update every second
  }

  // Lock the challenge (prevent further submissions)
  lock(): void {
    this.isLocked = true;
    clearInterval(this.interval);  // Stop timer
  }

  // Check user's submitted answer
  submit(): void {
    if (this.isLocked) return;  // Don't allow submission if locked
    this.lock();  // Lock after first submission

    let correct: string;

    if (this.mode === 'encrypt') {
      // In encrypt mode, correct answer is the ciphertext numbers
      correct = this.ciphertext.join(',');
    } else {
      // In decrypt mode, correct answer is the decrypted plaintext
      const decryptedNums = this.ciphertext.map(c => this.modPow(c, this.d, this.n));
      correct = this.numsToString(decryptedNums);
    }

    // Normalize both answers (remove spaces, convert to uppercase)
    const normalize = (s: string) =>
      s.replace(/\s+/g, '').toUpperCase();

    // Check if answer is correct
    if (normalize(this.userAnswer) === normalize(correct)) {
      this.feedback = 'Correct!';
      //this.rewards.add(3);  // Award points
      confetti();  // Celebrate with confetti animation
    } else {
      this.feedback = `Incorrect. Correct answer: ${correct}`;
    }
  }

  // Text conversion helpers
  // Convert string to array of numbers (A=1, B=2, ..., Z=26, space=0)
  stringToNums(text: string): number[] {
    return text.toUpperCase().split('').map(ch => {
      if (ch === ' ') return 0;
      return ch.charCodeAt(0) - 64;  // 'A' is ASCII 65, so 65-64=1
    });
  }

  // Convert array of numbers back to string
  numsToString(nums: number[]): string {
    return nums.map(n => {
      if (n === 0) return ' ';
      return String.fromCharCode(n + 64);  // 1 -> 'A' (ASCII 65)
    }).join('');
  }

  // Mathematical helpers
  // Modular exponentiation: compute (base^exp) mod mod efficiently
  // Used for RSA encryption/decryption
  modPow(base: number, exp: number, mod: number): number {
    let result = 1;
    base %= mod;

    while (exp > 0) {
      // If exponent is odd, multiply result by base
      if (exp % 2 === 1) result = (result * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;  // Square the base
    }
    return result;
  }

  // Greatest Common Divisor using Euclidean algorithm
  gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  // Modular multiplicative inverse: find x where (a * x) ≡ 1 (mod m)
  // Used to calculate private key d from public key e
  modInverse(a: number, m: number): number {
    const m0 = m;
    let x0 = 0;
    let x1 = 1;

    while (a > 1) {
      const q = Math.floor(a / m);
      const t = m;

      m = a % m;
      a = t;

      const tmp = x0;
      x0 = x1 - q * x0;
      x1 = tmp;
    }

    return (x1 + m0) % m0;
  }

  // Pick a random prime from small primes list
  randomPrime(exclude?: number): number {
    const primes = [11, 13, 17, 19, 23, 29, 31, 37];
    let p: number;
    // Keep picking until we get one different from excluded value
    do {
      p = primes[Math.floor(Math.random() * primes.length)];
    } while (exclude && p === exclude);
    return p;
  }

  // Pick public exponent e that is coprime with φ(n)
  // e must satisfy gcd(e, φ(n)) = 1
  pickE(phi: number): number {
    const candidates = [3, 5, 7, 11, 17, 19];
    return candidates.find(e => this.gcd(e, phi) === 1) ?? 3;
  }
}