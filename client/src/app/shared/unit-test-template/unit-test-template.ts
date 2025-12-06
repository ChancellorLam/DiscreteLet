import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';

// Interface for individual test question
export interface UnitTestQuestion {
  question: string;                // Question text
  options: string[];               // Array of answer choices
  correctAnswer: number;           // Index of correct option (0-based)
  explanation?: string;            // Optional explanation shown after answering
  difficulty: 'easy' | 'hard';    // Question difficulty level
  imageUrl?: string;               // Optional image path for visual questions
}

// Interface for overall test configuration
export interface UnitTestConfig {
  title: string;              // Test title displayed to user
  description: string;        // Brief description of test content
  questions: UnitTestQuestion[];  // Full question bank (both easy and hard)
  passingScore: number;       // Minimum percentage to pass (e.g., 70)
  timeLimit?: number;         // Optional time limit in minutes
}

@Component({
  selector: 'app-unit-test-template',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RadioButtonModule,
    FormsModule,
    MessageModule,
    DividerModule
  ],
  templateUrl: './unit-test-template.html',
  styleUrl: './unit-test-template.css'
})
export class UnitTestTemplate implements OnInit {
  // Input: Test configuration passed from parent component
  @Input() config!: UnitTestConfig;

  // Reactive state using Angular signals
  selectedDifficulty = signal<'easy' | 'hard' | null>(null);  // User's chosen difficulty
  testStarted = signal(false);                                 // Whether test is in progress
  testCompleted = signal(false);                               // Whether test is finished
  currentQuestionIndex = signal(0);                            // Current question number (0-based)
  selectedAnswers = signal<number[]>([]);                      // User's answers for all questions
  score = signal(0);                                           // Number of correct answers
  showResults = signal(false);                                 // Whether to display results screen
 
  // Questions for current test (filtered and shuffled by difficulty)
  testQuestions = signal<UnitTestQuestion[]>([]);
 
  // Temporary storage for user's current answer selection
  currentAnswer: number | null = null;

  // Angular lifecycle hook - runs when component initializes
  ngOnInit() {
    // Initialize selectedAnswers array with -1 (no answer selected)
    this.selectedAnswers.set(new Array(this.config.questions.length).fill(-1));
  }

  // Filter questions by difficulty and prepare test
  selectDifficulty(difficulty: 'easy' | 'hard') {
    this.selectedDifficulty.set(difficulty);
   
    // Filter to only questions matching selected difficulty
    const filteredQuestions = this.config.questions.filter(
      q => q.difficulty === difficulty
    );
   
    // Randomize question order using Fisher-Yates shuffle
    const shuffled = this.shuffleArray([...filteredQuestions]);
   
    // Select up to 15 questions (or fewer if not enough available)
    const selectedQuestions = shuffled.slice(0, Math.min(15, shuffled.length));
   
    this.testQuestions.set(selectedQuestions);
   
    // Reset answer array to match number of selected questions
    this.selectedAnswers.set(new Array(selectedQuestions.length).fill(-1));
  }

  // Begin the test
  startTest() {
    // Require difficulty selection before starting
    if (!this.selectedDifficulty()) {
      return;
    }
    // Reset all test state
    this.testStarted.set(true);
    this.currentQuestionIndex.set(0);
    this.score.set(0);
    this.testCompleted.set(false);
    this.showResults.set(false);
    this.currentAnswer = null;
  }

  // Get the question object for the current index
  getCurrentQuestion(): UnitTestQuestion | undefined {
    return this.testQuestions()[this.currentQuestionIndex()];
  }

  // Store user's answer selection for current question
  selectAnswer(optionIndex: number) {
    this.currentAnswer = optionIndex;
  }

  // Save current answer and check if correct
  submitAnswer() {
    if (this.currentAnswer === null) return;  // Don't submit if no answer selected

    // Copy answers array and update with current answer
    const answers = [...this.selectedAnswers()];
    answers[this.currentQuestionIndex()] = this.currentAnswer;
    this.selectedAnswers.set(answers);

    // Check if answer is correct and update score
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion && this.currentAnswer === currentQuestion.correctAnswer) {
      this.score.set(this.score() + 1);
    }

    // Clear current answer selection
    this.currentAnswer = null;
  }

  // Move to next question or complete test if on last question
  nextQuestion() {
    this.submitAnswer();  // Save current answer first
   
    if (this.currentQuestionIndex() < this.testQuestions().length - 1) {
      // Move to next question
      this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
    } else {
      // Last question - complete the test
      this.completeTest();
    }
  }

  // Move to previous question
  previousQuestion() {
    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.set(this.currentQuestionIndex() - 1);
      // Restore previously selected answer for this question
      this.currentAnswer = this.selectedAnswers()[this.currentQuestionIndex()];
    }
  }

  // Finalize test and show results
  completeTest() {
    this.submitAnswer();  // Save final answer
    this.testCompleted.set(true);
    this.showResults.set(true);
  }

  // Calculate score as percentage
  getScorePercentage(): number {
    return Math.round((this.score() / this.testQuestions().length) * 100);
  }

  // Check if user passed based on passing score threshold
  hasPassed(): boolean {
    return this.getScorePercentage() >= this.config.passingScore;
  }

  // Reset test to initial state for retaking
  retakeTest() {
    this.selectedDifficulty.set(null);  // Clear difficulty selection
    this.testStarted.set(false);
    this.testCompleted.set(false);
    this.currentQuestionIndex.set(0);
    this.selectedAnswers.set(new Array(this.config.questions.length).fill(-1));
    this.score.set(0);
    this.showResults.set(false);
    this.currentAnswer = null;
  }

  // Randomize array order using Fisher-Yates shuffle algorithm
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];  // Create copy to avoid mutating original
    // Iterate backwards through array
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Pick random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at i and j
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Calculate test progress as percentage
  getProgress(): number {
    return Math.round(((this.currentQuestionIndex() + 1) / this.testQuestions().length) * 100);
  }

  // Count questions available for a specific difficulty level
  getQuestionCountByDifficulty(difficulty: 'easy' | 'hard'): number {
    return this.config.questions.filter(q => q.difficulty === difficulty).length;
  }
}