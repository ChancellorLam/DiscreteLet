import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';

export interface Choice {
    id: number;
    name: string;
}

@Component({
    selector: 'app-drag-and-drop',
    standalone: true,
    imports: [DragDropModule, CommonModule],
    templateUrl: './drag-and-drop.html',
    styleUrls: ['./drag-and-drop.css']
})
export class DragAndDropComponent implements OnChanges {
    /** Input data from parent page */
    @Input() availableChoices: Choice[] = [];

    /** Output data to parent page */
    @Output() choicesChanged = new EventEmitter<{
        available: Choice[];
        zone1: Choice[];
        zone2: Choice[];
        zone3: Choice[];
        zone4: Choice[];
    }>();

    zone1Choices: Choice[] = [];
    zone2Choices: Choice[] = [];
    zone3Choices: Choice[] = [];
    zone4Choices: Choice[] = [];
    draggedChoice: Choice | null = null;

    ngOnChanges(changes: SimpleChanges) {
        // Reset selected choices when available choices change from parent
        if (changes['availableChoices'] && !changes['availableChoices'].firstChange) {
            this.zone1Choices = [];
            this.zone2Choices = [];
            this.zone3Choices = [];
            this.zone4Choices = [];
        }
    }

    dragStart(choice: Choice) {
        this.draggedChoice = choice;
    }

    dragEnd() {
        this.draggedChoice = null;
    }

    dropZone1() {
        if (this.draggedChoice) {
            this.zone1Choices.push(this.draggedChoice);
            this.removeFromAvailable();
        }
    }
    dropZone2() {
        if (this.draggedChoice) {
            this.zone2Choices.push(this.draggedChoice);
            this.removeFromAvailable();
        }
    }
    dropZone3() {
        if (this.draggedChoice) {
            this.zone3Choices.push(this.draggedChoice);
            this.removeFromAvailable();
        }
    }
    dropZone4() {
        if (this.draggedChoice) {
            this.zone4Choices.push(this.draggedChoice);
            this.removeFromAvailable();
        }
    }
    private removeFromAvailable() {
        this.availableChoices = this.availableChoices.filter(
            (c) => c.id !== this.draggedChoice!.id
        );
        this.draggedChoice = null;

        // Notify parent component with both lists
        this.choicesChanged.emit({
            available: this.availableChoices,
            zone1: this.zone1Choices,
            zone2: this.zone2Choices,
            zone3: this.zone3Choices,
            zone4: this.zone4Choices
        });
    }
}