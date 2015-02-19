﻿var canvas;
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

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

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
       
    }
    else {
        lossNumber++;

       
    }

}

function createUI(): void {
    // instantiate my background
    background = new createjs.Bitmap("assets/images/backGround22.png");
    game.addChild(background);

    // Spin Button
    spinButton = new createjs.Bitmap("assets/images/spin_Button.png");
    spinButton.x = 368;
    spinButton.y = 422;
    game.addChild(spinButton);

    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", spinButtonOver);
    spinButton.addEventListener("mouseout", spinButtonOut);

    resetButton = new createjs.Bitmap("assets/images/reset_button.png");
    resetButton.x = 95;
    resetButton.y = 423;
    game.addChild(resetButton);

    resetButton.addEventListener("click", resetAll);
    resetButton.addEventListener("mouseover", resetButtonOver);
    resetButton.addEventListener("mouseout", resetButtonOut);

    betMax = new createjs.Bitmap("assets/images/bet_max.png");
    betMax.x = 300;
    betMax.y = 430;
    game.addChild(betMax);

    betMax.addEventListener("click", bet100);
    betMax.addEventListener("mouseover", betMaxButtonOver);
    betMax.addEventListener("mouseout", betMaxButtonOut);

    betOne = new createjs.Bitmap("assets/images/bet_one.png");
    betOne.x = 190;
    betOne.y = 430;
    game.addChild(betOne);

    betOne.addEventListener("click", bet1);
    betOne.addEventListener("mouseover", betOneButtonOver);
    betOne.addEventListener("mouseout", betOneButtonOut);


    bet10 = new createjs.Bitmap("assets/images/bet_10.png");
    bet10.x = 246;
    bet10.y = 430;
    game.addChild(bet10);

    bet10.addEventListener("click", betTen);
    bet10.addEventListener("mouseover", bet10ButtonOver);
    bet10.addEventListener("mouseout", bet10ButtonOut);

    exitButton = new createjs.Bitmap("assets/images/exoit_button.png");
    exitButton.x = 406;
    exitButton.y = 125;
    game.addChild(exitButton);

    //  exitButton.addEventListener("click", exitButtonClick);
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
    // betText.regX = betText.getBounds().width
    game.addChild(betText);

}



/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;

        createjs.Sound.play("jackpot");
    }
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
}