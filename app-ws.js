import { WebSocketServer } from "ws";
import { createGame, listGames } from "./handlers/gameHandler.js";
import { createPlayer } from "./handlers/playerHandler.js";

const connections = [];
const games = [];

export default function criarServidor(servidorHTTP) {
  const servidor = new WebSocketServer({ server: servidorHTTP });
  console.log("servidor ws criado");

  servidor.on("connection", function connection(socket) {
    socket.on("message", function message(data) {
      let msg = data.toString();
      console.log(msg);

      try {
        msg = JSON.parse(msg);
        msg.socket = socket;

        switch (msg.type) {
          case "getGamelist":
            msg.array = games;
            listGames(msg);
            break;

          case "createPlayer":
            msg.array = connections;
            createPlayer(msg);
            break;

          case "hostGame":
            msg.array = games;
            msg.player = connections.find((p) => p.connection == socket);
            createGame(msg);
            break;

          case "startGame":
            break;
        }
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
