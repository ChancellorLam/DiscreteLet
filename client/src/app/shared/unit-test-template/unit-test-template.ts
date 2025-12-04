import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';


export interface UnitTestQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation?: string;
  difficulty: 'easy' | 'hard';
}


export interface UnitTestConfig {
  title: string;
  description: string;
  questions: UnitTestQuestion[];
  passingScore: number; // Percentage needed to pass (e.g., 70)
  timeLimit?: number; // Optional time limit in minutes
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
  @Input() config!: UnitTestConfig;


  // Signals for reactive state
  selectedDifficulty = signal<'easy' | 'hard' | null>(null);
  testStarted = signal(false);
  testCompleted = signal(false);
  currentQuestionIndex = signal(0);
  selectedAnswers = signal<number[]>([]);
  score = signal(0);
  showResults = signal(false);
 
  // Filtered and shuffled questions based on difficulty
  testQuestions = signal<UnitTestQuestion[]>([]);
 
  // For storing user's current selection
  currentAnswer: number | null = null;


  ngOnInit() {
    // Initialize selectedAnswers array
    this.selectedAnswers.set(new Array(this.config.questions.length).fill(-1));
  }


  // Select difficulty and start test
  selectDifficulty(difficulty: 'easy' | 'hard') {
    this.selectedDifficulty.set(difficulty);
   
    // Filter questions by difficulty
    const filteredQuestions = this.config.questions.filter(
      q => q.difficulty === difficulty
    );
   
    // Shuffle questions randomly
    const shuffled = this.shuffleArray([...filteredQuestions]);
   
    // Take only 15 questions (or less if there aren't 15 available)
    const selectedQuestions = shuffled.slice(0, Math.min(15, shuffled.length));
   
    this.testQuestions.set(selectedQuestions);
   
    // Reset selectedAnswers for new question set
    this.selectedAnswers.set(new Array(selectedQuestions.length).fill(-1));
  }


  startTest() {
    if (!this.selectedDifficulty()) {
      return;
    }
    this.testStarted.set(true);
    this.currentQuestionIndex.set(0);
    this.score.set(0);
    this.testCompleted.set(false);
    this.showResults.set(false);
    this.currentAnswer = null;
  }


  getCurrentQuestion(): UnitTestQuestion | undefined {
    return this.testQuestions()[this.currentQuestionIndex()];
  }


  selectAnswer(optionIndex: number) {
    this.currentAnswer = optionIndex;
  }


  submitAnswer() {
    if (this.currentAnswer === null) return;


    const answers = [...this.selectedAnswers()];
    answers[this.currentQuestionIndex()] = this.currentAnswer;
    this.selectedAnswers.set(answers);


    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion && this.currentAnswer === currentQuestion.correctAnswer) {
      this.score.set(this.score() + 1);
    }


    this.currentAnswer = null;
  }


  nextQuestion() {
    this.submitAnswer();
   
    if (this.currentQuestionIndex() < this.testQuestions().length - 1) {
      this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
    } else {
      this.completeTest();
    }
  }


  previousQuestion() {
    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.set(this.currentQuestionIndex() - 1);
      this.currentAnswer = this.selectedAnswers()[this.currentQuestionIndex()];
    }
  }


  completeTest() {
    this.submitAnswer();
    this.testCompleted.set(true);
    this.showResults.set(true);
  }


  getScorePercentage(): number {
    return Math.round((this.score() / this.testQuestions().length) * 100);
  }


  hasPassed(): boolean {
    return this.getScorePercentage() >= this.config.passingScore;
  }


  retakeTest() {
    this.selectedDifficulty.set(null);
    this.testStarted.set(false);
    this.testCompleted.set(false);
    this.currentQuestionIndex.set(0);
    this.selectedAnswers.set(new Array(this.config.questions.length).fill(-1));
    this.score.set(0);
    this.showResults.set(false);
    this.currentAnswer = null;
  }


  // Utility function to shuffle array (Fisher-Yates algorithm)
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }


  // Get progress as a percentage
  getProgress(): number {
    return Math.round(((this.currentQuestionIndex() + 1) / this.testQuestions().length) * 100);
  }


  // Get count of questions by difficulty
  getQuestionCountByDifficulty(difficulty: 'easy' | 'hard'): number {
    return this.config.questions.filter(q => q.difficulty === difficulty).length;
  }
}

