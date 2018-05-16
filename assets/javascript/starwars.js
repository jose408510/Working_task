$(document).ready(function(){

var characters = {
    "Obi-Wan Kenobi":{
        name:"Obi-Wan Kenobi",
        health: 150,
        attack: 30,
        imageUrl: "assets/images/obi-wan.jpg",
        EnemyAttackBack: 15
},
    "Luke skywalker":{
        name:"Luke Skywalker",
        health: 200,
        attack: 50,
        imageUrl: "assets/images/luke-skywalker.jpg",
        EnemyAttackBack: 10
}, 
    "Darth sidious":{
        name:"Dark Sidious",
        health: 70,
        attack: 25,
        imageUrl: "assets/images/darth-sidious.png",
        EnemyAttackBack: 50
},
    "Darth Maul":{
        name:"Darth Maul",
        health: 100,
        attack: 10,
        imageUrl: "assets/images/darth-maul.jpg",
        EnemyAttackBack: 25
    }
}

  // Will be populated when the player selects a character.
  var attacker;
  // Populated with all the characters the player didn't select.
  var combatants = [];
  // Will be populated when the player chooses an opponent.
  var defender;
  // Will keep track of turns during combat. Used for calculating player damage.
  var turnCounter = 1;
  // Tracks number of defeated opponents.
  var killCount = 0;



  var renderCharacter = function(character, renderArea) {
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<div class='character' data-name='" + character.name + "'>");
    var charHealth = $("<div class='character' data-name='" + character.name + "'>");





  }








});