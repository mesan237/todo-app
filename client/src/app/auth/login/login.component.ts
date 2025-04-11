import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  errorMessage: string | null = null;
  private authStatusSub!: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      (authStatus) => {
        this.isLoading = false;
        // Clear error on successful auth
        if (authStatus) {
          this.errorMessage = null;
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Login failed. Please try again.';
      }
    );
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(form.value.email, form.value.password).subscribe({
      next: () => {
        // Navigation is now handled in the component instead of service
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || 'Login failed. Please try again.';
        form.resetForm();
      },
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
