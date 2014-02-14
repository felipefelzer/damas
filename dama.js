// Author: Ricardo Periago
// Jogo de Damas


// Declarações

var game = {};
var board = document.getElementById("board"); 
var blackSquare = document.getElementsByClassName("white");
var whiteSquare = document.getElementsByClassName("white"); 

var Possible = new Array();
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

    // fazendo o quadrados pretos e brancos alternados
    game.squareColor = function(r,c){

        color = Math.abs((r+c)%2);

        if (color > 0) {
            color = "black";
        }
        else{
            color = "white";
        }

        return color;
    }

    game.eatPart = function(id){
        document.getElementById(id).innerHTML="";
        game.clearActive(); 
    }


    //distribui os quadrados
    game.makeSquare = function(r){

        var square = document.getElementById("row_"+r);

        for (s = 1; s < 9; s++) {
            square.innerHTML+="<div id='sq_"+r+"_"+s+"' class='square "+game.squareColor(r,s)+"' row='"+r+"' sq='"+s+"'></div>";
        }

    }
    //monta o tabuleiro
    game.table = function(){
        for (i = 1; i < 9; i++) {
            board.innerHTML+="<div id='row_"+i+"' class='row' row='"+i+"'></div>";
            game.makeSquare(i);

        }

    }

    // ditribui peças 
    game.takePart = function(){
        p = 1;
        for (var i = 0; i < 12; i++) {
            row = blackSquare[i].getAttribute("row");
            sq = blackSquare[i].getAttribute("sq");   
            blackSquare[i].innerHTML+="<span class='partblack'>(0)</span>";
            blackSquare[i].setAttribute("part", p);
            blackSquare[i].setAttribute("type", 'b');
            blackSquare[i].setAttribute("dama", false);
            blackSquare[i].setAttribute("onclick", "game.possibleMove("+p+","+row+","+sq+",'b',this.id)");
            
            p++;
        }
        p = 1;
        for (var i = 20; i < 32; i++) {
            row = whiteSquare[i].getAttribute("row");
            sq = whiteSquare[i].getAttribute("sq");
            whiteSquare[i].innerHTML+="<span class='partWhite'>(0)</span>";
            whiteSquare[i].setAttribute("part", p);
            whiteSquare[i].setAttribute("type", 'w');
            whiteSquare[i].setAttribute("dama", false);
            whiteSquare[i].setAttribute("onclick", "game.possibleMove("+p+","+row+","+sq+",'w',this.id)");

            p++;
        }
    }
    // limpa a class active
    game.clearActive = function (){
        console.log("limpo")
        for (var i = 1; i < whiteSquare.length; i++) {
            whiteSquare[i].setAttribute("class","square white");
        };
        
    }

    game.makeDama = function(){

    }

    // verifica os movimentos possiveis
    game.possibleMove = function(part,row,sq,type,oldId){

        mLeft = sq-1;
        mRight = sq+1;
        
        if (type == 'w') {   
            mTop = row-1;
        }

        if (type == 'b') {
            mTop = row+1;
        }

        if (mRight <= 8 && mLeft > 0 ){
            game.clearActive(); 
            nextSquareLeft  = document.getElementById("sq_"+mTop+"_"+mLeft);
            nextSquareRight = document.getElementById("sq_"+mTop+"_"+mRight);

            existingClassLeft   = nextSquareLeft.getAttribute("class");
            existingClassRight  = nextSquareRight.getAttribute("class"); 

            partLeft    = nextSquareLeft.hasAttribute("part");
            partRight   = nextSquareRight.hasAttribute("part");

            partTypeRight   = nextSquareRight.getAttribute("type");
            partTypeLeft    = nextSquareLeft.getAttribute("type");
            console.log(partLeft);


            if (partLeft === true && type != partTypeLeft) {
                console.log("inimigo a esquerda");
                ennime  = document.getElementById("sq_"+mTop+"_"+mLeft);
                ennime.setAttribute("ondblclick","game.eatPart(this.id)");

                if (type == 'w') {   
                    mTop = mTop-1;
                    mLeft = mLeft-1;
                    mRight = mRight+1;
                }

                if (type == 'b') {
                    mTop = mTop+1;
                    mLeft = mLeft-1;
                    mRight = mRight+1;
                }

                
                nextSquareLeft  = document.getElementById("sq_"+mTop+"_"+mLeft);
                
                
                nextSquareLeft.setAttribute("class",existingClassLeft+" active");
                nextSquareLeft.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+mTop+"_"+mRight+",'"+type+"')");

            }else{
                nextSquareLeft.setAttribute("class",existingClassLeft+" active");
                nextSquareLeft.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+mTop+"_"+mRight+",'"+type+"')");

            }


             if (partRight === true && type != partTypeRight) {
                console.log("inimigo a direita");
     
                if (type == 'w') {   
                    mTop = mTop-1;
                    mLeft = mLeft-1;
                    mRight = mRight+1;
                }

                if (type == 'b') {
                    mTop = mTop+1;
                    mLeft = mLeft-1;
                    mRight = mRight+1;
                }

                nextSquareRight  = document.getElementById("sq_"+mTop+"_"+mRight);
            

                nextSquareRight.setAttribute("class",existingClassRight+" active");
                nextSquareRight.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+mTop+"_"+mLeft+",'"+type+"')");
            }else{
                
                nextSquareRight.setAttribute("class",existingClassRight+" active");
                nextSquareRight.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+mTop+"_"+mLeft+",'"+type+"')");
            }

            

            
        }
        
        if (mRight == 9 ) {
            game.clearActive(); 
            nextSquareLeft = document.getElementById("sq_"+mTop+"_"+mLeft);
            existingClassLeft = nextSquareLeft.getAttribute("class");
            partLeft = nextSquareLeft.hasAttribute("part");
            nextSquareLeft.setAttribute("class",existingClassLeft+" active");
            nextSquareLeft.setAttribute("onclick", "game.partMove(this.id,"+oldId+","+mRight+",'"+type+"')");

        }

        if (mLeft == 0) {
            game.clearActive(); 
            nextSquareRight = document.getElementById("sq_"+mTop+"_"+mRight);
            existingClassRight = nextSquareRight.getAttribute("class"); 
            partRight = nextSquareRight.hasAttribute("part");
            nextSquareRight.setAttribute("class",existingClassRight+" active");
            nextSquareRight.setAttribute("onclick", "game.partMove(this.id,"+oldId+","+mLeft+",'"+type+"')");
        }
        


        

    }

    game.partMove = function(id,oldId,other,type){
       
        //nova posição
        move = document.getElementById(id);

        //não clicado posição
        if (typeof other === 'object') {
            other.removeAttribute("onclick");
        }
        //posição antiga
        old = document.getElementById(oldId.id);
        
        //id da peça
        part = oldId.getAttribute("part");
        
        // limpa os possivei movimentos
        game.clearActive(); 
        old.removeAttribute("onclick");

        old.removeAttribute("type"); 
        old.removeAttribute("dama");


        
         // seta o id da peça em seu novo lugar
        move.setAttribute("part", part);

        // pega a linha e quadrado novo
        row = move.getAttribute("row");
        sq  = move.getAttribute("sq");
        
        
        //executa o movimento
        if (type == "w") {
            move.setAttribute("onclick", "game.possibleMove("+part+","+row+","+sq+",'w',this.id)"); 
            move.innerHTML+="<span class='partWhite'>(0)</span>";
            move.setAttribute("type", 'w');
            move.setAttribute("dama", false);

            
        }else{
            move.innerHTML+="<span class='partBlack'>(0)</span>";
            move.setAttribute("onclick", "game.possibleMove("+part+","+row+","+sq+",'b',this.id)");
            move.setAttribute("type", 'b');
            move.setAttribute("dama", false); 
        }
        // limpa o guadrado anterior
        old.innerHTML="";
        old.removeAttribute("part");
    }

    // inicializa
    game.start = function(){
        game.table();
        game.takePart();
    }
    return game.start();

})();