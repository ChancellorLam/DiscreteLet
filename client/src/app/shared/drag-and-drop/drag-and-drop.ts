import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { ButtonModule } from 'primeng/button';
import { RewardService } from '../../core/reward-service';

export interface Choice {
    id: number;
    name: string;
}

export interface DropZone {
    label: string;
    correctAnswerID: number;
}

@Component({
    selector: 'app-drag-and-drop',
    standalone: true,
    imports: [DragDropModule, CommonModule, ButtonModule],
    templateUrl: './drag-and-drop.html',
    styleUrls: ['./drag-and-drop.css']
})
export class DragAndDropComponent implements OnChanges {
    private rewards = inject(RewardService);
    /** Input data from parent page */
    @Input() availableChoices: Choice[] = [];
    @Input() dropZones: DropZone[] = [];

    // Store the original choices for reset
    private originalChoices: Choice[] = [];

    /** Output data to parent page */
    @Output() choicesChanged = new EventEmitter<{
        available: Choice[];
        zone1: Choice[];
        zone2: Choice[];
        zone3: Choice[];
        zone4: Choice[];
    }>();

    // Separate arrays for each drop zone
    zone1Choices: Choice[] = [];
    zone2Choices: Choice[] = [];
    zone3Choices: Choice[] = [];
    zone4Choices: Choice[] = [];

    draggedChoice: Choice | null = null;

    //Track correctness for each zone
    zone1Correct: boolean | null = null;
    zone2Correct: boolean | null = null;
    zone3Correct: boolean | null = null;
    zone4Correct: boolean | null = null;

    //Feedback for each zone
    zone1Feedback: string | null = null;
    zone2Feedback: string | null = null;
    zone3Feedback: string | null = null;
    zone4Feedback: string | null = null;

    showResults = false;

    ngOnChanges(changes: SimpleChanges) {
        // Store original choices and reset zones when available choices change
        if (changes['availableChoices']) {
            this.originalChoices = [...this.availableChoices];
            if (!changes['availableChoices'].firstChange) {
                this.resetAll();
            }
        }
    }

    dragStart(choice: Choice) {
        this.draggedChoice = choice;
    }

    dragEnd() {
        this.draggedChoice = null;
    }

    // Drop handlers for each zone
    dropZone1() {
        if (this.draggedChoice) {
            this.zone1Choices.push(this.draggedChoice);
            this.removeFromAvailable();
            this.showResults = false;
        }
    }

    dropZone2() {
        if (this.draggedChoice) {
            this.zone2Choices.push(this.draggedChoice);
            this.removeFromAvailable();
            this.showResults = false;
        }
    }

    dropZone3() {
        if (this.draggedChoice) {
            this.zone3Choices.push(this.draggedChoice);
            this.removeFromAvailable();
            this.showResults = false;
        }
    }

    dropZone4() {
        if (this.draggedChoice) {
            this.zone4Choices.push(this.draggedChoice);
            this.removeFromAvailable();
            this.showResults = false;
        }
    }

    private removeFromAvailable() {
        this.availableChoices = this.availableChoices.filter(
            (c) => c.id !== this.draggedChoice!.id
        );
        this.draggedChoice = null;

        // Notify parent component with all zones
        this.emitChanges();
    }

    checkAnswers() {
        if(this.dropZones.length >= 4) {
            //check each zone
            this.zone1Correct = this.zone1Choices.length === 1 && this.zone1Choices[0].id === this.dropZones[0].correctAnswerID;
            this.zone2Correct = this.zone2Choices.length === 1 && this.zone2Choices[0].id === this.dropZones[1].correctAnswerID;
            this.zone3Correct = this.zone3Choices.length === 1 && this.zone3Choices[0].id === this.dropZones[2].correctAnswerID;
            this.zone4Correct = this.zone4Choices.length === 1 && this.zone4Choices[0].id === this.dropZones[3].correctAnswerID;
            this.showResults=true;
            this.zone1Feedback = "Every element in this set is related to itself, therefore it is Reflexive";
            console.log(this.zone1Feedback);
            this.zone2Feedback = "For every pair in R, the reversed pair is also in R. Therefore, this is Symmetric";
            this.zone3Feedback = "For every instance where an element a is related to b, and b is related to c, the element a is also related to c within the set R. Therefore this is Transitive";
            this.zone4Feedback = "For every pair (a,b) in the relation, the reverse pair (b,a) is not in the relation. Therefore, this is Antisymmetric";
            if (this.zone1Correct) this.rewards.add(1);
            if (this.zone2Correct) this.rewards.add(1);
            if (this.zone3Correct) this.rewards.add(1);
            if (this.zone4Correct) this.rewards.add(1);
        }
    }

    // Reset functionality
    resetAll() {
        // Restore original choices
        this.availableChoices = [...this.originalChoices];

        // Clear all drop zones
        this.zone1Choices = [];
        this.zone2Choices = [];
        this.zone3Choices = [];
        this.zone4Choices = [];

        // Clear dragged state
        this.draggedChoice = null;

        this.zone1Correct = null;
        this.zone2Correct = null;
        this.zone3Correct = null;
        this.zone4Correct = null;
        this.showResults = false;
        
        this.zone1Feedback = null;
        this.zone2Feedback = null;
        this.zone3Feedback = null;
        this.zone4Feedback = null;

        // Notify parent
        this.emitChanges();
    }

    private emitChanges() {
        this.choicesChanged.emit({
            available: this.availableChoices,
            zone1: this.zone1Choices,
            zone2: this.zone2Choices,
            zone3: this.zone3Choices,
            zone4: this.zone4Choices
        });
    }
}