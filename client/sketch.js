let ws;

function setup() {
  createCanvas(400, 400);
  ws = new WebSocket("ws://localhost:3000");
  ws.onopen = () => {
    console.log("entrei!!");
  };
  ws.onmessage = (ev) => {
    console.log(ev.data);
  };
}

function draw() {
  background(220);
}

function mouseClicked() {
  if (mouseX > width / 2) {
    ws.send(JSON.stringify({ action: "pedir" }));
  }
}
