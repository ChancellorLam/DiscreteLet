// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardService } from '../../core/services/reward-service';

// Interface for quiz question structure
interface Question {
  text: string;           // The question text
  options: string[];      // Array of possible answers
  correct: string;        // The correct answer
  explanation?: string;   // Optional explanation shown after answering
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-template.html',
  styleUrls: ['./quiz-template.css']
})
export class QuizComponent {
  // Input: Quiz title displayed at the top
  @Input() title = '';
  
  // Input: Array of questions for this quiz
  @Input() questions: Question[] = [];

  // Inject reward service to track correct answers
  private rewardService = inject(RewardService);

  // Array to store user's selected answer for each question
  selectedAnswers: string[] = [];
  
  // Score (number of correct answers), null before quiz is submitted
  score: number | null = null;

  // Angular lifecycle hook - runs when @Input properties change
  ngOnChanges(changes: SimpleChanges){
    // If questions change (and not on first load), reset the quiz
    if(changes['questions'] && !changes['questions'].firstChange){
      this.resetQuiz();
    }
  }

  // Store the user's selected answer for a specific question
  selectAnswer(index: number, answer: string) {
    this.selectedAnswers[index] = answer;
  }

  // Calculate and display the user's score
  calculateScore() {
    // Count how many questions were answered correctly
    const correctCount = this.questions.filter(
      (q, i) => q.correct === this.selectedAnswers[i]
    ).length;

    // Store the score
    this.score = correctCount;

    // Award reward points for correct answers
    if(correctCount > 0){
      this.rewardService.add(correctCount);
    }
  }

  // Reset quiz to initial state (clear answers and score)
  resetQuiz() {
    this.selectedAnswers = [];  // Clear all selected answers
    this.score = null;           // Hide score display
  }
}