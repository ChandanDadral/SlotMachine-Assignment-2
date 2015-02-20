/**
* Author: Chandan Dadral
* Last Modified Date: February 21, 2015
* Last Modified By: Chandan Dadral
* 
* Description: This program creates the Slot Machine which allows the user to Choose their bet and Gives $1000 to user 
* Shows the images in reels and images are random and user can reset the game as well. It has a sound Effects as well and user has the opportunity to win jackpot.
**/

//All Variables are defined on the top 
var canvas;
var stage: createjs.Stage;

// Game Objects 
var game: createjs.Container;
var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
var bet10: createjs.Bitmap;
var betOne: createjs.Bitmap;
var betMax: createjs.Bitmap;
var exitButton: createjs.Bitmap;
var betText: createjs.Text;
var winningsText: createjs.Text;
var playerAmountText: createjs.Text;
var winRatioText: createjs.Text;
var jackpotImg: createjs.Bitmap;
var tiles: createjs.Bitmap[] = [];
var reelContainers: createjs.Container[] = [];

//Preloaded the Sound and gave seperate Id to each and Every sound
createjs.Sound.registerSound({ id: "click", src: "assets/sounds/click.mp3" });
createjs.Sound.registerSound({ id: "hover", src: "assets/sounds/hover.mp3" });
createjs.Sound.registerSound({ id: "won", src: "assets/sounds/won.mp3" });
createjs.Sound.registerSound({ id: "spin", src: "assets/sounds/spin.mp3" });
createjs.Sound.registerSound({ id: "jackpot", src: "assets/sounds/jackpot.mp3" });



// Game Variables
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;


/* Tally Variables */
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var crown = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

//This Function initialize the Game 
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

//This mEthod updates the Stage
function gameLoop() {

    stage.update(); // Refreshes our stage
}


/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    crown = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;


}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
    showPlayerStats();

    winRatioText.text = winnings.toString();
    winningsText.text = winnings.toString();
    betText.text = playerBet.toString();
    //Removes Jackpot Bitmap from the top of the SlotMachine
    game.removeChild(jackpotImg);
    createjs.Sound.play("click");
}


// Event handlers for Hover on the Bitmap Objects when user hovers it decreases the Opacity 
// It also gives the good sound Effect

function spinButtonOut() {
    spinButton.alpha = 1.0;
}

function spinButtonOver() {

    spinButton.alpha = 0.5;
    createjs.Sound.play("hover");
}
function resetButtonOut() {
    resetButton.alpha = 1.0;
}

function resetButtonOver() {

    resetButton.alpha = 0.5;
    createjs.Sound.play("hover");

}
function exitButtonOut() {
    exitButton.alpha = 1.0;
}

function exitButtonOver() {

    exitButton.alpha = 0.8;
    createjs.Sound.play("hover");

}
function betMaxButtonOut() {
    betMax.alpha = 1.0;
}

function betMaxButtonOver() {

    betMax.alpha = 0.5;
    createjs.Sound.play("hover");

}
function betOneButtonOut() {
    betOne.alpha = 1.0;
}

function betOneButtonOver() {

    betOne.alpha = 0.5;
    createjs.Sound.play("hover");

}
function bet10ButtonOut() {
    bet10.alpha = 1.0;
}

function bet10ButtonOver() {

    bet10.alpha = 0.5;
    createjs.Sound.play("hover");
}

//This funtion Exits the Tab when user Clicks the Exit Button
function exitButtonClick() {
    var x = confirm('Are you sure want to exit. Do not forget to CashOut');
    if (x) window.close();
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    winningsText.text = winnings.toString();
    resetFruitTally();
    checkJackPot();

    //Gives Sound of Cheering when User wins 
    createjs.Sound.play("won");

}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    winningsText.text = "0";
    resetFruitTally();
}

//Funtion Spins the Slot Machine and Shows the Apporoprate Images 

function spinReels() {

    createjs.Sound.play("spin");
    game.removeChild(jackpotImg);
    if (playerBet != 0) {
        if (playerMoney == 0) {
            if (confirm("You ran out of Money! \nDo you want to play again?")) {
                resetAll();
                showPlayerStats();
            }
        }
        else if (playerBet > playerMoney) {

            alert("You don't have enough Money to place that bet.");

        }

        else if (playerBet <= playerMoney) {

            // Add Spin Reels code here
            spinResult = Reels();
            fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
            console.log(fruits);

            //get the respecive images for the spin results
            for (var tile = 0; tile < 3; tile++) {

                reelContainers[tile].removeAllChildren();

                tiles[tile] = new createjs.Bitmap("assets/images/" + spinResult[tile] + ".png");
                //Co-ordinates of the spin Images
                tiles[tile].x = 110 + (113 * tile);
                tiles[tile].y = 239;


                reelContainers[tile].addChild(tiles[tile]);

                console.log(game.getNumChildren());
            }
            determineWinnings(); //checks Player Lost or Won 
            showPlayerStats();//Displays the Player Results
        }
    }
    //Shows Error Message when player didn't selected the bet Amount
    else {
        alert("Please enter a bet amount");
    }
}
//Functions for the BEtButton Clicked

//IF user Selects the bet to be 1 
function bet1() {
    playerBet = 1;
    betText.text = playerBet.toString();

    //Gives sound Effect aswell
    createjs.Sound.play("click");

} //function bet1 ends

//If Players sets bet to be 10
function betTen() {
    playerBet = 10;
    betText.text = playerBet.toString();

    createjs.Sound.play("click");
} //function bet10 ends

//if Player sets the bet to be 100
function bet100() {
    playerBet = 100;
    betText.text = playerBet.toString();

    createjs.Sound.play("click");
} //function bet100 ends

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "crown";
                crown++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "seven";
                sevens++;
                break;
        }
    }
    return betLine;
}


/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (crown == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (crown == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else {
            winnings = playerBet * 1;
        }

        if (sevens == 1) {
            winnings = playerBet * 5;
        }
        winNumber++;
        showWinMessage();
        // showWinMessage();
    }
    else {
        lossNumber++;

        showLossMessage();
    }

}

/**
This Function Creates the User interface and Shows the Buttons of Appropriate Positions
**/
function createUI(): void {
    // instantiate my background
    background = new createjs.Bitmap("assets/images/backGround22.png");
    game.addChild(background);

    // Spin Button
    spinButton = new createjs.Bitmap("assets/images/spin_Button.png");
    spinButton.x = 368;
    spinButton.y = 422;
    game.addChild(spinButton);
    //Spins Button Evet Handlers
    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", spinButtonOver);
    spinButton.addEventListener("mouseout", spinButtonOut);

    //Reset Button which Resets the Game to Original State
    resetButton = new createjs.Bitmap("assets/images/reset_button.png");
    resetButton.x = 95;
    resetButton.y = 423;
    game.addChild(resetButton);

    resetButton.addEventListener("click", resetAll);
    resetButton.addEventListener("mouseover", resetButtonOver);
    resetButton.addEventListener("mouseout", resetButtonOut);

    //Maximum Bet Button for the user 
    betMax = new createjs.Bitmap("assets/images/bet_max.png");
    betMax.x = 300;
    betMax.y = 430;
    game.addChild(betMax);

    betMax.addEventListener("click", bet100);
    betMax.addEventListener("mouseover", betMaxButtonOver);
    betMax.addEventListener("mouseout", betMaxButtonOut);

    //Minimum BEt for the USer button
    betOne = new createjs.Bitmap("assets/images/bet_one.png");
    betOne.x = 190;
    betOne.y = 430;
    game.addChild(betOne);

    betOne.addEventListener("click", bet1);
    betOne.addEventListener("mouseover", betOneButtonOver);
    betOne.addEventListener("mouseout", betOneButtonOut);

    //User can Bet 10 Aswell 
    bet10 = new createjs.Bitmap("assets/images/bet_10.png");
    bet10.x = 246;
    bet10.y = 430;
    game.addChild(bet10);

    bet10.addEventListener("click", betTen);
    bet10.addEventListener("mouseover", bet10ButtonOver);
    bet10.addEventListener("mouseout", bet10ButtonOut);

    //Exit Button Bitmap
    exitButton = new createjs.Bitmap("assets/images/exoit_button.png");
    exitButton.x = 406;
    exitButton.y = 125;
    game.addChild(exitButton);

    //Events for the Exit Button
    exitButton.addEventListener("click", exitButtonClick);
    exitButton.addEventListener("mouseover", exitButtonOver);
    exitButton.addEventListener("mouseout", exitButtonOut);

    playerAmountText = new createjs.Text(playerMoney.toString(), "30px Consolas", "#F00909");
    playerAmountText.x = 99;
    playerAmountText.y = 345;
    game.addChild(playerAmountText);

    winRatioText = new createjs.Text(winNumber.toString(), "30px Consolas", "#F00909");
    winRatioText.x = 220;
    winRatioText.y = 345;
    game.addChild(winRatioText);


    winningsText = new createjs.Text(winnings.toString(), "30px Consolas", "#F00909");
    winningsText.x = 276;
    winningsText.y = 345;
    game.addChild(winningsText);

    betText = new createjs.Text(playerBet.toString(), "30px Consolas", "#F00909");
    betText.x = 355;
    betText.y = 345;
    game.addChild(betText);

    //Jackpot image on the top if user won the Jackpot
    jackpotImg = new createjs.Bitmap("assets/images/jackpot.png");

}



/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        game.addChild(jackpotImg);
        jackpotImg.x = 71;
        jackpotImg.y = 78;
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
        //Sound if User won the Jackpot
        createjs.Sound.play("jackpot");
    }
}

/* Utility function to show Player Stats */
function showPlayerStats() {

    winRatio = winNumber / turn;

    winRatioText.text = winNumber.toString();

    playerAmountText.text = playerMoney.toString();
}

// Our Game Kicks off in here
function main() {

    // instantiate my game container
    game = new createjs.Container();
    game.x = 23;
    game.y = 6;

    // Create Slotmachine User Interface
    createUI();
    stage.addChild(game);

    for (var i = 0; i < 3; i++) {
        reelContainers[i] = new createjs.Container();
        game.addChild(reelContainers[i]);
    }
}