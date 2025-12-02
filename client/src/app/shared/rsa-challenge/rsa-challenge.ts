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


  // RSA parameters
  p!: number;
  q!: number;
  n!: number;
  phi!: number;
  e!: number;
  d!: number;


  // challenge mode + data
  mode: 'encrypt' | 'decrypt' = 'encrypt';
  plaintext = '';
  ciphertext: number[] = [];


  // user + feedback
  userAnswer = '';
  feedback = '';


  // timer
  timer = 90;
  maxTime = 90;
  isLocked = false;
  interval!: ReturnType<typeof setInterval>;


  ngOnInit(): void {
    this.generateChallenge();
  }


  ngOnDestroy(): void {
    clearInterval(this.interval);
  }


  // Challenge generation
  generateChallenge(): void {
    clearInterval(this.interval);


    this.feedback = '';
    this.userAnswer = '';
    this.isLocked = false;


    // randomly choose encrypt or decrypt
    this.mode = Math.random() < 0.5 ? 'encrypt' : 'decrypt';


    // pick small primes
    this.p = this.randomPrime();
    this.q = this.randomPrime(this.p);
    this.n = this.p * this.q;
    this.phi = (this.p - 1) * (this.q - 1);


    this.e = this.pickE(this.phi);
    this.d = this.modInverse(this.e, this.phi);


    // pick a random word as plaintext
    const words = ['HELLO', 'MATH', 'CRYPTO', 'SECRET', 'NUMBER', 'TEST'];
    this.plaintext = words[Math.floor(Math.random() * words.length)];


    // encrypt plaintext -> ciphertext array
    const nums = this.stringToNums(this.plaintext);  // [8,5,12,...]
    this.ciphertext = nums.map(m => this.modPow(m, this.e, this.n));


    this.startTimer();
  }


  // Timer
  startTimer(): void {
    this.timer = this.maxTime;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.lock();
        this.feedback = 'Time\'s up!';
      }
    }, 1000);
  }


  lock(): void {
    this.isLocked = true;
    clearInterval(this.interval);
  }


  // Submit / check answer
  submit(): void {
    if (this.isLocked) return;
    this.lock();


    let correct: string;


    if (this.mode === 'encrypt') {
      // correct answer = ciphertext numbers separated by commas
      correct = this.ciphertext.join(',');
    } else {
      // decrypt numbers -> message
      const decryptedNums = this.ciphertext.map(c => this.modPow(c, this.d, this.n));
      correct = this.numsToString(decryptedNums);
    }


    const normalize = (s: string) =>
      s.replace(/\s+/g, '').toUpperCase();


    if (normalize(this.userAnswer) === normalize(correct)) {
      this.feedback = 'Correct!';
      //this.rewards.add(3);
      confetti();
    } else {
      this.feedback = `Incorrect. Correct answer: ${correct}`;
    }
  }


  // Text helpers
  stringToNums(text: string): number[] {
    return text.toUpperCase().split('').map(ch => {
      if (ch === ' ') return 0;
      return ch.charCodeAt(0) - 64; // 'A' -> 1
    });
  }


  numsToString(nums: number[]): string {
    return nums.map(n => {
      if (n === 0) return ' ';
      return String.fromCharCode(n + 64);
    }).join('');
  }


  // Math helpers
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


  randomPrime(exclude?: number): number {
    const primes = [11, 13, 17, 19, 23, 29, 31, 37];
    let p: number;
    do {
      p = primes[Math.floor(Math.random() * primes.length)];
    } while (exclude && p === exclude);
    return p;
  }


  pickE(phi: number): number {
    const candidates = [3, 5, 7, 11, 17, 19];
    return candidates.find(e => this.gcd(e, phi) === 1) ?? 3;
  }
}





