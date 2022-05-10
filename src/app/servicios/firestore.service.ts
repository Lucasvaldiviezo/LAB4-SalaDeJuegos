import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  getCollection(coleccion:any){
    return this.firestore.collection(coleccion).valueChanges();
  }

  addToChat(chat:any)
  {
    this.firestore.collection('Chat').add(chat);
  }
  actualizarColeccionCompleta(coleccion:any,datos:any)
  {
    //ESTO NECESITO PARA QUE FUNCIONE EL PUNTAJE
  }
  addScore(coleccion:any,puntaje:any)
  {
    let idDocument:string =puntaje.posicion.toString();
    console.log(idDocument);
    this.firestore.collection(coleccion).doc(idDocument).set({
      posicion: puntaje.posicion,
      puntaje: puntaje.puntaje,
      usuario: puntaje.usuario,
    });
  }

}