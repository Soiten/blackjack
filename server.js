import http from "http";
import app from "./app.js";
import appWs from "./app-ws.js";

const servidorHTTP = http.createServer(app);

appWs(servidorHTTP);

servidorHTTP.listen(3000, () => {
  console.log("servidor http rodando na porta 3000");
});
