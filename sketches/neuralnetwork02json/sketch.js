let nn;
let buttonAnimate;
let exampleSelector;

let scaling = 0.9;
let originalHeight = 400;
let scaleFactor;

let defaultBsp = 3

function setup() {
  createCanvas(windowHeight, windowHeight);

  buttonAnimate = createButton("Animation an/aus");
  buttonAnimate.on = true;
  buttonAnimate.mousePressed((_) => (buttonAnimate.on = !buttonAnimate.on));

  exampleSelector = createSelect();
  for (let ex of NN_EXAMPLES) {
    exampleSelector.option(ex.name);
  }
  exampleSelector.changed(selectionChanged);
  selectionChanged();

  // DAS KLAPPT IM P5JS-Editor leider bisher nicht
  let params = getURLParams();
  let bsp =
    params.hasOwnProperty("bsp") && !isNaN(Number(params.bsp))
      ? Number(params.bsp)
      : defaultBsp;

  changeNN("Beispiel " + bsp); // setzt ein bestimmtes Bsp als Start
}

function selectionChanged() {
  let item = exampleSelector.value();
  changeNN(item);
}

function changeNN(item) {
  nnDefinition = NN_EXAMPLES.find((net) => net.name === item);
  if (nnDefinition === undefined) selectionChanged();
  nn = Network.objectToNN(nnDefinition);
}

function draw() {
  scaleWindow();
  background(255);

  text(
    "Klicke die Input-Neuronen auf der linken Seite an! Was passiert?",
    20,
    50
  );
  for (const id in nn.nodes) {
    const node = nn.nodes[id];
    for (const con of node.successorCons) {
      con.show();
    }
    node.show();
  }
  text("Welche logische Schaltung simuliert dieses neuronale Netz?", 20, 350);
}

function mousePressed() {
  for (const node of Object.values(nn.nodes)) {
    if (node.isUnderMouse()) {
      node.toggleActivation();
    }
  }
}

function scaleWindow() {
  resizeCanvas(scaling * windowHeight, scaling * windowHeight);
  scaleFactor = (scaling * windowHeight) / originalHeight;
  scale(scaleFactor, scaleFactor);
}
