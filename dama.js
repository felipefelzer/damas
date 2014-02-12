// Author: Ricardo Periago
// Jogo de Damas



// Declarações

var game = {};
var board = document.getElementById("board"); 


// para funcionar no IE

if (!document.getElementsByClassName) {
        document.getElementsByClassName=function(cn) {
        var allT=document.getElementsByTagName('*'), allCN=[], i=0, a;
        while(a=allT[i++]) {
            a.className==cn ? allCN[allCN.length]=a : null;
        }
        return allCN
    }
}




(function(){

    game.squareColor = function(r,c){
       
        color = Math.abs((r+c)%2)
        
        if (color > 0) {
            color = "black";
        }else{
            color = "white";
        }

        return color;
    }

    game.makeSquare = function(r){

        var square = document.getElementById("row_"+r);
        
        for (s = 1; s < 9; s++) {
            square.innerHTML+="<div id='sq_"+r+"_"+s+"' class='square "+game.squareColor(r,s)+"' row='"+r+"' sq='"+s+"'></div>";
            //game.squareColor(r,s);
        }

    }

    game.table = function(){
        for (i = 1; i < 9; i++) {
            board.innerHTML+="<div id='row_"+i+"' class='row' row='"+i+"'></div>";
            game.makeSquare(i);
            
        }
       
    }

    game.takePart = function(){
        
        var blackSquare = document.getElementsByClassName("black");
        var whiteSquare = document.getElementsByClassName("white"); 
        
        // ditribui peças 
        p = 1;
        for (var i = 0; i < 12; i++) {
            blackSquare[i].innerHTML+="(0)";
            blackSquare[i].setAttribute("part", p);
            p++;
        }
        p = 1;
        for (var i = 20; i < 32; i++) {
            row = whiteSquare[i].getAttribute("row");
            sq = whiteSquare[i].getAttribute("sq");
            whiteSquare[i].innerHTML+="(0)";
            whiteSquare[i].setAttribute("part", p);
            whiteSquare[i].setAttribute("onclick", "game.possibleMove("+p+","+row+","+sq+")");
     
            p++;
        }
    }

    game.possibleMove = function(part,row,sq){
        //.getAttributeNode("target");
       mLeft = sq-1;
       mRight = sq+1;
       mTop = row-1;
       if (sq > 1) {
           select1 = document.getElementById("sq_"+mTop+"_"+mLeft);
       }
       if (sq != 8) {
           select2 = document.getElementById("sq_"+mTop+"_"+mRight);
       }
       console.log(mLeft);
       console.log(mRight);
       console.log(mTop);
       //select1.getAttribute("class")
       existingClass = select1.getAttribute("class");
       select1.setAttribute("class",existingClass+" active");

       select2.setAttribute("class",existingClass+" active");
    }

    game.start = function(){
        game.table();
        game.takePart();
    }
    return game.start();

})();
