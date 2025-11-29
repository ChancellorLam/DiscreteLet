import { Injectable, inject, signal } from '@angular/core';
import { Auth, signOut, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development'; 

export interface AuthUser {
  id?: number;
  email: string;
  username: string;
  firebaseUid?: string;
}

interface BackendVerifyResponse {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // Signal to track current user
  currentUser = signal<AuthUser | null>(null);
  firebaseUser = signal<User | null>(null);
  
  constructor() {
    // Listen to Firebase auth state changes
    onAuthStateChanged(this.auth, async (user) => {
      this.firebaseUser.set(user);
      
      if (user) {
        // User is signed in, sync with backend
        await this.syncUserWithBackend(user);
      } else {
        // User is signed out
        this.currentUser.set(null);
      }
    });
  }
  
  // Login with Google (also handles registration automatically)
  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this.auth, provider);
      
      // Sync with backend (creates user if doesn't exist)
      const token = await credential.user.getIdToken();
      await this.verifyWithBackend(token);
      
      console.log('User logged in with Google successfully');
      this.router.navigate(['/home']); // Navigate to home after login
    } catch (error) {
      console.error('Google login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Google login failed';
      throw new Error(errorMessage);
    }
  }
  
  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUser.set(null);
      this.router.navigate(['/login']);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      throw new Error(errorMessage);
    }
  }
  
  // Sync user with backend
  private async syncUserWithBackend(user: User): Promise<void> {
    try {
      const token = await user.getIdToken();
      await this.verifyWithBackend(token);
    } catch (error) {
      console.error('Failed to sync with backend:', error);
    }
  }
  
  // Verify token with backend
  private async verifyWithBackend(token: string): Promise<void> {
    try {
      const response = await this.http.post<BackendVerifyResponse>(
        `${environment.apiUrl}/auth/verify`,
        { firebaseToken: token }
      ).toPromise();
      
      if (response) {
        this.currentUser.set(response.user);
      }
    } catch (error) {
      console.error('Backend verification error:', error);
      throw error;
    }
  }
  
  // Get current Firebase token
  async getToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.firebaseUser() !== null;
  }
}