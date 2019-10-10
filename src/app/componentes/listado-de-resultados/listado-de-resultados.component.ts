import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
  listado2: Array<any>;
  @Input()   listado: Array<any>;
  isLoading = false;
  constructor(public firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.obtenerResultados();
  }

  obtenerResultados() {
    this.isLoading = true;
    this.firebaseService.getResults()
      .then(result => {
        this.isLoading = false;
        console.log(result);
        this.listado2 = result;
      });
  }

}
