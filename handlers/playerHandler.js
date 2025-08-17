import { Player } from "../gameClasses/player.js";

export function createPlayer(msg) {
  return new Player(msg.socket, msg.data.name);
}
