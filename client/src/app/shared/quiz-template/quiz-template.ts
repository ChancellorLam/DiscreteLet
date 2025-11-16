// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RewardService } from '../../core/reward-service';

interface Question {
  text: string;
  options: string[];
  correct: string;
  explanation?: string; // <-- optional, so it won't break if missing
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-template.html',
  styleUrls: ['./quiz-template.css']
})
export class QuizComponent {
  @Input() title = '';
  @Input() questions: Question[] = [];

  selectedAnswers: string[] = [];
  score: number | null = null;

  ngOnChanges(changes: SimpleChanges){
    if(changes['questions'] && !changes['questions'].firstChange){
      this.resetQuiz();
    }
  }

  selectAnswer(index: number, answer: string) {
    this.selectedAnswers[index] = answer;
  }

  calculateScore() {
    this.score = this.questions.filter(
      (q, i) => q.correct === this.selectedAnswers[i]
    ).length;
  }

  resetQuiz() {
    this.selectedAnswers = [];
    this.score = null;
  }
}
