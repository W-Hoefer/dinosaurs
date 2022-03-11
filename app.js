// Import JSON Data
async function getData() {
    const jsonData = await fetch("./dino.json");
    const data = await jsonData.json();
    return data.Dinos;
}
// Dino Constructor
class Dino {
    constructor(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }  
}
// Human Constructor
class Human {
    constructor(species, height, weight, diet) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
    }
}
// Compare height
function compareHeight(dinoHeight, humanHeight) {
    const heightRatio = Math.round(dinoHeight / humanHeight);
    return (heightRatio === 1) ? `You have the same height.`
           : (heightRatio > 1) ? `This dino is about ${heightRatio} times taller than you.`
           : `This dino is smaller than you.`;
}
// Compare weight
function compareWeight(dinoWeight, humanWeight) {
    const weightRatio = Math.round(dinoWeight / humanWeight);
    return (weightRatio === 1) ? `You have the same weight.`
           : (weightRatio > 1) ? `This dino is about ${weightRatio} times heavier than you.`
           : `This dino is lighter than you.`;
}
// Compare diet
function compareDiet(dinoDiet, humanDiet) {
    return (dinoDiet === humanDiet) ? `This dino is a ${dinoDiet}, just like you.`
           : `In contrast to you, this dino is a ${dinoDiet}.`;
}
// Generate random fact
function generateRandomInt(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}
function randomFact(dinoWeight, humanWeight, dinoHeight, humanHeight, dinoDiet, humanDiet, dinoWhen ) {
    switch (generateRandomInt(1, 4)) {
        case 1: return compareWeight(dinoWeight, humanWeight);
        case 2: return compareHeight(dinoHeight, humanHeight);
        case 3: return compareDiet(dinoDiet, humanDiet);
        default: return `The dino lived during the ${dinoWhen} time.`;
    }
}
// Compare dinos to human
function compare() {
    document.getElementById('dino-compare').style.display = "none";
    const grid = document.getElementById('grid');
    getData().then(res => {
        let dinos = res.map(dino => new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact));
        const human = (function () {
            const humanName = document.getElementById('name').value;
            const humanHeight = Number(document.getElementById('feet').value) * 12 + Number(document.getElementById('inches').value);
            const humanWeight = Number(document.getElementById('weight').value);
            const humanDiet = document.getElementById('diet').value;
            return new Human(humanName, humanHeight, humanWeight, humanDiet.toLowerCase());
        })();
        dinos.splice(4, 0, human);
        dinos.forEach((dino, index) => {
            const tile = document.createElement('div');
            const name = document.createElement('h4');
            const image = document.createElement('img');
            const fact = document.createElement('p');
            if (dino.species === "Pigeon") {
                image.setAttribute('src', `/images/${dino.species.toLowerCase()}.png`);
                fact.innerHTML = "All birds are Dinosaurs."
            } else if (index === 4) { 
                image.setAttribute('src', `/images/human.png`);
                fact.innerHTML = "You!";
            } else {
                image.setAttribute('src', `/images/${dino.species.toLowerCase()}.png`);
                fact.innerHTML = randomFact(dino.weight, human.weight, dino.height, human.height, dino.diet, human.diet, dino.when);
            }
            name.innerHTML = dino.species;
            tile.classList.add('grid-item');
            tile.appendChild(name);
            tile.appendChild(fact);
            tile.appendChild(image);
            grid.appendChild(tile);
        });
    })
}
document.getElementById('btn').addEventListener('click', compare);