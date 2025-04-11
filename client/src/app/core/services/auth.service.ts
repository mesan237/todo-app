import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../../environment/environment';

interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser!: User | null;

  private authStatusListener = new Subject<boolean>();
  private userListener = new Subject<User>();
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private apiUrl = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient, private router: Router) {}

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

  signUp(
    name: string,
    email: string,
    password: string
  ): Observable<{ message: string }> {
    const userData = { name, email, password };

    return this.http
      .post<{
        token: string;
        expiresIn: number;
        user: User;
      }>(`${this.apiUrl}/register`, userData, {
        withCredentials: true,
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((response) => {
          this.isAuthenticated = true;
          this.currentUser = response.user;
          this.authStatusListener.next(true);

          this.saveAuthData(response.user);
          this.currentUserSubject.next(response.user);
        }),
        map(() => ({ message: 'Signup successful' })),
        catchError((error) => {
          this.authStatusListener.next(false);
          const errorMessage =
            error.error?.message || 'An unknown error occurred during signup.';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  login(
    email: string,
    password: string
  ): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(
        `${this.apiUrl}/login`,
        { email, password },
        {
          withCredentials: true,
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        tap((response) => {
          this.isAuthenticated = true;
          this.currentUser = response.user;
          this.authStatusListener.next(true);

          this.saveAuthData(response.user);
          this.currentUserSubject.next(response.user);
        }),
        catchError((error) => {
          const errorMessage =
            error.error?.message || 'An unknown error occurred during login.';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }

    this.isAuthenticated = true;
    this.currentUser = {
      name: authInformation.name,
      email: authInformation.email,
    };
    this.authStatusListener.next(true);
    this.currentUserSubject.next(this.currentUser);
  }

  logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.currentUser = null;
    this.clearAuthData();
    this.router.navigate(['/login']).catch((err) => {
      console.error('Navigation to /login failed:', err);
    });
  }

  private saveAuthData(user: User) {
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
  }

  private clearAuthData() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  private getAuthData() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (!name || !email) {
      return null;
    }

    return { name, email };
  }
}
