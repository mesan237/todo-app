import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environment/environment';

interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token!: string | null;
  private tokenTimer: any;
  private currentUser!: User | null;

  private authStatusListener = new Subject<boolean>();
  private userListener = new Subject<User>();

  private apiUrl = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserListener() {
    return this.userListener.asObservable();
  }

  signUp(name: string, email: string, password: string) {
    const userData: User = { name, email, password };

    this.http
      .post<{ token: string; expiresIn: number; user: User }>(
        `http://localhost:8000/api/users/register`,
        userData,
        {
          withCredentials: true,
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;

          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.currentUser = response.user;
            this.authStatusListener.next(true);

            const expirationDate = new Date(
              new Date().getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, response.user);

            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  login(
    email: string,
    password: string
  ): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(
        `http://localhost:8000/api/users/login/`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        tap((response) => {
          // Handle token storage and other side effects here
          this.token = response.token;
          this.currentUser = response.user;
          this.authStatusListener.next(true);
        })
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;

      this.currentUser = {
        name: authInformation.name! as string,
        email: authInformation.email! as string,
        password: '',
      };
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.currentUser = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      name: name,
      email: email,
    };
  }
}
