var inquirer = require("inquirer");
var wordModule = require("./Word.js");
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

var start=function() {
    inquirer.prompt([
        {
          name: "name",
          message: "Guess a letter",
          validate: function(value) {
            if (value.length==1 && "abcdefghijklmnopqrstuvwxyz".split("").indexOf(value)>=0) {
                check=wordObject.pressCharacter(value);
                if(check.indexOf("false")>=0) {
                    console.log("\r\nYou already pressed it!!");
                    return false;
                } else {
                    return true;
                }  
            } else if(value.length!=1) {
                console.log("\r\nYou should input 1 character!!");
                return false;
            } else {
                console.log("\r\nYou should input alphabet('a-z')!!");
                return false;
            }
          }
        }
      ]).then(function(answers) {
          console.log("   "+wordObject.getScreenWord().join(" "));
          if(check.indexOf("incorrect")>=0) {
              console.log("\r\nYou're wrong!!");
          } else {
              console.log("\r\nYou're correct!!");
          }
          check=0;
          for(var i=0; i<wordObject.getScreenWord().length;i++) {
              if(wordObject.getScreenWord()[i].used.indexOf("true")>=0) {
                check=check+1;
              } else {
                  check=check*0;
              }
          }
          if(check==wordObject.getScreenWord().length) {
              console.log("\r\nYou Win!!");
              restartGame();
          }
          gameCount--;
          
          if(gameCount==0) {
              console.log("\r\nGAME OVER!!");
              console.log("\r\nThe Answer is "+wordObject.getSelectWord()+"!!!");
              restartGame();
          }

          if(check!=wordObject.getScreenWord().length && gameCount!=0) {
              console.log("\r\nYou left "+gameCount+" chances");
              start();
          }
    });
}

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