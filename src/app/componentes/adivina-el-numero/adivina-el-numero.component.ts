import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
 @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  puntaje = 0;

  constructor(public firebaseService: FirebaseService) {
    this.nuevoJuego = new JuegoAdivina();
    console.info('numero Secreto:', this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar = false;
  }
  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.contador = 0;
  }
  verificar() {

    this.contador++;
    this.ocultarVerificar = true;
    console.info('numero Secreto:', this.nuevoJuego.gano);
    if (this.nuevoJuego.verificar()) {

      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje('Sos un Genio!!!', true);
      this.nuevoJuego.numeroSecreto = 0;
      this.puntaje++;
      this.loadResult();

    } else {

      let mensaje: string;
      switch (this.contador) {
        case 1:
          mensaje = 'No, intento fallido, animo';
          break;
          case 2:
          mensaje = 'No,Te estaras Acercando???';
          break;
          case 3:
          mensaje = 'No es, Yo crei que la tercera era la vencida.';
          break;
          case 4:
          mensaje = 'No era el  ' + this.nuevoJuego.numeroIngresado;
          break;
          case 5:
          mensaje = ' intentos y nada.';
          break;
          case 6:
          mensaje = 'Afortunado en el amor';
          break;

        default:
            mensaje = 'Ya le erraste ' + this.contador + ' veces';
          break;
      }
      this.MostarMensaje('#' + this.contador + ' ' + mensaje + ' ayuda :' + this.nuevoJuego.retornarAyuda());


    }
    console.info('numero Secreto:', this.nuevoJuego.gano);
  }

  MostarMensaje(mensaje: string= 'este es el mensaje', ganador: boolean= false) {
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
      modelo.ocultarVerificar = false;
     }, 3000);
    console.info('objeto', x);

   }
  ngOnInit() {
  }

  loadResult() {
    this.firebaseService.addResult('AdivinaElNumero', this.puntaje, (this.puntaje > 0))
      .then(result => {
        console.log('insert result');
      });
  }

}
