import express from "express";

const app = express();
app.use(express.json());
//remover no deploy
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/utils/test.html");
});

export default app;
