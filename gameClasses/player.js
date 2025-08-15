export class Player {
  constructor() {
    this.mao = [];
    this.dinheiro = 500;
    this.dinheiroApostado = 0;
  }

  join() {
    this.dinheiro -= this.dinheiroApostado;
  }

  lose() {
    this.dinheiroApostado = 0;
  }

  win() {
    this.dinheiro += this.dinheiroApostado * 2;
    this.dinheiroApostado = 0;
  }

  double() {
    this.dinheiro -= this.dinheiroApostado;
    this.dinheiroApostado *= 2;
  }

  addCard(card) {
    this.mao.push(card);
  }

  clearHand() {
    this.mao = [];
  }
}
