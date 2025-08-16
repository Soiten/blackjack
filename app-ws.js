import { WebSocketServer } from "ws";
import { Game } from "./gameClasses/game.js";
import { Player } from "./gameClasses/player.js";

const players = [];
const games = [];

export default function criarServidor(servidorHTTP) {
  const servidor = new WebSocketServer({ server: servidorHTTP });
  console.log("servidor ws criado");

  servidor.on("connection", function connection(socket) {
    //adiciona instantaneamente ao se conectar
    players.push(socket);

    socket.on("message", function message(data) {
      //handle messages

      let msg = data.toString();
      console.log(msg);

      try {
        msg = JSON.parse(msg);

        if (msg.action) {
          if (msg.action == "pedir") socket.send(JSON.stringify({ naipe: "copas", valor: 1 }));
        } else if (msg.join);
        else if (msg.updateCash);
      } catch (err) {
        //geralmente vai ser pq não é um json :)
        socket.send("Erro na solicitação do cliente");
      }
    });

    socket.on("close", () => {
      console.log("se desconectaram...");
      //handle disconnect
    });

    //mensagem inicial
    socket.send("Versão 0.1 do servidor!");
  });

  return servidor;
}
