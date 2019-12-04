import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { AuthService} from '../../services/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private validateService: ValidateService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Al enviar el formulario
  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // comprobar todos los campos
    if (!this.validateService.validateRegister(user)) {
      console.log('empty fields');
      return false;
    }

    // comprobar estructura de email
    if (!this.validateService.validateEmail(user.email)) {
      console.log('wrong email');
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if ((data as any).success) {
        console.log('register ok');
        this.router.navigate(['/login']);
      } else {
        console.log('something wrong');
        this.router.navigate(['/register']);
      }
    });

  }
}
