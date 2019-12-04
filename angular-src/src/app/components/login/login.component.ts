import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if ((data as any).success) {
        this.authService.saveSessionUser((data as any).token, (data as any).user);
        this.router.navigate(['/profile']);
      } else {
        console.log('something wrong');
      }
    });
  }

}
