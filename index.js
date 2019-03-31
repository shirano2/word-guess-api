var inquirer = require("inquirer");
var wordModule = require("./Word.js");
var chalk = require("chalk");
var wordObject;
var gameCount;
var check;

var word=["adult", "aircraft", "alphabet",
        "backpack", "balloon", "bomb",
        "carrot", "chocolate", "computer",
        "drill", "diamond", "dress",
        "earth", "explosion", "eraser",
        "festival", "finger", "flower",
        "garden", "gateway", "guitar",
        "hammer", "horoscope", "horse",
        "icecream", "insect", "igloo",
        "juice", "jar", "journey",
        "kitchen", "kitten", "knife",
        "library", "liquid", "leaf",
        "milkshake", "mushroom", "meteor", 
        "necklace", "needle", "nail",
        "onion", "ocean", "orange",
        "pillow", "potato", "paper",
        "queen", "quarrel", "question",
        "revolver", "rocket", "rainbow",
        "snake", "star", "skeleton",
        "tennis", "turtle", "tornado",
        "umbrella", "undertaker", "university",
        "vampire", "vendetta", "vegetable",
        "window", "weapon", "widow",
        "xylophone","yacht","zombie"];

var init=function(){
    gameCount=12;
    wordObject= new wordModule();
}

var random = function() { 
    var computerIndex=Math.floor(Math.random()*word.length);
    var computerChoose=word[computerIndex];
    wordObject.setSelectWord(computerChoose);
    console.log("\r\n"+"   "+wordObject.getScreenWord().join(" "));
}

var init=function(){
    gameCount=12;
    wordObject= new wordModule();
}

var random = function() { 
    var computerIndex=Math.floor(Math.random()*word.length);
    var computerChoose=word[computerIndex];
    wordObject.setSelectWord(computerChoose);
    console.log(chalk.yellow("\r\n"+"   "+wordObject.getScreenWord().join(" ")));
}

var start=function() {
    inquirer.prompt([
        {
          name: "name",
          message: "Guess a letter",
          validate: function(value) {
            if (value.length==1 && "abcdefghijklmnopqrstuvwxyz".split("").indexOf(value)>=0) {
                check=wordObject.pressCharacter(value);
                if(check=="false") {
                    console.log(chalk.red("\r\nYou already pressed it!!"));
                    return false;
                } else {
                    return true;
                }  
            } else if(value.length!=1) {
                console.log(chalk.red("\r\nYou should input 1 character!!"));
                return false;
            } else {
                console.log(chalk.red("\r\nYou should input alphabet('a-z')!!"));
                return false;
            }
          }
        }
      ]).then(function() {
          console.log(chalk.yellow("   "+wordObject.getScreenWord().join(" ")));
          if(check.indexOf("incorrect")>=0) {
              console.log(chalk.red("\r\nYou're wrong!!"));
          } else {
              console.log(chalk.blue("\r\nYou're correct!!"));
          }
          check=0;
          for(var i=0; i<wordObject.getScreenWord().length;i++) {
              if(wordObject.getScreenWord()[i].used==true) {
                check=check+1;
              } else {
                  check=check*0;
              }
          }
          gameCount--;
          if(check==wordObject.getScreenWord().length) {
              console.log(chalk.magenta.bold("\r\nYou Win!!"));
              restartGame();
          } else if(gameCount==0) {
              console.log(chalk.red.bold("\r\nGAME OVER!!"));
              console.log("\r\nThe Answer is "+chalk.yellow(wordObject.getSelectWord())+"!!!");
              restartGame();
          } else {
              console.log("\r\nYou left "+gameCount+" chances");
              start();
          }
    });
}

var gameStart=function() {
    init();
    random();
    start();
}

var restartGame=function() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want play more game?:",
            name: "confirm"
        }
        ]).then(function(answers) {
            if(answers.confirm==true) {
                gameStart();
            } else {
                return;
            }
        });
}

gameStart();