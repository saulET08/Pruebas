import { Component, OnInit } from '@angular/core';
import { Cursos } from '../../models/cursos';
import { CursosService } from '../../services/cursos.service'
import { Global } from '../../services/global';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  providers: [CursosService]
})
export class CursosComponent implements OnInit {

  constructor(
    private _cursosService: CursosService
  ) {}

  ngOnInit() {
    this.getCursos;
  }
  getCursos(){
    this._cursosService.getCursos().subscribe(
      response => {
        console.log(response);
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
}
