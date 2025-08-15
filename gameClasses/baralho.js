export class Baralho {
  constructor() {
    this.reset();
  }

  reset() {
    this._cards = [];
    for (let naipe of ["copas", "paus", "ouros", "espadas"]) {
      for (let valor = 1; valor <= 13; valor++) {
        this._cards.push({ valor, naipe });
      }
    }
  }

  get size() {
    return this._cards.length;
  }

  takeRandom() {
    const index = Math.floor(Math.random() * this.size);
    const card = this._cards.splice(index, 1)[0];
    return card;
  }
}
