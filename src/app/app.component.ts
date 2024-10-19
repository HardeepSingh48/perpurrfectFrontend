import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthInterceptor } from './interceptors/auth.intercerptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './pages/website/home/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './pages/website/home/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Add the interceptor here
      multi: true,  // Ensure multiple interceptors are supported
    },
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bigbasket';
  showHeaderFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide header/footer for login page
        this.showHeaderFooter = !event.url.includes('/login');
      }
    });
  }
}
