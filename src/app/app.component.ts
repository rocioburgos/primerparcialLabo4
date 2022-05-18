import { Component, OnInit } from '@angular/core';
import { ApipaisesService } from './servicios/api/apipaises.service';
import { GithubService } from './servicios/api/github.service';
import { ModeloService } from './servicios/firebase/modelo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'primerParcial2022';
  datos: any;
  paises = [];
  listadoPaises: any[] = [];
  constructor(private gitSrv: GithubService, private paisesService: ApipaisesService, private modeloSrv:ModeloService) { }

  ngOnInit() {
    this.gitSrv.traerTodo().then((data) => {
      this.datos = data;
      console.info(this.datos);
    });

    this.paisesService.traerEuropa().subscribe((paises) => {
      this.listadoPaises = JSON.parse(JSON.stringify(paises));
      console.log(this.paises);
    });

    

  }

  //PARA TESTEAR INSERT A FIREBASE 
  guardarBD() {
    this.modeloSrv.addItem( {titulo: this.title});
  }
}