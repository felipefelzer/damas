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
        for (var i = 1; i < whiteSquare.length; i++) {
            whiteSquare[i].setAttribute("class","square white");
        };
        
    }

    game.ajustMove = function(sq,row,type){
        

        if (type == 'w') {
            Possible['mLeft'] = sq-1;
            Possible['mRight'] = sq+1;
            Possible['mTop'] = row-1;
            Possible['type'] = type;
        }

        if (type == 'b') {
            Possible['mLeft'] = sq-1;
            Possible['mRight'] = sq+1;
            Possible['emTop'] = row+1;
            Possible['type'] = type;
        }
         console.log(Possible); 
        return Possible;
        

    }

    // verifica os movimentos possiveis
    game.possibleMove = function(part,row,sq,type,oldId){

        //possible = game.ajustMove(sq,row,type);
        //
       
        mLeft = sq-1;
        mRight = sq+1;
        
        if (type == 'w') {   
            mTop = row-1;
        }

        if (type == 'b') {
            mTop = row+1;
        }
         
        //console.log("sq_"+mTop+"_"+mLeft);
        if (sq > 1){
            game.clearActive(); 
            nextSquareLeft = document.getElementById("sq_"+mTop+"_"+mLeft);
            existingClassLeft = nextSquareLeft.getAttribute("class");
            partLeft = nextSquareLeft.hasAttribute("part");
            nextSquareLeft.setAttribute("class",existingClassLeft+" active");
            nextSquareLeft.setAttribute("onclick", "game.partMove(this.id,"+oldId+",'"+type+"')");
        }
        if (sq <= 7){
            if (sq == 1) {
               game.clearActive(); 
            } 
            nextSquareRight = document.getElementById("sq_"+mTop+"_"+mRight);
            existingClassRight = nextSquareRight.getAttribute("class"); 
            partRight = nextSquareLeft.hasAttribute("part");
            if (partRight == false) {
                nextSquareRight.setAttribute("class",existingClassRight+" active");
                nextSquareRight.setAttribute("onclick", "game.partMove(this.id,"+oldId+",'"+type+"')");
            }else{
                nextType = nextSquareRight.getAttribute('type')
                if (nextType != type) {
                   // mLeft = mLeft+1;
                    //mRight = mRight+1;
                    if (type == 'w') {   
                        mTop = row;
                    }

                    if (type == 'b') {
                        mTop = row;
                    }

                    nextSquareRight = document.getElementById("sq_"+mTop+"_"+mRight);
                    nextSquareRight.setAttribute("class",existingClassRight+" active");
                    nextSquareRight.setAttribute("onclick", "game.partMove(this.id,"+oldId+",'"+type+"')");
                }
            }
        }
        

        //if (sq > 1) {
            //game.clearActive();
            //select1 = document.getElementById("sq_"+mTop+"_"+mLeft);
            //part = select1.hasAttribute("part");
            //if (part != true){
                //existingClass = select1.getAttribute("class");
                //select1.setAttribute("class",existingClass+" active");
                //select1.setAttribute("onclick", "game.partMove(this.id,"+oldId+",'"+type+"')");
            //}else{
             //console.log('dir'); 
                 
            //}
        //}
        //if (sq <= 7) {
            //if (sq == 1) {
                //game.clearActive(); 
            //}
            //select2 = document.getElementById("sq_"+mTop+"_"+mRight);
            //part = select2.hasAttribute("part");
            
            //if (part != true) {  
                //existingClass = select2.getAttribute("class");
                //select2.setAttribute("class",existingClass+" active");
                //select2.setAttribute("onclick", "game.partMove(this.id,"+oldId+",'"+type+"')");
            //} else {
                //console.log('esq');
               
            //}
           //if(select2.getAttribute('type') == type){ 
        //}

    }

    game.partMove = function(id,oldId,type){
        
        //nova posição
        move = document.getElementById(id);
        
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

  //tipo = select1.getAttribute('type');
                //if (tipo != 'w') {
                    //mLeft = mLeft-1;
                    //mRight = mRight+1;
                    //mTop = mTop-1;
                //}

                //if (tipo != 'b') {
                    //mLeft = mLeft-1;
                    //mRight = mRight+1;
                    //mTop = mTop+1;
                //}
                
                //console.log('entro');
                //console.log(tipo);
                //nSql = document.getElementById("sq_"+mTop+"_"+mLeft);
                //nSql.setAttribute("class",existingClass+" active");
                //nSql.setAttribute("onclick", "game.partMove(this.id,"+oldId+",'"+type+"')");  
