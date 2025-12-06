import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { ButtonModule } from 'primeng/button';
import { RewardService } from '../../core/services/reward-service';

// Interface for draggable choice items
export interface Choice {
    id: number;
    name: string;
}

// Interface for drop zone configuration
export interface DropZone {
    label: string;
    correctAnswerID: number;  // The ID of the correct choice for this zone
}

@Component({
    selector: 'app-drag-and-drop',
    standalone: true,
    imports: [DragDropModule, CommonModule, ButtonModule],
    templateUrl: './drag-and-drop.html',
    styleUrls: ['./drag-and-drop.css']
})
export class DragAndDropComponent implements OnChanges {
    // Inject reward service to track correct answers
    private rewards = inject(RewardService);

    // Input: List of choices available to drag
    @Input() availableChoices: Choice[] = [];
    
    // Input: Configuration for each drop zone
    @Input() dropZones: DropZone[] = [];

    // Store the original choices so we can reset later
    private originalChoices: Choice[] = [];

    //Output: Emit changes whenever choices are moved 
    @Output() choicesChanged = new EventEmitter<{
        available: Choice[];
        zone1: Choice[];
        zone2: Choice[];
        zone3: Choice[];
        zone4: Choice[];
    }>();

    // Output: Emit results when answers are checked
    @Output() resultsChecked = new EventEmitter<{
        correctness: boolean[];  // Array of true/false for each zone
        zones: {
            zone1: Choice[];
            zone2: Choice[];
            zone3: Choice[];
            zone4: Choice[];
        };
    }>();

    // Arrays to store dropped choices in each zone
    zone1Choices: Choice[] = [];
    zone2Choices: Choice[] = [];
    zone3Choices: Choice[] = [];
    zone4Choices: Choice[] = [];

    // Currently dragged choice (null when not dragging)
    draggedChoice: Choice | null = null;

    // Track correctness status for each zone (null = not checked yet)
    zone1Correct: boolean | null = null;
    zone2Correct: boolean | null = null;
    zone3Correct: boolean | null = null;
    zone4Correct: boolean | null = null;

    // Flag to show/hide visual feedback
    showResults = false;

    // Angular lifecycle hook - runs when @Input properties change
    ngOnChanges(changes: SimpleChanges) {
        // When available choices change, save original and reset zones
        if (changes['availableChoices']) {
            this.originalChoices = [...this.availableChoices];
            // Don't reset on first initialization
            if (!changes['availableChoices'].firstChange) {
                this.resetAll();
            }
        }
    }

    // Called when user starts dragging a choice
    dragStart(choice: Choice) {
        this.draggedChoice = choice;
    }

    // Called when drag operation ends
    dragEnd() {
        this.draggedChoice = null;
    }

    // Drop handler for zone 1
    dropZone1() {
        if (this.draggedChoice) {
            this.zone1Choices.push(this.draggedChoice);
            this.removeFromAvailable();
            this.showResults = false;  // Hide results when making changes
        }
    }

    // Drop handler for zone 2
    dropZone2() {
        if (this.draggedChoice) {
            this.zone2Choices.push(this.draggedChoice);
            this.removeFromAvailable();
            this.showResults = false;
        }
    }

    // Drop handler for zone 3
    dropZone3() {
        if (this.draggedChoice) {
            this.zone3Choices.push(this.draggedChoice);
            this.removeFromAvailable();
            this.showResults = false;
        }
    }

    // Drop handler for zone 4
    dropZone4() {
        if (this.draggedChoice) {
            this.zone4Choices.push(this.draggedChoice);
            this.removeFromAvailable();
            this.showResults = false;
        }
    }

    // Remove the dragged choice from available choices and notify parent
    private removeFromAvailable() {
        this.availableChoices = this.availableChoices.filter(
            (c) => c.id !== this.draggedChoice!.id
        );
        this.draggedChoice = null;

        // Notify parent component about the change
        this.emitChanges();
    }

    // Check if answers are correct and provide feedback
    checkAnswers() {
        if (this.dropZones.length >= 4) {
            // Check each zone: must have exactly 1 choice with the correct ID
            this.zone1Correct = this.zone1Choices.length === 1 && 
                               this.zone1Choices[0].id === this.dropZones[0].correctAnswerID;
            this.zone2Correct = this.zone2Choices.length === 1 && 
                               this.zone2Choices[0].id === this.dropZones[1].correctAnswerID;
            this.zone3Correct = this.zone3Choices.length === 1 && 
                               this.zone3Choices[0].id === this.dropZones[2].correctAnswerID;
            this.zone4Correct = this.zone4Choices.length === 1 && 
                               this.zone4Choices[0].id === this.dropZones[3].correctAnswerID;

            // Show visual feedback
            this.showResults = true;

            // Send results to parent component
            this.resultsChecked.emit({
                correctness: [
                    this.zone1Correct,
                    this.zone2Correct,
                    this.zone3Correct,
                    this.zone4Correct
                ],
                zones: {
                    zone1: this.zone1Choices,
                    zone2: this.zone2Choices,
                    zone3: this.zone3Choices,
                    zone4: this.zone4Choices
                }
            });

            // Award points for each correct answer
            if (this.zone1Correct) this.rewards.add(1);
            if (this.zone2Correct) this.rewards.add(1);
            if (this.zone3Correct) this.rewards.add(1);
            if (this.zone4Correct) this.rewards.add(1);
        }
    }

    // Reset the activity to initial state
    resetAll() {
        // Restore original choices to available list
        this.availableChoices = [...this.originalChoices];

        // Clear all drop zones
        this.zone1Choices = [];
        this.zone2Choices = [];
        this.zone3Choices = [];
        this.zone4Choices = [];

        // Clear dragged state
        this.draggedChoice = null;

        // Clear correctness tracking
        this.zone1Correct = null;
        this.zone2Correct = null;
        this.zone3Correct = null;
        this.zone4Correct = null;
        this.showResults = false;

        // Notify parent of reset
        this.emitChanges();
    }

    // Helper method to emit current state to parent component
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