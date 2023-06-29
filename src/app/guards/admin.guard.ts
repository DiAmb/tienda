import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate: CanActivateFn = (route, state) => {
    return this.authService.user$.pipe(
      map((user) => {
        if (user?.role === 'admin') {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  };
}
