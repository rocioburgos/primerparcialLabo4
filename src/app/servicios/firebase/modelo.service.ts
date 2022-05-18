import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private filePath: any;
  //private dowloadURL: Observable<string>;

  private path = '/peliculas';
 
  itemsCollection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;

  constructor(public afs: AngularFirestore,private storage: AngularFireStorage ) {
    this.itemsCollection = afs.collection<any>('peliculas');

    this.items = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as any;
        return data;
      });
    }));
  }


  addItem(item: any) {
    return this.itemsCollection.add(JSON.parse(JSON.stringify(item)));
  }

  traerTodos() {
    return this.items;
  }

  subirImagenYPelicula(imagen: any, pelicula: any){
    this.subirImagen(imagen, pelicula);
  }

  guardarPeliculaConFoto(pelicula: any, nombreURL :any){
    pelicula.URLfoto=nombreURL;
    // console.log(pelicula);
    return this.itemsCollection.add(JSON.parse(JSON.stringify(pelicula)));
  }

  subirImagen(imagen: any, pelicula: any) {
    this.filePath = `images/${imagen.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    task.snapshotChanges().pipe(finalize(()=>{
      fileRef.getDownloadURL().subscribe(urlImagen =>{
       // this.dowloadURL = urlImagen;
        // console.log('URL_IMAGEN', urlImagen);
        this.guardarPeliculaConFoto(pelicula, urlImagen);
      })
    })).subscribe();
  }


  //MODIFICAR
  updateItem(){}
  
  
  //Eliminar 
  deleteItem(){
    
  }
}
