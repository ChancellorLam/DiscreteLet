// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardService } from '../../core/reward-service';

//structure for quiz questions
interface Question {
  text: string;
  options: string[];
  correct: string;
  explanation: string; 
}

//reuseable quiz component
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-template.html',
  styleUrls: ['./quiz-template.css']
})
export class QuizComponent {
  //Input properties. These are passed in from parent components
  @Input() title = ''; // title displayed at top of quiz
  @Input() questions: Question[] = []; // array of questions to display

  //inject reward service to rack user points
  private rewardService = inject(RewardService);

  selectedAnswers: string[] = []; //stores user selected answer for each question
  score: number | null = null; //stores quiz score

  // Lifecycle hook, runs whenever input properties change
  ngOnChanges(changes: SimpleChanges){
    //check if question input changed AND its not the first time its been set
    if(changes['questions'] && !changes['questions'].firstChange){
      this.resetQuiz();
    }
  }

  //index = which question numnber
  //answer = text of the selected answer
  selectAnswer(index: number, answer: string) {
    //store the selected answer in the array at the corresponding index
    this.selectedAnswers[index] = answer;
  }

  //called when user clicks "submit" button
  calculateScore() {
    //count num questions answered correctly
    //for each question, check if correct answer matches user's selected answer
    const correctCount = this.questions.filter(
      (q, i) => q.correct === this.selectedAnswers[i]
    ).length;

    this.score = correctCount;

    //award points for correct answers
    if(correctCount > 0){
      this.rewardService.add(correctCount);
    }
  }

  //clear all user selections and the score
  resetQuiz() {
    this.selectedAnswers = [];
    this.score = null;
  }
}
