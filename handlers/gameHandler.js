import { Game } from "../gameClasses/game.js";

export function listGames(msg) {
  const games = msg.games.map((g) => {
    return { players: g.players.length, admin: g.admin.name };
  });
  msg.socket.send(JSON.stringify({ type: "gamesList", data: { list: games } }));
}

export function createGame(msg) {
  const player = msg.players.find((p) => p.connection == msg.socket);

  //ver se o caba ja ta em um jogo primeiro

  //criar novo jogo
  const game = new Game([player]);
  msg.games.push(game);

  //enviar infos pro cliente
  msg.socket.send(JSON.stringify({ type: "gameCreated", data: { id: game.id } }));
}

export function startGame(msg) {
  const game = msg.games.find((g) => g.id == msg.data.id);

  if (game.admin.connection != msg.socket) return;

  //começa e avisa
  game.start();
  game.players.forEach((p) => p.connection.send(JSON.stringify({ type: "gameStarted", state: game.state })));
}

export function joinGame() {}

export function leaveGame() {}

export function delGame() {}
