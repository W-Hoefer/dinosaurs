function dinoData() {
    const dinos = [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": 372,
            "diet": "herbavor",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "fact": "All birds are living dinosaurs."
        }
    ]
    return dinos;
}
// Constructors
class Dino {
    constructor (species, weight, height, diet, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.fact = fact;
    }  
}
class Human {
    constructor (species, weight, height, diet, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.fact = fact;
    }  
}
// Comparison functions
function compHeight (height, humanHeight) {
        return (Math.round(height / humanHeight) === 1) ? `You both have the same height.`
           : (Math.round(height / humanHeight) > 1) 
           ? `The dino is ${(Math.round(height - humanHeight))} inches taller than you.`
           : `This dino is ${(Math.round(humanHeight - height))} inches smaller than you.`;
}
function compWeight (weight, humanWeight) {
        return (Math.round(weight / humanWeight) === 1) ? `You both have the same weight.`
           : (Math.round(weight / humanWeight) > 1) 
           ? `The dino is ${(Math.round(weight - humanWeight))} lbs heavier than you.`
           : `This dino is ${(Math.round(humanWeight - weight))} lbs lighter than you.`;
}
function compDiet (diet, humanDiet) {
        return (diet === humanDiet) ? `This dino is a ${diet}, just like you.`
           : `In contrast to you, this dino is a ${diet}.`;
}
// Choose random attribute to compare
function comparison (weight, humanWeight, height, humanHeight, diet, humanDiet) {
    const num = (Math.floor(Math.random() * (2 - 0 + 1)) + 0);
    return (num === 0) ? compWeight(weight, humanWeight) 
        : (num === 1) ? compHeight(height, humanHeight) : compDiet(diet, humanDiet);
}
// Populate screen when clear
function populate() {
    let dinos = dinoData();
    dinos.forEach (function() {new Dino(dinos.species, dinos.weight, dinos.height, dinos.diet, dinos.fact)});
    const human = (function () {
        const name = document.getElementById('name').value;
        const height = document.getElementById('feet').value * 12 + document.getElementById('inches').value;
        const weight = document.getElementById('weight').value;
        const diet = document.getElementById('diet').value.toLowerCase();
        return new Human(name, height, weight, diet);
    })();
    dinos.splice(4, 0, human);
    dinos.forEach((dino, i) => {
        const grid = document.getElementById('grid');
        const div = document.createElement('div');
        const name = document.createElement('h4');
        const image = document.createElement('img');
        const fact = document.createElement('p');
        if (i === 4) {
            image.setAttribute('src', `/images/human.png`);
            fact.innerHTML = "You!";
        } else if (i === 8) { 
            image.setAttribute('src', `/images/${dino.species.toLowerCase()}.png`);
            fact.innerHTML = "All birds are Dinosaurs."
        } else {
            image.setAttribute('src', `/images/${dino.species.toLowerCase()}.png`);
            fact.innerHTML = comparison(dino.weight, human.weight, dino.height, human.height, dino.diet, human.diet);
        }
        name.innerHTML = dino.species;
        div.classList.add('grid-item');
        div.appendChild(name);
        div.appendChild(fact);
        div.appendChild(image);
        grid.appendChild(div);
    });
}
// Clear menu and call to populate next screen
function compare() {
    document.getElementById('dino-compare').style.display = "none";
    populate();
}
// Event listener
document.getElementById('btn').addEventListener('click', compare);