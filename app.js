function start() {
  // Create Dino Constructor
  function Dinosaur(dino) {
    this.species = dino.species;
    this.weight = dino.weight;
    this.height = dino.height;
    this.diet = dino.diet;
    this.where = dino.where;
    this.when = dino.when;
    this.fact = dino.fact;
  }

  // Create Dino data (easier from online resource then local)
  function getDinosaurData() {
    return fetch(
      "https://raw.githubusercontent.com/udacity/Javascript/master/dino.json"
    ).then((res) => {
      return res.json();
    });
  }

  function createDinos(data) {
    let dinosaurs = data.map((dino) => new Dinosaur(dino));
    return dinosaurs;
  }

  getDinosaurData().then((data) => {
    let dinos = createDinos(data.Dinos);

    // get grid html element, where dinos should be shown
    const mainGrid = document.getElementById("grid");

    let humanObj = {
      species: "Human",
      where: "All over",
      when: "Now",
      fact: "Only 2% of Humans Have Green Eyes.",
    };

    // user constructor function to also create human object
    let human = new Dinosaur(humanObj);

    // Use IIFE to get human data from form
    (function (human) {
      human.image = "images/human.png";
      human.name = document.getElementById("name").value;
      human.weight = document.getElementById("weight").value;
      human.diet = document.getElementById("diet").value;
      human.height =
        +document.getElementById("feet").value * 12 +
        +document.getElementById("inches").value;
    })(human);

    // shuffle order of array before adding human in the middle
    const dinosShuffled = dinos.sort((a, b) => 0.5 - Math.random());
    dinosShuffled.splice(4, 0, human);

    // process array elements one by one
    dinosShuffled.forEach((dino) => {
      // add image url
      dino.image = `images/${dino.species}.png`;

      // randomly assign a fact
      let decider = Math.floor(Math.random() * 4);

      if (decider == 1) {
        let weightComp = Math.round(dino.weight / human.weight);
        dino.compare = `The ${dino.species} is ${weightComp} times heavier than you.`;
      } else if (decider == 2) {
        let heightComp = Math.round(dino.weight / human.weight);
        dino.compare = `The ${dino.species} is ${heightComp} times taller than you.`;
      } else if (decider == 3) {
        dino.compare = `The ${dino.species} lived in ${dino.where}.`;
      } else {
        if (dino.diet == human.diet) {
          dino.compare = `The ${dino.species} and you are both a ${dino.diet}.`;
        } else {
          dino.compare = `The ${dino.species} is a ${dino.diet}, whereas you are a ${human.diet}.`;
        }
      }

      // Generate Tiles for each Dino in Array
      var newDiv = document.createElement("div");
      // class grid-item will insure correct display
      newDiv.className = "grid-item";
      if (dino.species == "Human") {
        newDiv.innerHTML = `<h3>${human.name}</h3><img src="${dino.image}" alt="Italian Trulli">`;
      } else if (dino.species == "Pigeon") {
        newDiv.innerHTML = `<h3>${dino.species}</h3><p>All birds are dinosaurs!</p><img src="${dino.image}" alt="Italian Trulli">`;
      } else {
        newDiv.innerHTML = `<h3>${dino.species}</h3><p>${dino.compare}</p><img src="${dino.image}" alt="Italian Trulli">`;
      }
      // Add tiles to DOM
      mainGrid.appendChild(newDiv);
    });
  });

  // Remove form from screen
  const formSection = document.getElementById("dino-compare");
  formSection.style.display = "none";
}

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", start);
