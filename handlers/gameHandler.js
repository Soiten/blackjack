import { Game } from "../gameClasses/game.js";

export function createGame(host, gamesArray) {
  const game = new Game([host]);
  gamesArray.push(game);
}

export function startGame() {}

export function joinGame() {}

export function delGame() {}
