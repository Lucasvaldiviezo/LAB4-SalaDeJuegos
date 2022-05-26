import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestoreService/firestore.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageRef:any;
  imagesItems:any;
  constructor(public storage:Storage,public firestore:FirestoreService) { 
    this.obtenerImagenes("fotosDePerfil");
  }

  async subirImagenStorage(nombre:string,imgBase64:any,carpeta:string){
    try{
      this.storageRef = ref(this.storage,carpeta+nombre);
      let respuesta = await uploadBytes(this.storageRef,imgBase64)
        return await getDownloadURL(respuesta.ref)
    }catch(error){
      console.log(error);
      return null;
    }
    
  }

  obtenerImagenes(carpeta:string){
    this.storageRef = ref(this.storage, carpeta);
    listAll(this.storageRef)
    .then(async response=>{
      this.imagesItems = response.items;
    })
    .catch(error=>console.log(error));
  }

}
