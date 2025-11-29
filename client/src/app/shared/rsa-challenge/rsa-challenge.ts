/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rsa-challenge',
  imports: [FormsModule],
  templateUrl: './rsa-challenge.html',
  styleUrls: ['./rsa-challenge.css']
})
export class RsaChallenge implements OnInit, OnDestroy {

  // RSA values
  p!: number;
  q!: number;
  n!: number;
  phi!: number;
  e!: number;
  d!: number;

  // challenge
  mode: 'encrypt' | 'decrypt' = 'encrypt';
  message!: number;
  cipher!: number;
  
  // user input and feedback
  userAnswer: number | null = null;
  correctAnswer!: number;
  feedback = "";

  // timer
  timer = 60;
  maxTime = 60;
  isLocked = false;
  interval: any;

  ngOnInit() {
    this.generateChallenge();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  // -----------------------------
  // Main Challenge Generation
  // -----------------------------
  generateChallenge() {
    clearInterval(this.interval);

    this.feedback = "";
    this.userAnswer = null;
    this.isLocked = false;
    this.mode = Math.random() > 0.5 ? "encrypt" : "decrypt";

    // generate RSA values
    this.p = this.randomPrime();
    this.q = this.randomPrime(this.p);
    this.n = this.p * this.q;
    this.phi = (this.p - 1) * (this.q - 1);

    this.e = this.pickE(this.phi);
    this.d = this.modInverse(this.e, this.phi);

    // generate message/cipher
    this.message = this.randomInt(2, this.n - 2);
    this.cipher = this.modPow(this.message, this.e, this.n);

    // correct answer based on mode
    this.correctAnswer = 
      this.mode === "encrypt"
        ? this.cipher
        : this.modPow(this.cipher, this.d, this.n);

    // reset timer
    this.timer = this.maxTime;
    this.startTimer();
  }

  // -----------------------------
  // Timer
  // -----------------------------
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.lock();
        this.feedback = `Time's up! Correct answer: ${this.correctAnswer}`;
      }
    }, 1000);
  }

  lock() {
    this.isLocked = true;
    clearInterval(this.interval);
  }

  // -----------------------------
  // Answer Handling
  // -----------------------------
  submit() {
    if (this.isLocked) return;

    this.lock();

    if (this.userAnswer === this.correctAnswer) {
      this.feedback = "Correct!";
    } else {
      this.feedback = `Incorrect. Correct answer: ${this.correctAnswer}`;
    }
  }

  // -----------------------------
  // Math Helpers
  // -----------------------------
  modPow(base: number, exp: number, mod: number): number {
    let result = 1;
    base %= mod;

    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  }

  gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  modInverse(a: number, m: number): number {
    let m0 = m, x0 = 0, x1 = 1;

    while (a > 1) {
      let q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    return (x1 + m0) % m0;
  }

  randomPrime(exclude?: number): number {
    const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41];  
    let p;
    do {
      p = primes[Math.floor(Math.random() * primes.length)];
    } while (exclude && p === exclude);
    return p;
  }

  pickE(phi: number): number {
    const candidates = [3, 5, 7, 11, 17, 19];
    for (let e of candidates) {
      if (this.gcd(e, phi) === 1) return e;
    }
    return 3;
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
