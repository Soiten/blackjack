let server;
let ui;

function setup() {
  createCanvas(400, 400);
  server = connectToServer();
  ui = setupUI();
  ui.reset();
}

//MARK: Draw loop
function draw() {
  switch (ui.tela) {
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

//MARK: Server & protocols
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
          ui.gamesList = getGames();
          break;

        case "gameCreated":
          localStorage.setItem("currentGame", msg.data.id);
          mudarTela("jogo");
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

//MARK: UI things
function setupUI() {
  textSize(14);

  const ui = {
    inputs: {},
    buttons: {},
    gamesList: [],
    tela: "inicio",
    myName: undefined,
    money: undefined,

    addButton: function (name, button) {
      this.buttons[name] = button;
    },
    getButton: function (name) {
      return this.buttons[name];
    },
    addInput: function (name, input) {
      this.inputs[name] = input;
    },
    getInput: function (name) {
      return this.inputs[name];
    },
    clear: function () {
      for (let b of Object.values(this.buttons)) {
        b.hide();
      }
      for (let i of Object.values(this.inputs)) {
        i.hide();
      }
    },
    reset: function () {
      mudarTela(this.tela);
    },
  };

  const name = createInput();
  name.position(200, 200);
  name.elt.placeholder = "Seu nome";

  const confirm = createButton("Confirmar");
  confirm.position(200, 220);
  confirm.mouseClicked(() => {
    const nome = name.value();
    server.json({ type: "createPlayer", data: { name: nome } });
    mudarTela("lista jogos");
  });

  const atualizarLista = createButton("Atualizar");
  atualizarLista.position(20, 30);
  atualizarLista.mouseClicked(() => {
    getGames();
  });

  const hospedar = createButton("Hospedar Jogo");
  hospedar.mouseClicked(() => {
    server.json({ type: "hostGame" });
  });
  hospedar.position(20, height - 30);

  ui.addInput("name", name);
  ui.addButton("confirm name", confirm);
  ui.addButton("refresh games", atualizarLista);
  ui.addButton("host game", hospedar);

  return ui;
}

//MARK: Misc

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

function mudarTela(tela) {
  if (!ui) return;
  ui.tela = tela;
  ui.clear();

  switch (tela) {
    case "inicio":
      ui.getInput("name").show();
      ui.getButton("confirm name").show();
      break;

    case "lista jogos":
      ui.getButton("refresh games").show();
      ui.getButton("host game").show();
      break;

    case "jogo":
      break;
  }
}
