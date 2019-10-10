import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';

import {Subscription} from 'rxjs';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  private subscription: Subscription;
  Mensajes: string;

  ngOnInit() {
  }

   constructor() {
     this.ocultarVerificar = true;
     this.Tiempo = 5;
     this.NuevoJuego();
    // this.nuevoJuego = new JuegoAgilidad();
    console.info(this.nuevoJuego );
    console.info('Inicio agilidad');
  }

  NuevoJuego() {
    this.ocultarVerificar = false;
    this.repetidor = setInterval(() => {

      this.Tiempo--;
      console.log('Contador', this.Tiempo);
      if (this.Tiempo == 0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar = true;
        this.Tiempo = 15;
        this.enviarJuego.emit(this.nuevoJuego);
      }
      }, 900);
      this.nuevoJuego = new JuegoAgilidad();
      console.info(this.nuevoJuego );
      console.info('Nuevos Valores');

  }

  verificar() {
    // this.ocultarVerificar=false;
    // clearInterval(this.repetidor);

    if (this.nuevoJuego.verificar()) {
      this.ocultarVerificar = true;
      this.nuevoJuego.gano = true;
      this.enviarJuego.emit(this.nuevoJuego);
      clearInterval(this.repetidor);
      this.MostarMensaje('PERFECTO' , true);
    } else {
      this.MostarMensaje('ERROR' , false);
    }
  }

  MostarMensaje(mensaje: string= 'este es el mensaje', ganador: boolean) {
    this.Mensajes = mensaje;
    const x = document.getElementById('snackbar');
    if (ganador) {
        x.className = 'show Ganador';
      } else {
        x.className = 'show Perdedor';
      }
    const modelo = this;

    setTimeout(function() {
      x.className = x.className.replace('show', '');
     }, 3000);

   }

}
