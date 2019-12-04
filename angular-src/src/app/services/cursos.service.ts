import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cursos } from '../models/cursos';
import { Observable} from 'rxjs/Observable'
import { Global } from './global'

@Injectable()
export class CursosService{
    public url:string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }
    testService(){
        return 'Probando el servicio'
    }
    getCursos(): Observable<any>{
        let headers = new HttpHeaders().set('Content-type','application/json');

        return this._http.get(this.url+'cursos',{headers: headers});
    }
}