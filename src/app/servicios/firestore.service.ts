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

}