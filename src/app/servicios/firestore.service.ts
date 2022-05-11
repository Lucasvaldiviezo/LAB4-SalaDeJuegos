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
    for(let i = 0; i < datos.length; i++)
    {
      console.log("ENTRE AL ACTUALIZAR COMPLETO");
      let idDocument:string =datos[i].posicion.toString();
      console.log(idDocument);
      this.firestore.collection(coleccion).doc(idDocument).set({
        posicion: datos[i].posicion,
        puntaje: datos[i].puntaje,
        usuario: datos[i].usuario,
      });
    } 
  }
  
  addScore(coleccion:any,puntaje:any)
  {
    let idDocument:string =puntaje.posicion.toString();
    this.firestore.collection(coleccion).doc(idDocument).set({
      posicion: puntaje.posicion,
      puntaje: puntaje.puntaje,
      usuario: puntaje.usuario,
    });
  }

}