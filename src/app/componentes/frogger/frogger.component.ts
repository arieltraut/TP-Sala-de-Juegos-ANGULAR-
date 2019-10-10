import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-frogger',
  templateUrl: './frogger.component.html',
  styleUrls: ['./frogger.component.css']
})
export class FroggerComponent implements OnInit {

  listadoDeFrases = [
    { 'frase': 'Hasta la vista, baby', 'pelicula': 'Terminator', 'opciones': ['Robocop', 'Terminator', 'Rambo'] },
    { 'frase': 'May the Force be with you', 'pelicula': 'Star Wars', 'opciones': ['Star Trek', 'Starship Troopers', 'Star Wars'] },
    { 'frase': 'Say what again, I dare you!', 'pelicula': 'Pulp Fiction', 'opciones': ['Pulp Fiction', 'Reservoir Dogs', 'Inglorious Bastards'] },
    // tslint:disable-next-line: max-line-length
    { 'frase': 'I\'m going to make him an offer he can\'t refuse', 'pelicula': 'The Godfather', 'opciones': ['Taxi Driver', 'The Godfather', 'The Sopranos'] },
    { 'frase': 'You can\'t handle the truth!', 'pelicula': 'A Few Good Men', 'opciones': ['A Few Good Men', 'Reservoir Dogs', 'Inglorious Bastards'] },
    { 'frase': 'You\'re gonna need a bigger boat', 'pelicula': 'Jaws', 'opciones': ['Jaws', 'Reservoir Dogs', 'Inglorious Bastards'] }
  ];

  repetidor: any;
  tiempo: number;
  respuesta: string;
  fraseRandom: any = {};
  respondiendo = false;
  ganador = false;
  perdedor = false;
  contador: number;
  termina = false;


  constructor(public firebaseService: FirebaseService ) {}

  ngOnInit() {
  }

  juegoNuevo() {
    this.respondiendo = true;
    this.perdedor = false;
    this.termina = false;
    this.ganador = false;
    this.fraseRandom = this.listadoDeFrases[Math.floor(Math.random() * this.listadoDeFrases.length)];
    this.respuesta = this.fraseRandom.pelicula;
    this.tiempo = this.fraseRandom.frase.length;
    console.log('tiempo total es: ' + this.tiempo);
    this.repetidor = setInterval(() => {
      this.tiempo--;
      console.log('Tiempo transcurrido:', this.tiempo);
      if (this.tiempo <= 0 ) {
        clearInterval(this.repetidor);
        this.terminar();
      }
      }, 400);
  }

  responder(guess: string) {
    this.contador++;
    this.tiempo = 0;
    this.respondiendo = false;
    if (this.respuesta.toLowerCase() == guess.toLowerCase()) {
      this.ganador = true;
      this.perdedor = false;
      this.loadResult();
    } else {
        this.perdedor = true;
    }
  }


  terminar() {
    this.respondiendo = false;
    this.termina = true;
    this.tiempo = 0;
  }

  loadResult() {
    this.firebaseService.addResult('CinemaQuotes', 1, true)
      .then(result => {
        console.log('insert result');
      });
  }


}
