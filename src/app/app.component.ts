import { Component } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalaDeJuegos';
  //items: Observable<any[]>;
  /*constructor(firestore: AngularFireStore)
  {
    this.items= firestore.collection('Usuarios').valueChanges();
  }*/
}
