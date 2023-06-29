import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate: CanActivateFn = (route, state) => {
    // const token = this.tokenService.getToken();
    // if (!token) {
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    // return true;
    return this.authService.user$.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  };
}
