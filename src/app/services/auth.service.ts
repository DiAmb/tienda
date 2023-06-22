import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../components/models/auth.model';
import { User } from '../components/models/user.model';
import { TokenService } from './token.service';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}api/auth`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }
  // profile(token: string) {
  profile() {
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`);
    // return this.http.get<User>(`${this.apiUrl}/profile`, {
    //   headers,
    // });
    return this.http.get<User>(`${this.apiUrl}/profile`, {});
  }
  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.profile()));
  }
}
