var letter = require("./Letter.js");

var word=function(){
    this.selectWord="";
    this.screenWord=[];
    this.pressedKeyboard=[];

    this.setSelectWord=function(selectWord) {
        this.selectWord=selectWord;
        for(var i =0;i<this.selectWord.length;i++) {
            var lett=new letter();
            lett.setCharacter(selectWord[i]);
            this.screenWord.push(lett);
        }
    }
    this.getSelectWord=function() {
        return this.selectWord;
    }
    this.getScreenWord=function() {
        return this.screenWord;
    }
    this.pressCharacter=function(character) {
        if(this.pressedKeyboard.indexOf(character)>=0) {
            return "false";
        }
        this.pressedKeyboard.push(character);
        var correct=false;
        for(var i=0;i<this.screenWord.length;i++) {
            if(this.screenWord[i].character.indexOf(character)>=0) {
                var lett=this.screenWord[i];
                lett.setUsed(character);
                correct=true;
            }
        }
        if(correct==true) {
            return "correct";
        } else {
            return "incorrect";
        } 
    }
}

module.exports=word;
