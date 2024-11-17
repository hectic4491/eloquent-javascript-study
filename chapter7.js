// Chapter 7: Project: A Robot


/* 
Here is our village of Meadowfield. It consist of 11 places
with 14 roads between them. Each element of the 'roads' array is a string
that describes two nodes, seperated by a hyphen. i.e. two places and the
road that connects them.

We can think of the places as nodes and the roads as edges of a graph.
*/

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];


// This turns the array into a graph data structure.

function buildGraph(edges) {
  // This creates a new object called graph with no prototype.
  // It's effectively a pure dictionary
  let graph = Object.create(null);

  // This function creates the edges between two nodes.
  function addEdge(from, to) {
    /* 
    If the 'from' node already exists in the graph, add the 'to' 
    node to its list of connected nodes.
    */
    if (from in graph) {
    graph[from].push(to);
    } 
    /*
    Else, if the 'from' node does not exist yet, create a new array
    with the 'to' node as its first element.
    */
    else {
    graph[from] = [to];
    }
  }

  // Parsing and adding edges.
  /*
  Converts each edge string into an array of two nodes.
  The for...of loop iterates over these arrays.
  For each pair of nodes, we add an edge going both directions.
  */
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  /* 
  Return the constructed graph, which is an object where elements
  look like: 
  {
  node1: [node2, node5, ...],
  ...
  nodeN: [node3, node1, ...]
  }
   */
  return graph;
}

const roadGraph = buildGraph(roads);

// The Task

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.adress);
      return new VillageState(destination, parcels);
    }
  }
}

//... ((Maybe continue this chapter some other time.))