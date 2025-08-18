import { Game } from "../gameClasses/game.js";

export function listGames(msg) {
  const games = msg.array.map((g) => {
    return { players: g.players.length, admin: g.admin.name };
  });
  msg.socket.send(JSON.stringify({ type: "gamesList", data: { list: games } }));
}

export function createGame(msg) {
  //ver se o caba ja ta em um jogo primeiro

  //criar novo jogo
  const game = new Game([msg.player]);
  msg.array.push(game);

  //enviar infos pro cliente
  msg.socket.send(JSON.stringify({ type: "gameCreated", data: { id: game.id } }));
}

export function startGame() {}

export function joinGame() {}

export function leaveGame() {}

export function delGame() {}
