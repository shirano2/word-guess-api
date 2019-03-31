var letter = function(){
    this.character="";
    this.used=false;
    this.setCharacter=function(character) {
        this.character=character;
    }
    this.setUsed=function(character){
        this.used=true;
        return this;
    }
    this.toString=function() {
        if(this.used==true) {
            return this.character;
        } else {
            return "_";
        }
    }
}

module.exports=letter;