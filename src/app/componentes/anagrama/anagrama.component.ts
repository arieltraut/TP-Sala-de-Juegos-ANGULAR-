import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  [x: string]: any;

  score;
  intentos: number;
  answer;
  letters = [];
  seconds = 60;
  letterAnimation = 0;
  timerPromise;
  correctWord = '';
  words = ['MESA', 'PAN', 'MANZANA', 'FRUTILLA', 'MOTO', 'ROJO', 'VERDE',
    'PERA', 'PAISES', 'ABIERTO', 'PAGAR', 'BIEN', 'PEPINO', 'DINERO',
    'PAZ', 'AMOR', 'TIEMPO', 'AMIGOS', 'GATO', 'FLORES', 'VIDRIO', 'PASTO'];

  constructor(public firebaseService: FirebaseService) { } // public firebaseService: FirebaseService

  ngOnInit() {
    this.initGame();
  }

  initGame() {
    if (this.score > 0) {
      this.loadResult();
    }
    this.seconds = 60;
    this.score = 0;
    this.answer = '';
    this.displayWord();
    this.contador();
  }

  isLetterVisible = () => {
    return this.letterAnimation === 1;
  }

  isLetterHiding = () => {
    return this.letterAnimation === 2;
  }

  isCorrectLetter = () => {
    return this.letterAnimation === 3;
  }

  validateWord = () => {
    if (this.seconds > 0) {
      if (this.answer.toUpperCase() === this.correctWord) {
        this.score += 1;
        this.letterAnimation = 3;
        this.timerPromise = setTimeout(this.displayWord, 1000);
      }
    } else {
      console.info('Timeout!');
    }
  }


  nextWord = () => {
    this.answer = ' ';
    this.letterAnimation = 2;
    this.timerPromise = setTimeout(this.displayWord, 1000);
  }


  displayWord = () => {
    this.answer = '';
    const wordIndex = Math.floor(Math.random() * this.words.length);
    this.correctWord = this.words[wordIndex];
    this.letters = this.correctWord.split('');
    this.getRandomIndexes();
    this.timerPromise = setTimeout(() => { this.letterAnimation = 1; }, 100);
  }

  getRandomIndexes = () => {
    let randomIndex;
    let size = this.letters.length;
    let temp;
    while (size > 0) {
      randomIndex = Math.floor(Math.random() * size--);
      temp = this.letters[size];
      this.letters[size] = this.letters[randomIndex];
      this.letters[randomIndex] = temp;
    }
  }

  contador() {
    setTimeout(() => {
      if (this.seconds > 0) {
        this.seconds--;
      }
      this.contador();
    }, 1000);
  }

  loadResult() {
    this.firebaseService.addResult('Anagrama', this.score, true)
      .then(result => {
        console.log('insert result');
      });
  }

}
