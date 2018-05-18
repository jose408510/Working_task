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
    var charImage = $("<img alt='Image' class='character-image'>").attr(character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
  };

  var initializeGame = function()   {
    for(var key in characters){
    renderCharacter(characters[key], "#characters-section");
    }
};
    initializeGame();
    // debugger;    
  // This function handles updating the selected player or the current defender. If there is no selected player/defender this
  // function will also place the character based on the areaRender chosen (e.g. #selected-character or #defender)
    var updateCharacter = function(charObj, areaRender){
            // First we empty the area so that we can re-render the new object
        // $(areaRender).emepty();
        renderCharacter(charObj, areaRender);
    };
  // This function will render the available-to-attack enemies. This should be run once after a character has been selected
    var renderEnemies  = function(enemyArr){
        for(var i = 0; i < enemyArr; i++);{
            renderCharacter(enemyArr[i], "#available-to-attack-section");
        }
    };
    var renderMessage = function(message){
        var gameMessageSet = $('#game-message');
        var newMessage = $("<div>").text(message);
    gameMessageSet.append(newMessage);
    }
 
    var restartGame = function(resultMessage){

        var result = $('<button>result</button>').click(function(){
            location.reload();

            var gameState = $("<div>").text(resultMessage);

            $("body").append(gameState);
            $("body").append(restart);
        })
        var gameState = $("<div>").text(resultMessage);

        $("body").append(gameState);
        $("body").append(restart);
    }

    var clearMessage = function() {
        var gameMessage = $("#game-message");
    
        gameMessage.text("");
      };

  // On click event for selecting our character.
  $("#characters-section").on("click", ".character", function() {
    // Saving the clicked character's name.
    var name = $(this).attr("data-name");

    // If a player character has not yet been chosen...
    if (!attacker) {
      // We populate attacker with the selected character's information.
      attacker = characters[name];
      // We then loop through the remaining characters and push them to the combatants array.
      for (var key in characters) {
        if (key !== name) {
          combatants.push(characters[key]);
        }
      }

      // Hide the character select div.
      $("#characters-section").hide();

      // Then render our selected character and our combatants.
      updateCharacter(attacker, "#selected-character");
      renderEnemies(combatants);
    }
  });

  // Creates an on click event for each enemy.
  $("#available-to-attack-section").on("click", ".character", function() {
    // Saving the opponent's name.
    var name = $(this).attr("data-name");

    // If there is no defender, the clicked enemy will become the defender.
    if ($("#defender").children().length === 0) {
      defender = characters[name];
      updateCharacter(defender, "#defender");

      // remove element as it will now be a new defender
      $(this).remove();
      clearMessage();
    }
  });

  // When you click the attack button, run the following game logic...
  $("#attack-button").on("click", function() {
    // If there is a defender, combat will occur.
    if ($("#defender").children().length !== 0) {
      // Creates messages for our attack and our opponents counter attack.
      var attackMessage = "You attacked " + defender.name + " for " + attacker.attack * turnCounter + " damage.";
      var counterAttackMessage = defender.name + " attacked you back for " + defender.enemyAttackBack + " damage.";
      clearMessage();

      // Reduce defender's health by your attack value.
      defender.health -= attacker.attack * turnCounter;

      // If the enemy still has health..
      if (defender.health > 0) {
        // Render the enemy's updated character card.
        updateCharacter(defender, "#defender");

        // Render the combat messages.
        renderMessage(attackMessage);
        renderMessage(counterAttackMessage);

        // Reduce your health by the opponent's attack value.
        attacker.health -= defender.enemyAttackBack;

        // Render the player's updated character card.
        updateCharacter(attacker, "#selected-character");

        // If you have less than zero health the game ends.
        // We call the restartGame function to allow the user to restart the game and play again.
        if (attacker.health <= 0) {
          clearMessage();
          restartGame("You have been defeated...GAME OVER!!!");
          $("#attack-button").off("click");
        }
      }
      else {
        // If the enemy has less than zero health they are defeated.
        // Remove your opponent's character card.
        $("#defender").empty();

        var gameStateMessage = "You have defeated " + defender.name + ", you can choose to fight another enemy.";
        renderMessage(gameStateMessage);

        // Increment your kill count.
        killCount++;

        // If you have killed all of your opponents you win.
        // Call the restartGame function to allow the user to restart the game and play again.
        if (killCount >= combatants.length) {
          clearMessage();
          $("#attack-button").off("click");
          restartGame("You Won!!!! GAME OVER!!!");
        }
      }
      // Increment turn counter. This is used for determining how much damage the player does.
      turnCounter++;
    }
    else {
      // If there is no defender, render an error message.
      clearMessage();
      renderMessage("No enemy here.");
    }
  });
});

