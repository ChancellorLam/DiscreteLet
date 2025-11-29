import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPage {
  private authService = inject(AuthService);
  
  errorMessage = '';
  loading = false;
  
  async onGoogleLogin(): Promise<void> {
    this.errorMessage = '';
    this.loading = true;
    
    try {
      await this.authService.loginWithGoogle();
      // Navigation handled in auth service
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google login failed';
      this.errorMessage = errorMessage;
    } finally {
      this.loading = false;
    }
  }
}