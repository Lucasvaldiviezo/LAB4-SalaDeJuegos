import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  getChat(){
    return this.firestore.collection('Chat').valueChanges();
  }

  addToChat(chat:any)
  {
    this.firestore.collection('Chat').add(chat);
  }

}