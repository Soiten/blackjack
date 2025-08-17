import { Baralho } from "./baralho.js";
import newId from "../utils/IdGenerator.js";

export class Game {
  constructor(players = []) {
    this.admin = players[0];
    this.players = players;
    this.currentPlayer = 0;
    this.maoCasa = [];
    this.baralho = new Baralho();
    this.jaJogaram = 0;
    this.id = newId();
  }

  setAdmin(id) {
    this.admin = this.players.find((p) => p.id == id);
  }

  start() {
    //duas cartas pra casa
    this.maoCasa.push(this.baralho.takeRandom());
    this.maoCasa.push(this.baralho.takeRandom());

    //duas cartas pros players
    for (let p of this.players) {
      p.addCard(this.baralho.takeRandom());
      p.addCard(this.baralho.takeRandom());
    }

    //escolhe quem inicia aleatoriamente
    this.currentPlayer = Math.floor(Math.random() * this.players.length);

    //começa o timer
  }

  callRound(acao) {
    const player = this.players[this.currentPlayer];

    //ele tem que escolher a ação dele
    switch (acao) {
      case "pedir":
        player.addCard(this.baralho.takeRandom());
        this._checkPlayerLoss();
        break;

      case "parar":
        this._vezDoProximo();
        break;

      case "double":
        player.addCard(this.baralho.takeRandom());
        player.double();
        this._checkPlayerLoss();
        break;
    }
  }

  _checkPlayerLoss(player) {
    if (valorDaMao(player.mao) > 21) {
      player.lose();
      this._vezDoProximo();
    }
  }

  _vezDoProximo() {
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    this.jaJogaram++;
  }
}
