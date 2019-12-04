import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  // si el algun campo en el formulario esta vacio
  validateRegister(user: { name: any; email: any; username: any; password: any; }) {
    if (user.name === undefined    ||
       user.email === undefined    ||
       user.username === undefined ||
       user.password === undefined) {
         return false;
    } else {
      return true;
    }
  }

  // valida que el email sea "example@domain.com"
  validateEmail(email) {
    // tslint:disable-next-line: max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }




}
