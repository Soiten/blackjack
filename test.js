import WebSocket from "ws";

const socket = new WebSocket("ws://localhost:3000");

socket.on("open", () => {
  console.log("Conectado ao servidor!");
  socket.send(JSON.stringify({ type: "createPlayer", data: { name: "joaozin" } }));
  socket.send(JSON.stringify({ type: "hostGame" }));
  socket.send(JSON.stringify({ type: "getGamelist" }));
});

socket.on("message", (data) => {
  console.log("Mensagem recebida do servidor:", data.toString());
});

socket.on("close", () => {
  console.log("Conexão encerrada.");
});

socket.on("error", (err) => {
  console.error("Erro:", err);
});
