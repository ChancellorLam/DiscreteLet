import { Component, inject } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import confetti from 'canvas-confetti';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabsModule } from 'primeng/tabs';
import { RewardService } from '../../core/services/reward-service';
import { QuizComponent } from '../../shared/quiz-template/quiz-template';
import { RsaChallenge } from '../../shared/rsa-challenge/rsa-challenge';
import { CommonModule } from '@angular/common';
import { UnitTestTemplate, UnitTestConfig } from '../../shared/unit-test-template/unit-test-template';

interface Question {
  text: string;
  options: string[];
  correct: string;
  explanation?: string;
}

@Component({
  selector: 'app-number-theory-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, InputNumberModule, TabsModule, QuizComponent, RsaChallenge, CommonModule, UnitTestTemplate],
  templateUrl: './number-theory-page.html',
  styleUrl: './number-theory-page.css'
})
export class NumberTheoryPage {
  private rewards = inject(RewardService);
  activeTabs: string[] = [];
  activeTab = '0';
  isExpanded = false;
  randomNumber: number | null = null;
  randMod: number | null = null;
  primeNumFeedback: string | null = null;
  userModAnswer: number | null = null;
  modFeedback: string | null = null;
  userDivisibilityAnswer: number | null = null;
  divisibilityFeedback: string | null = null;
  // GCD/LCM Practice Tool
  randomGcdLcmNum1: number | null = null;
  randomGcdLcmNum2: number | null = null;
  userGcdAnswer: number | null = null;
  userLcmAnswer: number | null = null;
  gcdLcmFeedback: string | null = null;
  // Euclidean Algorithm Visualizer
  euclidNum1: number | null = null;
  euclidNum2: number | null = null;
  euclideanSteps: string[] = [];
  currentStepIndex = -1;
  euclideanResult: number | null = null;
  isEuclideanRunning = false;


  // Random Number generator for prime number checker
  // Generates a random integer between min and max (inclusive)
  getRandomNum(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  // Random Mod generator for Mod checker with max of 20
  // Generates a random modulus between min and max (inclusive)
  getRandomMod(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  // prime num checker
  // Determines if a given number is prime
  isPrime(num: number): boolean {
    if (num <= 1) return false;    // Exclude 0, 1, and negatives
    if (num === 2) return true;    // 2 is prime
    if (num % 2 === 0) return false;    // Exclude even numbers > 2

    // Check divisibility by odd numbers up to √num
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  }

  // mod checker
  // Returns the correct mod result for the generated random number and modulus
  getModAnswer(): number | null {
    if (this.randomNumber === null || this.randMod === null) return null;
    return this.randomNumber % this.randMod;
  }

  // int & divisibility
  divisibility(num1: number, num2: number): number {
    const answer = num1 / num2;
    return answer
  }

  // EVENT HANDLERS
  // Called when "Generate Number" is clicked — sets random values
  onClick(): void {
    const random = this.getRandomNum(1, 999);
    const randomMod = this.getRandomMod(1, 20);
    this.randomNumber = random;
    this.randMod = randomMod;
    this.primeNumFeedback = null;   // Reset feedback
    console.log('Random number:', random);
  }

  // Calculate GCD using Euclidean algorithm
  calculateGCD(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  // Calculate LCM using the formula: LCM(a,b) = (a × b) / GCD(a,b)
  calculateLCM(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    const gcd = this.calculateGCD(a, b);
    return Math.abs(a * b) / gcd;
  }

  // Generate random numbers for GCD/LCM practice
  generateGcdLcmProblem(): void {
    // Generate two random numbers between 2 and 50
    this.randomGcdLcmNum1 = this.getRandomNum(2, 50);
    this.randomGcdLcmNum2 = this.getRandomNum(2, 50);

    // Reset user answers and feedback
    this.userGcdAnswer = null;
    this.userLcmAnswer = null;
    this.gcdLcmFeedback = null;
    console.log('Generated numbers:', this.randomGcdLcmNum1, this.randomGcdLcmNum2);
  }

  // Handles user's "Yes"/"No" response for prime number check
  onPrimeAnswer(userGuessPrime: boolean): void {
    if (this.randomNumber === null) return;

    const actualPrime = this.isPrime(this.randomNumber);

    if (userGuessPrime === actualPrime) {
      this.primeNumFeedback = "Correct!";
      confetti();
      this.rewards.add(1);
    }
    else {
      this.primeNumFeedback = "Incorrect. Try again.";
    }
  }
  // END prime num checker

  // Handles user input for modular arithmetic checker
  onModAnswer(userGuessModAnswer: number | null): void {
    if (userGuessModAnswer === null) {
      this.modFeedback = "Please enter an answer"; return;
    }
    const correct = this.getModAnswer();
    if (correct === null) {
      this.modFeedback = "Generate numbers first!";
      return;
    }
    if (userGuessModAnswer == correct) {
      this.modFeedback = "Correct!";
      confetti();
      this.rewards.add(1);
    }
    else {
      // Use template literal correctly to show actual result
      this.modFeedback = "Incorrect. The correct answer is ${correct}.`";
    }
  }

  onDivisibilityAnswer(userGuessDivisibility: number | null): void {
    if (userGuessDivisibility === null) {
      this.divisibilityFeedback = "Please enter an answer"; return;
    }
    if (this.randomNumber === null || this.randMod === null) {
      this.divisibilityFeedback = 'Generate numbers first!';
      return;
    }

    const num = this.randomNumber;
    const den = this.randMod;
    const quotient = Math.floor(num / den);
    const remainder = num % den;

    // Exact division case
    if (remainder === 0) {
      if (userGuessDivisibility === quotient) {
        this.divisibilityFeedback = `Correct! ${num} is divisible by ${den}, quotient = ${quotient}.`;
        confetti();
        this.rewards.add(1);
      }
      else {
        this.divisibilityFeedback = `Incorrect. ${num} ÷ ${den} = ${quotient}.`;
      }
      return;
    }

    // Not exactly divisible — accept either quotient or remainder depending on UI expectation
    if (userGuessDivisibility === remainder) {
      this.divisibilityFeedback = `Correct! Remainder = ${remainder}.`;
      confetti();
      this.rewards.add(1);
    }
    else if (userGuessDivisibility === quotient) {
      this.divisibilityFeedback = `Correct! Quotient = ${quotient}.`;
      confetti();
      this.rewards.add(1);
    }
    else {
      this.divisibilityFeedback = `Not divisible. Quotient = ${quotient}, remainder = ${remainder}.`;
    }
  }

  // Check user's GCD and LCM answers
  onCheckGcdLcm(): void {
    // Validation
    if (this.randomGcdLcmNum1 === null || this.randomGcdLcmNum2 === null) {
      this.gcdLcmFeedback = 'Please generate numbers first!';
      return;
    }

    if (this.userGcdAnswer === null || this.userLcmAnswer === null) {
      this.gcdLcmFeedback = 'Please enter both GCD and LCM answers!';
      return;
    }

    // Calculate correct answers
    const correctGcd = this.calculateGCD(this.randomGcdLcmNum1, this.randomGcdLcmNum2);
    const correctLcm = this.calculateLCM(this.randomGcdLcmNum1, this.randomGcdLcmNum2);

    // Check answers
    const gcdCorrect = this.userGcdAnswer === correctGcd;
    const lcmCorrect = this.userLcmAnswer === correctLcm;
    // Provide feedback
    if (gcdCorrect && lcmCorrect) {
      this.gcdLcmFeedback = `Both answers are correct!`;
      confetti();
      this.rewards.add(2); // Award 2 points for getting both correct
    } else if (gcdCorrect && !lcmCorrect) {
      this.gcdLcmFeedback = `GCD is correct, but LCM is incorrect. The correct LCM is ${correctLcm}.`;
      this.rewards.add(1); // Award 1 point for getting one correct
    } else if (!gcdCorrect && lcmCorrect) {
      this.gcdLcmFeedback = `LCM is correct, but GCD is incorrect. The correct GCD is ${correctGcd}.`;
      this.rewards.add(1); // Award 1 point for getting one correct
    } else {
      this.gcdLcmFeedback = `Both answers are incorrect. GCD = ${correctGcd}, LCM = ${correctLcm}.`;
    }
  }

  // Generate all steps for Euclidean Algorithm
  generateEuclideanSteps(a: number, b: number): void {
    this.euclideanSteps = [];
    this.currentStepIndex = -1;
    this.euclideanResult = null;
    this.isEuclideanRunning = true;

    let num1 = Math.abs(a);
    let num2 = Math.abs(b);
    let stepNumber = 1;

    this.euclideanSteps.push(`Finding GCD(${a}, ${b}):`);

    // Generate all steps
    while (num2 !== 0) {
      const quotient = Math.floor(num1 / num2);
      const remainder = num1 % num2;

      this.euclideanSteps.push(
        `Step ${stepNumber}: ${num1} = ${num2} × ${quotient} + ${remainder}`
      );

      num1 = num2;
      num2 = remainder;
      stepNumber++;
    }

    this.euclideanResult = num1;
    this.euclideanSteps.push(`Result: GCD = ${num1}`);
  }

  // Start the Euclidean Algorithm
  startEuclidean(): void {
    if (this.euclidNum1 === null || this.euclidNum2 === null) {
      alert('Please enter both numbers!');
      return;
    }

    if (this.euclidNum1 === 0 && this.euclidNum2 === 0) {
      alert('Both numbers cannot be zero!');
      return;
    }

    this.generateEuclideanSteps(this.euclidNum1, this.euclidNum2);
    this.currentStepIndex = 0; // Show first step (title)
  }

  // Move to next step
  nextEuclideanStep(): void {
    if (this.currentStepIndex < this.euclideanSteps.length - 1) {
      this.currentStepIndex++;

      // If we reached the final result
      if (this.currentStepIndex === this.euclideanSteps.length - 1) {
        this.isEuclideanRunning = false;
        confetti();
        this.rewards.add(2);
      }
    }
  }

  // Move to previous step
  previousEuclideanStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }


  // Reset the visualizer
  resetEuclidean(): void {
    this.euclidNum1 = null;
    this.euclidNum2 = null;
    this.euclideanSteps = [];
    this.currentStepIndex = -1;
    this.euclideanResult = null;
    this.isEuclideanRunning = false;
  }

  // Quiz questions and answers //
  numberTheoryQuestionPool: Question[] = [
    {
      text: 'Which of the following best describes the main focus of number theory?',
      options: [
        'Studying shapes and angles',
        'Analyzing integer properties and relationships',
        'Measuring continuous change',
        'Calculating probabilities'
      ],
      correct: 'Analyzing integer properties and relationships',
      explanation:
        'Number theory focuses on integers, their divisibility, primes, and related structures—it’s the “arithmetic” branch of pure mathematics.'
    },
    {
      text: 'If a=20 and b=5, which statement is true?',
      options: ['a|b', 'b|a', 'Both divide each other', 'Neither divides the other'],
      correct: 'b|a',
      explanation:
        '5 divides 20 evenly (20/5=4, so b|a means "b divides a."'
    },
    {
      text: 'What is the GCD of 252 and 198?',
      options: ['9', '12', '18', '36'],
      correct: '18',
      explanation: 'Using the Euclidean Algorithm, the last nonzero remainder is 18, so gcd(252, 198) = 18.'
    },
    {
      text: 'Which of the following statements about prime numbers is true?',
      options: ['1 is a prime number', 'Every even number is prime', 'A prime has exactly two positive divisors', 'Primes have no divisors at all'],
      correct: 'A prime has exactly two positive divisors',
      explanation: 'By definition, a prime number has only two divisors: 1 and itself (e.g., 5 -> {1,5}).'
    },
    {
      text: 'In modular arithmetic, what does 17 ≡ 5 (mod 12) mean?',
      options: ['17 and 5 are both prime numbers', '17 and 5 leave the same remainder when divided by 12', '17 is a multiple of 5', '17 and 12 have a GCD of 5'],
      correct: '17 is a multiple of 5',
      explanation: 'Both 17 and 5 give remainder 5 when divided by 12, so they are congruent modulo 12.'
    },
    {
      text: 'Fermats Little Theorem states that for a prime number p and integer a...',
      options: ['aᵖ = 1', 'aᵖ⁻¹ ≡ 1 (mod p)', 'aᵖ - a is always even', 'aᵖ⁺¹ ≡ 0 (mod p)'],
      correct: 'aᵖ⁻¹ ≡ 1 (mod p)',
      explanation: 'This theorem shows how primes behave in modular arithmetic and is fundamental to cryptography.'
    },
    {
      text: 'Why are prime numbers important in the RSA encryption algorithm?',
      options: ['They make calculations faster', 'They simplify addition and subtraction', 'They make it easy to factor large numbers', 'They make it difficult to reverse the encryption process'],
      correct: 'They make it difficult to reverse the encryption process',
      explanation: 'RSA relies on the fact that factoring the product of large primes is computationally hard, securing modern digitial communication.'
    }
  ];

  // Displayed questions, randomly selected from pool
  numberTheoryQuestions: Question[] = [];

  // Unit Test Configuration
numTheoryCryptoUnitTestConfig: UnitTestConfig = {
  title: 'Number Theory and Cryptography Unit Test',
  description: 'Test your knowledge of number theory concepts, modular arithmetic, and cryptographic applications',
  passingScore: 70,
  timeLimit: 30,
  questions: [
    // Easy Questions (15 total)
    {
      question: 'Which of the following best describes the main focus of number theory?',
      options: [
        'Studying shapes and angles',
        'Analyzing integer properties and relationships',
        'Measuring continuous change',
        'Calculating probabilities'
      ],
      correctAnswer: 1,
      explanation: 'Number theory focuses on integers, their divisibility, primes, and related structures—its the "arithmetic" branch of pure mathematics.',
      difficulty: 'easy'
    },
    {
      question: 'If a=20 and b=5, which statement is true?',
      options: ['a|b', 'b|a', 'Both divide each other', 'Neither divides the other'],
      correctAnswer: 1,
      explanation: '5 divides 20 evenly (20/5=4), so b|a means "b divides a."',
      difficulty: 'easy'
    },
    {
      question: 'What is the GCD of 252 and 198?',
      options: ['9', '12', '18', '36'],
      correctAnswer: 2,
      explanation: 'Using the Euclidean Algorithm, the last nonzero remainder is 18, so gcd(252, 198) = 18.',
      difficulty: 'easy'
    },
    {
      question: 'Which of the following statements about prime numbers is true?',
      options: ['1 is a prime number', 'Every even number is prime', 'A prime has exactly two positive divisors', 'Primes have no divisors at all'],
      correctAnswer: 2,
      explanation: 'By definition, a prime number has only two divisors: 1 and itself (e.g., 5 has divisors {1,5}).',
      difficulty: 'easy'
    },
    {
      question: 'In modular arithmetic, what does 17 ≡ 5 (mod 12) mean?',
      options: ['17 and 5 are both prime numbers', '17 and 5 leave the same remainder when divided by 12', '17 is a multiple of 5', '17 and 12 have a GCD of 5'],
      correctAnswer: 1,
      explanation: 'Both 17 and 5 give remainder 5 when divided by 12, so they are congruent modulo 12.',
      difficulty: 'easy'
    },
    {
      question: 'Fermat\'s Little Theorem states that for a prime number p and integer a not divisible by p...',
      options: ['aᵖ = 1', 'aᵖ⁻¹ ≡ 1 (mod p)', 'aᵖ - a is always even', 'aᵖ⁺¹ ≡ 0 (mod p)'],
      correctAnswer: 1,
      explanation: 'This theorem shows how primes behave in modular arithmetic and is fundamental to cryptography.',
      difficulty: 'easy'
    },
    {
      question: 'Why are prime numbers important in the RSA encryption algorithm?',
      options: ['They make calculations faster', 'They simplify addition and subtraction', 'They make it easy to factor large numbers', 'They make it difficult to reverse the encryption process'],
      correctAnswer: 3,
      explanation: 'RSA relies on the fact that factoring the product of large primes is computationally hard, securing modern digital communication.',
      difficulty: 'easy'
    },
    {
      question: 'What is 23 mod 7?',
      options: ['2', '3', '4', '5'],
      correctAnswer: 0,
      explanation: '23 divided by 7 gives 3 with remainder 2, so 23 mod 7 = 2.',
      difficulty: 'easy'
    },
    {
      question: 'Which number is NOT prime?',
      options: ['2', '3', '9', '11'],
      correctAnswer: 2,
      explanation: '9 = 3 × 3, so it has more than two divisors. All the others (2, 3, 11) are prime.',
      difficulty: 'easy'
    },
    {
      question: 'What is the LCM (Least Common Multiple) of 4 and 6?',
      options: ['2', '12', '24', '10'],
      correctAnswer: 1,
      explanation: 'The smallest positive integer divisible by both 4 and 6 is 12.',
      difficulty: 'easy'
    },
    {
      question: 'In cryptography, what does "plaintext" refer to?',
      options: ['The encrypted message', 'The original, unencrypted message', 'The encryption key', 'The decryption algorithm'],
      correctAnswer: 1,
      explanation: 'Plaintext is the readable message before encryption. After encryption, it becomes ciphertext.',
      difficulty: 'easy'
    },
    {
      question: 'What is the primary purpose of a cryptographic hash function?',
      options: ['To encrypt messages', 'To generate random numbers', 'To create a fixed-size fingerprint of data', 'To factor large numbers'],
      correctAnswer: 2,
      explanation: 'Hash functions like SHA-256 produce a unique fixed-size output for any input, used for data integrity and passwords.',
      difficulty: 'easy'
    },
    {
      question: 'Which of the following is a property of modular arithmetic?',
      options: ['(a + b) mod n = ((a mod n) + (b mod n)) mod n', 'Modular arithmetic only works with prime numbers', 'All numbers are congruent modulo 1', 'Modular division is always defined'],
      correctAnswer: 0,
      explanation: 'Modular arithmetic distributes over addition and multiplication, making it useful for efficient computation.',
      difficulty: 'easy'
    },
    {
      question: 'What does it mean for two numbers to be "relatively prime" or "coprime"?',
      options: ['They are both prime numbers', 'Their GCD is 1', 'They have the same number of divisors', 'They are consecutive integers'],
      correctAnswer: 1,
      explanation: 'Two numbers are coprime if they share no common factors other than 1 (e.g., 8 and 15 are coprime).',
      difficulty: 'easy'
    },
    {
      question: 'In the RSA algorithm, what are the two main operations?',
      options: ['Hashing and signing', 'Encryption and decryption', 'Compression and decompression', 'Sorting and searching'],
      correctAnswer: 1,
      explanation: 'RSA is an asymmetric encryption algorithm that uses public keys for encryption and private keys for decryption.',
      difficulty: 'easy'
    },

    // Hard Questions (15 total)
    {
      question: 'Using the Euclidean Algorithm, what is gcd(1071, 462)?',
      options: ['21', '33', '42', '63'],
      correctAnswer: 0,
      explanation: '1071 = 462(2) + 147; 462 = 147(3) + 21; 147 = 21(7) + 0. The last nonzero remainder is 21.',
      difficulty: 'hard'
    },
    {
      question: 'If gcd(a, b) = 1 and a|bc, what can we conclude?',
      options: ['a|b', 'a|c', 'b|c', 'a = b'],
      correctAnswer: 1,
      explanation: 'This is a fundamental property: if a and b are coprime and a divides the product bc, then a must divide c.',
      difficulty: 'hard'
    },
    {
      question: 'What is 7⁴ mod 10?',
      options: ['1', '2401', '2401 mod 10 = 1', '9'],
      correctAnswer: 2,
      explanation: '7¹=7, 7²=49≡9, 7³≡63≡3, 7⁴≡21≡1 (mod 10). Alternatively, 7⁴=2401, and 2401 mod 10 = 1.',
      difficulty: 'hard'
    },
    {
      question: 'Which statement correctly describes Euler\'s Totient Function φ(n)?',
      options: ['φ(n) counts all divisors of n', 'φ(n) counts integers from 1 to n that are coprime to n', 'φ(n) = n - 1 for all n', 'φ(n) is always even'],
      correctAnswer: 1,
      explanation: 'For example, φ(12) = 4 because only {1, 5, 7, 11} are coprime to 12 among 1-12.',
      difficulty: 'hard'
    },
    {
      question: 'What is φ(15), where φ is Euler\'s Totient Function?',
      options: ['6', '8', '12', '14'],
      correctAnswer: 1,
      explanation: 'Since 15 = 3 × 5, φ(15) = φ(3)φ(5) = 2 × 4 = 8. The coprime integers are {1,2,4,7,8,11,13,14}.',
      difficulty: 'hard'
    },
    {
      question: 'In RSA, if p = 11, q = 13, what is n?',
      options: ['24', '143', '156', '169'],
      correctAnswer: 1,
      explanation: 'n = p × q = 11 × 13 = 143. This n becomes the modulus for both public and private keys.',
      difficulty: 'hard'
    },
    {
      question: 'Given p = 5, q = 11 for RSA, what is φ(n)?',
      options: ['40', '44', '50', '55'],
      correctAnswer: 0,
      explanation: 'n = 5 × 11 = 55, and φ(n) = (p-1)(q-1) = 4 × 10 = 40.',
      difficulty: 'hard'
    },
    {
      question: 'If e = 7 and φ(n) = 40, which value of d satisfies ed ≡ 1 (mod 40)?',
      options: ['23', '27', '31', '37'],
      correctAnswer: 0,
      explanation: 'We need 7d ≡ 1 (mod 40). Testing: 7 × 23 = 161 = 4(40) + 1, so d = 23 is the modular inverse.',
      difficulty: 'hard'
    },
    {
      question: 'What is the Extended Euclidean Algorithm used for in cryptography?',
      options: ['Finding prime numbers', 'Computing modular inverses', 'Generating random keys', 'Hashing passwords'],
      correctAnswer: 1,
      explanation: 'It finds coefficients x, y such that ax + by = gcd(a,b), crucial for finding the private key d in RSA.',
      difficulty: 'hard'
    },
    {
      question: 'Using Chinese Remainder Theorem, solve: x ≡ 2 (mod 3) and x ≡ 3 (mod 5)',
      options: ['8', '11', '13', '23'],
      correctAnswer: 0,
      explanation: 'x = 2 + 3k for some k. Substituting into second: 2 + 3k ≡ 3 (mod 5) gives 3k ≡ 1 (mod 5), so k = 2. Thus x = 8.',
      difficulty: 'hard'
    },
    {
      question: 'What security property does RSA rely on?',
      options: ['The difficulty of computing discrete logarithms', 'The difficulty of factoring large composite numbers', 'The randomness of hash functions', 'The speed of modular addition'],
      correctAnswer: 1,
      explanation: 'RSA security depends on the computational hardness of factoring n = pq when p and q are large primes.',
      difficulty: 'hard'
    },
    {
      question: 'If a ≡ b (mod n) and c ≡ d (mod n), which is always true?',
      options: ['a + c ≡ b + d (mod n)', 'a/c ≡ b/d (mod n)', 'aᶜ ≡ bᵈ (mod n)', 'a - d ≡ b - c (mod n)'],
      correctAnswer: 0,
      explanation: 'Modular congruence is preserved under addition and multiplication, but not generally under division.',
      difficulty: 'hard'
    },
    {
      question: 'What is the multiplicative order of 3 modulo 7?',
      options: ['2', '3', '6', '7'],
      correctAnswer: 2,
      explanation: '3¹≡3, 3²≡2, 3³≡6, 3⁴≡4, 3⁵≡5, 3⁶≡1 (mod 7). The smallest k where 3ᵏ≡1 is k=6.',
      difficulty: 'hard'
    },
    {
      question: 'In Diffie-Hellman key exchange, what mathematical problem provides security?',
      options: ['Integer factorization', 'Discrete logarithm problem', 'Knapsack problem', 'Traveling salesman problem'],
      correctAnswer: 1,
      explanation: 'Given g, p, and gˣ mod p, finding x is computationally hard, allowing secure key exchange over public channels.',
      difficulty: 'hard'
    },
    {
      question: 'Using Fermat\'s Little Theorem, what is 5¹⁰² mod 103 (given 103 is prime)?',
      options: ['1', '5', '25', '102'],
      correctAnswer: 2,
      explanation: 'By Fermat: 5¹⁰² ≡ 1 (mod 103). So 5¹⁰² = 5¹⁰²⁻¹⁰² × 5¹⁰² ≡ 1 × 5² = 25 (mod 103). Actually, 5¹⁰² ≡ 5² = 25 (mod 103).',
      difficulty: 'hard'
    }
  ]
};

constructor() {
    // initialize with random questions when component is created
    this.selectRandomQuestions(5);
  }

  //randomly selects n questions from the question pool
  //count num questions to select (default is 5)
  selectRandomQuestions(count = 5): void {
    //create a copy of the pool and shuffle it
    const shuffled = [...this.numberTheoryQuestionPool].sort(() => Math.random() -0.5);
    //take the first count questions
    this.numberTheoryQuestions = shuffled.slice(0, Math.min(count, this.numberTheoryQuestionPool.length));
  }

  //refresh quiz with new random questions
  refreshQuiz(): void {
    this.selectRandomQuestions(5);
  }



// ACCORDION CONTROL
// Toggles between expanding and collapsing all panels
  toggleAll() {
        if(this.isExpanded) {
        this.collapseAll();
      } else {
        this.expandAll();
      }
    this.isExpanded = !this.isExpanded;
  }

  expandAll() {
    this.activeTabs = ['0', '1', '2', '3', '4', '5', '6'];
  }

  collapseAll() {
    this.activeTabs = [];
  }
}
