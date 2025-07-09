class Network {
  constructor() {
    this.nodes = {};
    this.inputs = {};
    this.outputs = [];
  }

  node(nodeID) {
    return this.nodes[nodeID];
  }

  printTruthTable() {
    // TODO
  }

  static objectToNN(o) {
    let nn = new Network();
    for (const { id, bias, x, y } of o.nodes) {
      nn.nodes[id] = new Node(x, y, bias);
    }
    for (const { src, dest, weight } of o.connections) {
      const srcNode = nn.node(src);
      const destNode = nn.node(dest);
      srcNode.connectWith(destNode, weight);
    }
    for (const [id, activation] of Object.entries(o.inputs)) {
      const node = nn.node(id);
      node.setActivation(activation);
    }
    for (const [id, node] of Object.entries(nn.nodes)) {
      if (node.isOutputNode()) {
        let { x: nx, y: ny } = node.location;
        //alert("output node " +node + ": "+ nx + " " + ny);
        let pseudoNode = new Node(nx+50, ny, 0);
        pseudoNode.radius = 0
        node.connectWith(pseudoNode, 1, false);
      }
    }
    return nn;
  }
}
