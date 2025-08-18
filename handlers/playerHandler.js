import { Player } from "../gameClasses/player.js";

export function createPlayer(msg) {
  const player = new Player(msg.socket, msg.data.name);
  msg.array.push(msg.socket);

  msg.socket.send(JSON.stringify({ type: "playerCreated", data: { id: player.id } }));
}
