import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
  buscador:string='';
  datosBuscados:any[]=[];
  datos: any;
  paises = [];
  listadoPaises: any[] = [];
  datosFirebase:any[]=[];
  private imagen: any; 
  pathImagen: string='';

  constructor(private gitSrv: GithubService, private paisesService: ApipaisesService, private modeloSrv:ModeloService ) { 
   
  }

  ngOnInit() {
    this.gitSrv.traerTodo().then((data) => {
      this.datos = data;
      console.info(this.datos);
    });

    this.paisesService.traerEuropa().subscribe((paises) => {
      this.listadoPaises = JSON.parse(JSON.stringify(paises));
      console.log(this.paises);
    });

    this.modeloSrv.traerTodos().subscribe((dato)=>{
      console.log(dato); 
      this.datosFirebase= dato;
    })

  }

  //PARA TESTEAR INSERT A FIREBASE 
  guardarBD() {
   // this.modeloSrv.subirImagen(this.imagen, {titulo: this.title, URLfoto:''} );
    this.modeloSrv.addItem( {titulo: this.title, imagen:this.pathImagen});
  }

  actualizar(id:string){
    this.modeloSrv.updateItem({id: id, titulo: this.title});
  }

  borrar(id:string){
    this.modeloSrv.deleteItem(id);
  }


  buscarUno(){
    this.modeloSrv.traeUnoBusqueda(this.buscador).subscribe((res)=>{
      this.datosBuscados= res;
    })
  }

  async onUpload(foto: any) {
      this.modeloSrv.onUpload(foto).then((res)=>{
        this.pathImagen= res; 
    });
     
  }

}