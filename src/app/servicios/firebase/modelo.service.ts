import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
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
  uploadPercent: any;
  pathImagen: string='';

  itemsCollection: AngularFirestoreCollection<any>;
  private bookDoc: any; //: AngularFirestoreDocument<BookInterface>;
  public items: Observable<any[]>;

  constructor(public afs: AngularFirestore, private storage: AngularFireStorage,
  ) {
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

  //MODIFICAR
  updateItem(book: any): void {
    let idBook = book.id;
    this.bookDoc = this.afs.doc<any>(`peliculas/${idBook}`);
    this.bookDoc.update(book);
  }

  //Eliminar 
  deleteItem(id: string) {

    this.bookDoc = this.afs.doc<any>(`peliculas/${id}`);
    this.bookDoc.delete();
  }

  traerTodos() {
    return this.itemsCollection.valueChanges({ idField: "doc_id" });
  }

  traeUnoBusqueda(titulo: string) {
    return this.afs.collection('peliculas', ref => ref.where('titulo', '==', titulo))
      .valueChanges({ idField: "doc_id" })
  }

  
  async onUpload(foto: any) {
    console.log(foto.target.files[0]);

    //id unico
    const id: string = Math.random().toString(36).substring(2);
    const file = foto.target.files[0];
    const filePath = 'upload/' + id;
    const ref = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

    // upload image, save url
    await task;
    console.log('Image uploaded!');
    this.pathImagen = await ref.getDownloadURL().toPromise();
   // console.log("link imagen: " + this.pathImagen)
     return this.pathImagen;
  }


}
