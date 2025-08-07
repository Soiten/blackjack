import { WebSocketServer } from "ws";

export default function criarServidor(servidorHTTP) {
  const servidor = new WebSocketServer({ server: servidorHTTP });

  servidor.on("connection", function connection(socket) {
    socket.on("message", function message(data) {
      socket.send(`Server received: ${data.toString()}`);
    });

    socket.on("close", () => {
      console.log("se desconectaram");
    });

    socket.send("Welcome to the WebSocket server!");
  });

  return servidor;
}
