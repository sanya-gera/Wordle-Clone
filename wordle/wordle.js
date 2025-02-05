var height=6;
var width=5;

var row=0; //curr attempt
var col=0; //curr letter

var gameOver=false;
var word="RAMEN";

window.onload = function(){
    initialize();
}

function initialize(){
    //create the tiles
    for(let r=0; r<height; r++){
        for(let c=0; c<width; c++){
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");//adds the class with all the styling
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {
        if(gameOver) return;
        //e is the key that is pressed
        // alert(e.code);
        //e.code -> denotes the name of the key that is pressed
        if("KeyA" <= e.code && e.code <= "KeyZ"){
            if(col<width){
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if(currTile.innerText==""){
                    currTile.innerText = e.code[3];
                    col+=1;
                }
            }
        }
        else if(e.code == "Backspace"){
            if(0<col && col<=width){
                col-=1;
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";
        }
        else if(e.code == "Enter"){
            update();
            row+=1;
            col=0;
        }
        if(!gameOver && row==height){
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    }); //a key is only pressed when the user presses it and then lifts up the finger    
}

function update(){
    let correct=0;
    let letterCount={};
    for(let i=0; i<word.length; i++){
        letter = word[i];
        if(letterCount[letter]){
            letterCount[letter]+=1;
        }else{
            letterCount[letter]=1;
        }
    }
    for(let c=0; c<width; c++){
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;
        if(word[c]==letter){
            currTile.classList.add("correct");
            correct+=1;
            letterCount[letter]-=1;
        }
        if(correct == width){
            gameOver=true;
        }
    }
    for(let c=0; c<width; c++){
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;
        if(!currTile.classList.contains("correct")){
            if(word.includes(letter) && letterCount[letter]>0){
                currTile.classList.add("present");
                letterCount[letter]-=1;
            }else{
                currTile.classList.add("absent");
            }
        }
    }
    
}

