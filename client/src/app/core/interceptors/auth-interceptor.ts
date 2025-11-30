import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { from, switchMap, catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Don't add token to auth endpoints
  if (req.url.includes('/auth/verify') || 
      req.url.includes('/auth/register') || 
      req.url.includes('/auth/login')) {
    return next(req);
  }
  
  // Safely inject AuthService
  try {
    const authService = inject(AuthService);
    
    // Add token to all other API requests
    return from(authService.getToken()).pipe(
      switchMap(token => {
        if (token) {
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next(clonedReq);
        }
        return next(req);
      }),
      catchError(() => {
        // If auth fails, continue without token
        return next(req);
      })
    );
  } catch {
    // If inject fails (Firebase not ready), continue without token
    return next(req);
  }
};