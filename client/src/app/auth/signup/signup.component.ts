import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  errorMessage: string | null = null;
  private authStatusSub!: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      (authStatus) => {
        if (authStatus) {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'Signup failed. Please try again.';
      }
    );
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.authService
      .signUp(form.value.name, form.value.email, form.value.password)
      .subscribe({
        next: () => {
          this.isLoading = false;
          // Navigation is handled by the authStatusListener subscription in ngOnInit
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage =
            err.error?.message || 'Signup failed. Please try again.';
          form.resetForm();
        },
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
