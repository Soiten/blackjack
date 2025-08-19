let server;
let ui;
let tela;

function setup() {
  createCanvas(400, 400);
  tela = "inicio";
  server = connectToServer();
  ui = setupUI();
}

function draw() {
  switch (tela) {
    case "inicio":
      background(220);
      break;

    case "lista jogos":
      background("#187bb8ff");
      text("aqui eh a lista dos jogos bacanina", 10, 20);
      showGamelist();
      break;

    case "jogo":
      background("#179b10ff");
      text("aeee voce ta no jogo que criou :)", 10, 20);
      break;
  }
}

// function mouseClicked() {
//   if (mouseX > width / 2) {
//     server.json({type:"createPlayer"})
//   }
// }

function connectToServer() {
  const server = new WebSocket("ws://localhost:3000");
  server.onopen = () => {
    console.log("entrei!!");
  };
  server.onmessage = (ev) => {
    console.log(ev.data);

    try {
      const msg = JSON.parse(ev.data);

      switch (msg.type) {
        case "playerCreated":
          localStorage.setItem("myId", msg.data.id);
          tela = "lista jogos";
          ui.gamesList = getGames();
          break;

        case "gameCreated":
          localStorage.setItem("currentGame", msg.data.id);
          tela = "jogo";
          break;

        case "gamesList":
          ui.gamesList = msg.data.list;
          break;
      }
    } catch (err) {
      console.log("se lascou patrao");
    }
  };

  server.json = function (obj) {
    server.send(JSON.stringify(obj));
  };

  return server;
}

//MARK: FIX: change from arry to obj
function setupUI() {
  textSize(20);

  const ui = { inputs: [], buttons: [], gamesList: [] };

  const i1 = createInput();
  i1.position(200, 200);
  i1.elt.placeholder = "Seu nome";
  ui.inputs.push(i1);

  const confirm = createButton("Confirmar");
  confirm.position(200, 220);

  const atualizarLista = createButton("Atualizar");
  atualizarLista.position(20, 30);
  atualizarLista.mouseClicked(() => {
    getGames();
  });
  atualizarLista.hide();

  const hospedar = createButton("Hospedar Jogo");
  hospedar.mouseClicked(() => {
    server.json({ type: "hostGame" });
    atualizarLista.hide();
    hospedar.hide();
  });
  hospedar.position(20, height - 30);
  hospedar.hide();

  confirm.mouseClicked(() => {
    const nome = i1.value();
    server.json({ type: "createPlayer", data: { name: nome } });
    confirm.hide();
    i1.hide();
    atualizarLista.show();
    hospedar.show();
  });

  ui.buttons.push(hospedar);
  ui.buttons.push(atualizarLista);
  ui.buttons.push(confirm);

  return ui;
}

function showGamelist() {
  let y = 50;
  try {
    for (let game of ui.gamesList) {
      rect(30, y, width - 60, 40);
      text(game.admin, 30 + 5, y + 20);
      text(game.players, width - 30 - 15, y + 20);
      y += 40;
    }
  } catch (err) {
    console.log(err);
    text("procurando jogos...", 10, 20);
  }
}

function getGames() {
  server.json({ type: "getGamelist" });
}
