import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule,NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  username: string = '';
  password: string = '';


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.signin(this.username, this.password).subscribe(
      response => {
        console.log('Sign in successful', response);
        localStorage.setItem('token', response.token);
        // console.log('Token stored in local storage:', response.token);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Sign in failed', error);
      }
    );



  }
}
