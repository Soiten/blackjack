import { Player } from "../gameClasses/player.js";

export function createPlayer(msg) {
  // tem que ter um nome e so pode um jogador por conexao
  if (!msg.data.name) return;
  if (msg.players.find((p) => p.connection == msg.socket)) return;

  const player = new Player(msg.socket, msg.data.name);
  msg.players.push(player);

  msg.socket.send(JSON.stringify({ type: "playerCreated", data: { id: player.id } }));
}
