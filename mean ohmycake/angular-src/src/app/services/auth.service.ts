import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient) { }

  // peticion al servidor para acceder a la ruta y enviar el usuario
  registerUser(user) {
    return this.http.post('http://localhost:3000/users/register', user, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

    // peticion al servidor para acceder a la ruta y enviar el usuario
  authenticateUser(user) {
    return this.http.post('http://localhost:3000/users/authenticate', user, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

    // peticion al servidor para acceder a la ruta y recibir el usuario
    getProfile() {
      let headers: HttpHeaders = new HttpHeaders();
      this.loadToken();
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', this.authToken);
      return this.http.get('http://localhost:3000/users/profile', { headers
      });
    }

    loadToken() {
      const token = localStorage.getItem('id_token');
      this.authToken = token;
    }

    loggedIn() {
      // si no existe el token en el navegador regresa false
      if (localStorage.getItem('id_token') === undefined ) {
       return false;
      } else {
        // sesion iniciada
      const helper = new JwtHelperService();
      return !helper.isTokenExpired(localStorage.id_token);
      }
     }

  // guarda los datos en el navegador
  saveSessionUser(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // elimna los datos
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
