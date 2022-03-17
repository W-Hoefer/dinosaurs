// Dino data
function dinoData() {
    const dinosaurs = [
        {
            "species": "Triceratops",
            "weight": 13000,
            "diet": "herbavor",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "diet": "carnivor",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "diet": "herbavor",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "diet": "herbavor",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "diet": "herbavor",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "diet": "carnivor",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "diet": "carnivor",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "diet": "herbavor",
            "fact": "All birds are living dinosaurs."
        }
    ]
    return dinosaurs;
}

// Constructors
class Dino {
    constructor (species, weight, diet, fact) {
        this.species = species;
        this.weight = weight;
        this.diet = diet;
        this.fact = fact;
    }  
}

class Human {
    constructor (species, weight, diet, fact) {
        this.species = species;
        this.weight = weight;
        this.diet = diet;
        this.fact = fact;
    }  
}

// Comparison functions
function compSpecies (species, humanSpecies) {
    return (species === humanSpecies) ? "Sue your parents for naming you like a dinosaur :D"
        : (species < humanSpecies) ? "Your name appears first in the dictionary."
        : "Your name appears after the dino's name in the dictionary";
}

function compWeight (weight, humanWeight) {
    return (weight - humanWeight === 0) ? "You both have the same weight."
        : (weight - humanWeight > 0) ? "The dino is heavier than you."
        : "This dino is lighter than you.";
}

function compDiet (diet, humanDiet) {
    return (diet === humanDiet) ? `This dino is a ${diet}, just like you.`
        : `In contrast to you, this dino is a ${diet}.`;
}

// Choose random attribute to compare
function comparison (weight, humanWeight, species, humanSpecies, diet, humanDiet) {
    const num = (Math.floor(Math.random() * (2 - 0 + 1)) + 0);
    return (num === 0) ? compWeight(weight, humanWeight) 
        : (num === 1) ? compSpecies(species, humanSpecies) : compDiet(diet, humanDiet);
}

// Create dinos
let dinos;
let human;
function createDinos() {
    dinos = dinoData();
    dinos.forEach (() => {
        new Dino(dinos.species, dinos.weight, dinos.diet, dinos.fact)
    });

// Create human (must be an IIFE)
    human = (function () {
        const name = document.getElementById('name').value;
        const weight = document.getElementById('weight').value;
        const diet = document.getElementById('diet').value.toLowerCase();
        return new Human(name, weight, diet);
    })();

// Put human in the middle of the grid
    dinos.splice(4, 0, human);
}

// Build grid
function grid() {
    dinos.forEach((dino, i) => {
        const grid = document.getElementById('grid');
        const div = document.createElement('div');
        div.classList.add('grid-item');
        grid.appendChild(div);
        const name = document.createElement('h4');
        name.innerHTML = dino.species;
        div.appendChild(name);

// Prepare facts and change image and fact for human and pigeon
        const image = document.createElement('img');
        image.setAttribute('src', `/images/${dino.species.toLowerCase()}.png`);
        div.appendChild(image);
        const fact = document.createElement('p');
        div.appendChild(fact);
        fact.innerHTML = comparison(dino.species, human.species, dino.weight, human.weight, dino.diet, human.diet);
        if (i === 4) { image.setAttribute('src', `/images/human.png`); fact.innerHTML = "You!"; }
        if (i === 8) { image.setAttribute('src', `/images/pigeon.png`); fact.innerHTML = "All birds are Dinosaurs."; }   
    });
}

// Clear menu and call follow-up functions
function compare() {
    document.getElementById('dino-compare').style.display = "none";
    createDinos();
    grid();
}

// Starts comparison on button click
document.getElementById('btn').addEventListener('click', compare);