// basic variables
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth; 
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name : "stick",
        power : 5
    },
    {
        name : "dagger",
        power : 30
    },
    {
        name : "claw hammer",
        power : 50
    },
    {
        name : "sword",
        power : 100
    }
];

const monsters = [
    {
        name : "slime",
        level : 2,
        health : 15
    },
    {
        name : "fanged beast",
        level : 8,
        health : 60
    },
    {
        name : "dragon",
        level : 20,
        health : 300
    }
];

const locations = [
    {
        name : "Town Square",
        "button text" : ["Go to Store","Go to Cave","Fight Dragon"],
        "button functions" : [goStore,goCave,fightDragon],
        text : "Your are in the town square. You see a sign that says Adventure Oddities"
    },
    {
        name : "Adventure Oddities",
        "button text" : ["Buy 10 health (10 gold)","Buy weapon (30 gold)","Go to town square"],
        "button functions" : [buyHealth,buyWeapon,goTown],
        text: "You enter the store"
    },
    {
        name : "cave",
        "button text" : ["Fight Slime","Fight Fanged Beast","Go to town square"],
        "button functions" : [fightSlime,fightBeast,goTown],
        text: "You enter the cave , you see some monsters"
    },
    {
        name : "kill monster",
        "button text" : ["Attack","Dodge","Run"],
        "button functions" : [attack,dodge,run],
        text: "what do you do ?"
    },
    {
        name : "defeated monster",
        "button text" : ["Go to Town Square","Go to Town Square","Go to Town Square"],
        "button functions" : [goTown,goTown,goTown],
        text: "As the monster dies its esscene becomes gold and you gain experience"
    },
    {
        name : "lose",
        "button text" : ["Restart ?","Restart ?","Restart ?"],
        "button functions" : [restart,restart,restart],
        text: "you die ."
    },
    {
        name : "win",
        "button text" : ["REPLAY ?","REPLAY ?","REPLAY ?"],
        "button functions" : [restart,restart,restart],
        text: "You have defeated the dragon! YOU WIN THE GAME!"
    }
];

// initialising buttons

button1.onclick = goStore;
button2.onclick = goCave; 
button3.onclick = fightDragon;

// functions
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0]; 
    button2.innerText = location["button text"][1]; 
    button3.innerText = location["button text"][2]; 
    button1.onclick = location["button functions"][0]; 
    button2.onclick = location["button functions"][1]; 
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown() {
    console.log("Going to Store");
    update(locations[0]);
}

function goStore() {
    console.log("Going to Store");
    update(locations[1]);
}

function goCave() {
    console.log("Going to Cave");
    update(locations[2]);
}

function buyHealth() {
        if (gold >= 10){
            gold = gold - 10;
            health = health + 10;
            goldText.innerText = gold;
            healthText.innerText = health;
        }
        else{
            text.innerText = "Not Enough Gold !!!";
        }
}

function buyWeapon() {
    
    if(currentWeapon < weapons.length - 1){
        if(gold >= 30){
            gold-= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a new weapon ! , its a "+newWeapon;
            inventory.push(newWeapon);
            text.innerText += "In your inventory you have : " + inventory;
        }
        else{
            text.innerText = "Not Enough Gold !!!";
        }
    }
    else{
        text.innerText = "You already have the most powerful weapon !";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a" + currentWeapon;
        text.innerText += "In you inventory you have : " + inventory;
    }
    else{
        text.innerText = "Don't sell yer only weapon !!!";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    console.log("monster choosen action pending");
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    console.log("fighting monster");
    text.innerText = "The "+ monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your "+weapons[currentWeapon].name;
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp) +1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0) {
        console.log("you died");
        lose();
    }
    else if(monsterHealth <= 0){
        console.log("you killed the monster");
        (fighting == 2)? winGame() : defeatMonster();
    }
}

function dodge() {
    console.log("Attack dodged");
    text.innerText ="You dodge the attack from the "+monsters[fighting].name+".";
}

function run() {
    console.log("running away");
    text.innerText = "You run away in fear ...";
    update(locations[0]);
}

function defeatMonster(){
    console.log("Monster defeated");
    gold += Math.floor(monsters[fighting].level *6.7);
    xp += monsters[fighting].level;
    console.log(xp);
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    console.log("no game");
    update(locations[5]);
}

function winGame() {
    console.log("yes game");
    update(locations[6]);
}

function restart() {
    console.log("playin again");
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}