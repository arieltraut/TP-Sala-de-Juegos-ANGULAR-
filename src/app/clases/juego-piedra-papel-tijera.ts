import { Juego } from './juego';


export class JuegoPiedraPapelTijera extends Juego {
  public seleccionUsuario = 'default';
  public seleccionPc;
  public contadorJugadas = 0;
  public puntosJugador = 0;
  public puntosPc = 0;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('Piedra, Papel o tijera', gano, jugador);
  }

  public verificar() {

    if (this.puntosJugador == 3 || this.puntosPc == 3) {
        if (this.puntosJugador > this.puntosPc) {
            this.gano = true;
          }
          return true;

    } else {
        return false;
    }


 }



private Elegir() {
   const seleccion = Math.round(Math.random() * 10 );
   console.log(seleccion);
   if (seleccion >= 0 && seleccion <= 3) {
     this.seleccionPc = 'piedra';
   }
   if (seleccion >= 4 && seleccion <= 6) {
     this.seleccionPc = 'papel';
   }
   if (seleccion >= 7 && seleccion <= 10) {
     this.seleccionPc = 'tijera';
   }
}

public Jugar(seleccionUsuario: string) {
    this.seleccionUsuario = seleccionUsuario;
    this.contadorJugadas++;
  this.Elegir();


    switch (seleccionUsuario) {
      case 'piedra':

      if (this.seleccionPc == 'papel') {
        this.puntosPc++;
      }

      if (this.seleccionPc == 'tijera') {
        this.puntosJugador++;
      }
      break;

      case 'papel':

      if (this.seleccionPc == 'tijera') {
        this.puntosPc++;
      }

      if (this.seleccionPc == 'piedra') {
        this.puntosJugador++;
      }
      break;

      case 'tijera':

      if (this.seleccionPc == 'piedra') {
        this.puntosPc++;
      }

      if (this.seleccionPc == 'papel') {
        this.puntosJugador++;
      }
      break;

    }

}
}
