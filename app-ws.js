import { WebSocketServer } from "ws";
import { createGame, listGames, startGame } from "./handlers/gameHandler.js";
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
        msg.games = games;
        msg.players = connections;

        switch (msg.type) {
          case "getGamelist":
            listGames(msg);
            break;

          case "createPlayer":
            createPlayer(msg);
            break;

          case "hostGame":
            createGame(msg);
            break;

          case "startGame":
            startGame(msg);
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
