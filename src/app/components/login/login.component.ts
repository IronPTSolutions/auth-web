import { AuthService } from './../../shared/services/auth.service';
import { print } from 'util';
import { User } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmitLogin(loginForm) {
    this.authService.authenticate(this.user).subscribe(
      (user) => {
        loginForm.reset();
        this.router.navigate(['users']);
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

}
