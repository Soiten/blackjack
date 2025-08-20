import { Game } from "../gameClasses/game.js";

export function listGames(msg) {
  const games = msg.games.map((g) => {
    return { players: g.players.length, admin: g.admin.name, id: g.id };
  });
  msg.socket.send(JSON.stringify({ type: "gamesList", data: { list: games } }));
}

export function createGame(msg) {
  const player = msg.players.find((p) => p.connection == msg.socket);
  if (!player) return;

  //ver se o caba ja ta em um jogo primeiro
  if (player.emJogo) return;

  //criar novo jogo
  const game = new Game([player]);
  msg.games.push(game);

  //enviar infos pro cliente
  msg.socket.send(JSON.stringify({ type: "gameCreated", data: { id: game.id } }));
}

export function startGame(msg) {
  const game = msg.games.find((g) => g.id == msg.data.id);

  if (game.admin.connection != msg.socket) return;

  //começa e avisa a todos
  game.start();
  game.players.forEach((p) => p.connection.send(JSON.stringify({ type: "gameStarted", state: game.state })));
}

export function joinGame(msg) {
  const player = msg.players.find((p) => p.connection == msg.socket);
  if (!player) return;

  //se ja tiver em jogo
  if (player.emJogo) return;

  //acha o jogo
  const game = msg.games.find((g) => g.id == msg.data.id);
  if (!game) return;

  //avisa os outros
  game.players.forEach((p) =>
    p.connection.send(JSON.stringify({ type: "playerJoined", data: { player: player.gameInfo } }))
  );

  //add
  game.addPlayer(player);
  msg.socket.send(JSON.stringify({ type: "gameJoined", data: { id: game.id, state: game.state } }));
}

export function leaveGame() {}

export function delGame() {}
