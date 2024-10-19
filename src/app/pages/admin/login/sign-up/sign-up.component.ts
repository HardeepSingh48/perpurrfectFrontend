import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignupComponent {
  name: string = '';
  username: string = '';
  password: string = '';
  agreeToTerms: boolean = false;

  constructor(private authService: AuthService,private router: Router) { }

  onSubmitSignUpForm() {
    this.authService.signup(this.name, this.username, this.password).subscribe(
      response => {
        console.log('Signup successful', response);
        alert("Account created Successfully!")
        setTimeout(() => {
          
          this.router.navigate(['/login'])
        }, 2000);
      },
      error => {
        console.error('Signup failed', error);
      }
    );
  }
}
