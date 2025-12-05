import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-profile-page', 
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DividerModule
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePage {

  // Method to open PDF in a new tab
  viewPDF(path: string) {
    window.open(path, '_blank');
  }

  // Method to download PDF
  downloadPDF(path: string, filename: string) {
    const link = document.createElement('a');
    link.href = path;
    link.download = filename;
    link.click();
  }
}