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

    game.eatPart = function(enemy){
        del = document.getElementById(enemy);
        del.removeAttribute("type");
        del.removeAttribute("onclick");
        del.removeAttribute("part");
        del.removeAttribute("dama");
        del.innerHTML="";
        //game.clearActive(); 
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

        // peçãs pretas
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
        //peças brancas
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
        for (var i = 0; i < whiteSquare.length; i++) {
             whiteSquare[i].setAttribute("class","square white");
            if (whiteSquare[i].hasAttribute("part") != true) {
                
                whiteSquare[i].removeAttribute("onclick");
            }
           // 
        };
        
    }

    // verifica os movimentos possiveis
    game.possibleMove = function(part,row,sq,type,oldId){
        
                game.clearActive();
        oldPos = document.getElementById(oldId);
        dama = oldPos.getAttribute("dama");  

        ///movimento da Dama
        /// verifica se a peça e uma Dama
        if (dama === "true") {
            // proxima linha em para baixo relação a peça clicada
            dow = row+1;
            // proxima linha para cima em relação a peça clicada
            up = row-1;
            // proximo qudrado a esquerda com relação ao clicado
            right = sq+1;
            
            rightUp = sq+1;
            // proximo quadrado a direita com relação ao clicado
            leftUp = sq-1;
            // proximo quadrado a direita com relação ao clicado
            left = sq-1;
            // variavel pra controlar obstaulos
            obstacleL = 0;
            obstacleR = 0;
            obstacleUpR = 0;
            obstacleUpL = 0;
            //
            DamaType = oldPos.getAttribute("type");
           
            for (var x = up; x > 0; x--) {

                // verifica se não é o ultimo quadrado
                if (leftUp > 0) {
                   
                    // movimenta pra direita e pra baixo
                    nextDamaL = document.getElementById("sq_"+x+"_"+leftUp);
                    
                    if (nextDamaL.hasAttribute("part")) {
                        console.log("obstaculo");
                        tipo = nextDamaL.getAttribute("type");
                        if (tipo != DamaType) {
                            enemy  = "sq_"+x+"_"+leftUp;
                        }else{
                            enemy = "0";
                            break;
                        }
                        if (obstacleUpL > 1) {
                            break;
                        };

                        obstacleUpL++;
                    }else{                   
                        nextDamaL.setAttribute("class",existingClassLeft+" active");
                        nextDamaL.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+x+"_"+leftUp+",'"+enemy+"','"+type+"')");
                    }
                    leftUp--; 
                    
                };

            }  
            for (var x = up; x > 0; x--) {

                console.log("linha"+x);
                //break;
                // calcula apenas os quadrados brancos
                w = Math.abs((x+rightUp)%2);
                // verifica se não é o ultimo quadrado
                if (rightUp < 9) {
                   
                    // movimenta pra direita e pra baixo
                    nextDamaR = document.getElementById("sq_"+x+"_"+rightUp);
                    
                    if (nextDamaR.hasAttribute("part")) {
                        console.log("obstaculo");
                        tipo = nextDamaR.getAttribute("type");
                        if (tipo != DamaType) {
                            enemy  = "sq_"+x+"_"+right;
                        }else{
                            enemy = "0";
                            break;
                        }
                        if (obstacleUpR > 1) {
                            break;
                        };

                        obstacleUpR++;
                    }else{                   
                        nextDamaR.setAttribute("class",existingClassLeft+" active");
                        nextDamaR.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+x+"_"+rightUp+",'"+enemy+"','"+type+"')");
                    }
                    rightUp++; 
                    
                };

            }  
            
            // caminha pra baixo em relação ao clicado
            for (var x = dow; x < 9; x++) {
                console.log("linha"+x);
                // calcula apenas os quadrados brancos
                w = Math.abs((x+right)%2);
                // verifica se não é o ultimo quadrado
                if (right < 9) {
                   
                    // movimenta pra direita e pra baixo
                    nextDamaR = document.getElementById("sq_"+x+"_"+right);
                    
                    if (nextDamaR.hasAttribute("part")) {
                        console.log("obstaculo");
                        tipo = nextDamaR.getAttribute("type");
                        if (tipo != DamaType) {
                            enemy  = "sq_"+x+"_"+right;
                        }else{
                            enemy = "0";
                            break;
                        }
                        if (obstacleR > 1) {
                            break;
                        };

                        obstacleR++;
                    }else{
                        nextDamaR.setAttribute("class",existingClassLeft+" active");
                        nextDamaR.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+x+"_"+right+",'"+enemy+"','"+type+"')");
                    }
                    right++; 
                };
            }
                
            for (var x = dow; x < 9; x++) { 
                if (left > 0) { 
                // movimenta pra esquerda e pra baixo
                    nextDamaL = document.getElementById("sq_"+x+"_"+left); 
                    if (nextDamaL.hasAttribute("part")) {
                        console.log("obstaculo");
                        tipoL = nextDamaL.getAttribute("type");
                        if (tipoL != DamaType) {
                            enemy  = "sq_"+x+"_"+left;
                        }else{
                            enemy = "0";
                            break;
                        }
                        if (obstacleL > 1) {
                            break;
                        };

                        obstacleL++;
                    }else{
                        nextDamaL.setAttribute("class",existingClassLeft+" active");
                        nextDamaL.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+x+"_"+left+",'"+enemy+"','"+type+"')");
                    } 
                    console.log("Coluna"+right+"w="+w);
                // se for o ultimo quadrado a esquerda interrompe o loop
                }else{
                    break;
                }
                // incrementa o valor a direita    
               left--; 
            }
        }else{
        
            if (type == 'w') {   
                mTop = row-1;
            }

            if (type == 'b') {
                mTop = row+1;
            }

            mRight = sq+1;
            mLeft = sq-1;
            partType = oldPos.getAttribute("type"); 
            if (partType === "b") {
                enemy = "0";  
                obstacleL = 0;
                obstacleR = 0;
                for (var x = mTop; x < 9; x++) { 
                    if (mLeft > 0) {
                        
                    // movimenta pra esquerda e pra baixo
                        nextL = document.getElementById("sq_"+x+"_"+mLeft);
                         
                        existingClassLeft   = nextL.getAttribute("class");
                        if (nextL.hasAttribute("part")) {
                            console.log("obstaculo");
                            
                            tipoL = nextL.getAttribute("type");
                            if (tipoL != partType) {
                                enemy  = "sq_"+x+"_"+mLeft;
                                
                                
                            }else{
                                break;
                            } 
                             
                            obstacleL++; 
                            
                            
                        }else{  
                            if (obstacleL > 1) {
                                break;
                            };  
                            nextL.setAttribute("class",existingClassLeft+" active");
                            nextL.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+x+"_"+mLeft+",'"+enemy+"','"+type+"')");
                            break;
                        } 
                    // se for o ultimo quadrado a esquerda interrompe o loop
                    }else{
                        break;
                    }
                    mLeft--;
               }
                enemy = "0"; 
                for (var x = mTop; x < 9; x++) {
                    if (mRight < 9) {
                        
                    // movimenta pra esquerda e pra baixo
                        nextR = document.getElementById("sq_"+x+"_"+mRight);
                         
                        existingClassLeft   = nextR.getAttribute("class");
                        if (nextR.hasAttribute("part")) {
                            console.log("obstaculo");
                            
                            tipoR = nextR.getAttribute("type");
                            if (tipoR != partType) {
                                enemy  = "sq_"+x+"_"+mRight;
                                
                                
                            }else{
                                break;
                            }
                              
                            obstacleR++; 
                            
                        }else{
                            if (obstacleR > 1) {
                                break;
                            }; 
                            nextR.setAttribute("class",existingClassLeft+" active");
                            nextR.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+x+"_"+mRight+",'"+enemy+"','"+type+"')");
                            break;
                        } 
                    // se for o ultimo quadrado a esquerda interrompe o loop
                    }else{
                        break;
                    }    

                    // incrementa o valor a direita    
                mRight++; 
                }


            }
            if (partType === "w") {
                enemy = "0";
                obstacleL = 0;
                obstacleR = 0;
                for (var x = mTop; x > 0; x--) { 
                    if (mLeft > 0) {
                        
                    // movimenta pra esquerda e pra baixo
                        nextL = document.getElementById("sq_"+x+"_"+mLeft);
                        existingClassLeft   = nextL.getAttribute("class");
                        if (nextL.hasAttribute("part")) {
                            console.log("obstaculo");
                            
                            tipoL = nextL.getAttribute("type");
                            if (tipoL != partType) {
                                enemy  = "sq_"+x+"_"+mLeft;
                                
                                
                            }else{
                                break;
                            } 
                             
                            obstacleL++;
                            
                            
                           
                        }else{
                            if (obstacleL > 1) {
                                break;
                            };  
                            nextL.setAttribute("class",existingClassLeft+" active");
                            nextL.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+x+"_"+mLeft+",'"+enemy+"','"+type+"')");
                            break;
                        } 
                    // se for o ultimo quadrado a esquerda interrompe o loop
                    }else{
                        break;
                    }
                    // incrementa o valor a direita    
                mLeft--; 
                }

                enemy = "0"; 
                for (var x = mTop; x > 0; x--) { 
                    if (mRight < 9) {
                        
                    // movimenta pra esquerda e pra baixo
                        nextR = document.getElementById("sq_"+x+"_"+mRight);
                         
                        existingClassLeft   = nextR.getAttribute("class");
                        if (nextR.hasAttribute("part")) {
                            console.log("obstaculo");
                            
                            tipoR = nextR.getAttribute("type");
                            if (tipoR != partType) {
                                enemy  = "sq_"+x+"_"+mRight;
                                
                                
                            }else{
                                break;
                            } 
                           
                            obstacleR++; 
                            
                            
                        }else{
                            if (obstacleR > 1) {
                                break;
                            };   
                            nextR.setAttribute("class",existingClassLeft+" active");
                            nextR.setAttribute("onclick", "game.partMove(this.id,"+oldId+",sq_"+x+"_"+mRight+",'"+enemy+"','"+type+"')");
                            break;
                        } 
                    // se for o ultimo quadrado a esquerda interrompe o loop
                    }else{
                        break;
                    }    

                    // incrementa o valor a direita    
                mRight++; 
                }
            }              
        }

          

    }

    game.partMove = function(id,oldId,other,enemy,type){
        //nova posição
        move = document.getElementById(id);

        //não clicado posição
        if (typeof other === 'object') {
            tipo = other.getAttribute("type");
            if (tipo == type) {
                other.removeAttribute("onclick");
                other.setAttribute("onclick", "game.possibleMove("+part+","+row+","+sq+",'"+tipo+"',this.id)");
            }
        } 
       
        //posição antiga
        old = document.getElementById(oldId.id);
        
        //id da peça
        part = oldId.getAttribute("part");
        
          // limpa os possivei movimentos
        game.clearActive(); 
        old.removeAttribute("onclick");   
        old.removeAttribute("type"); 
       
        // seta o id da peça em seu novo lugar
        move.setAttribute("part", part);

        // pega a linha e quadrado novo
        row = move.getAttribute("row");
        sq  = move.getAttribute("sq");
        
        
        //executa o movimento
        if (type == "w") {
            //console.log(row);
            if (row == 1) {
                
                move.setAttribute("onclick", "game.possibleMove("+part+","+row+","+sq+",'w',this.id)"); 
                move.innerHTML+="<span class='partWhite'>(D)</span>";
                move.setAttribute("type", 'w');
                move.setAttribute("dama", true); 
            }else{
                if (old.getAttribute("dama") === "true"){
                
                    move.setAttribute("onclick", "game.possibleMove("+part+","+row+","+sq+",'w',this.id)"); 
                    move.innerHTML+="<span class='partWhite'>(D)</span>";
                    move.setAttribute("type", 'w');
                    move.setAttribute("dama", true);
                }else{
                
                    move.setAttribute("onclick", "game.possibleMove("+part+","+row+","+sq+",'w',this.id)"); 
                    move.innerHTML+="<span class='partWhite'>(0)</span>";
                    move.setAttribute("type", 'w');
                    move.setAttribute("dama", false);
                }
            }

            
        }else{
            if (row == 8) {  
                move.innerHTML+="<span class='partBlack'>(D)</span>";
                move.setAttribute("onclick", "game.possibleMove("+part+","+row+","+sq+",'b',this.id)");
                move.setAttribute("type", 'b');
                move.setAttribute("dama", true); 
            }
            else{
                if (old.getAttribute("dama") === "true"){
                
                    move.setAttribute("onclick", "game.possibleMove("+part+","+row+","+sq+",'b',this.id)"); 
                    move.innerHTML+="<span class='partBlack'>(D)</span>";
                    move.setAttribute("type", 'b');
                    move.setAttribute("dama", true);
                }else{
                
                    move.setAttribute("onclick", "game.possibleMove("+part+","+row+","+sq+",'b',this.id)"); 
                    move.innerHTML+="<span class='partBlack'>(0)</span>";
                    move.setAttribute("type", 'b');
                    move.setAttribute("dama", false);
                }             
            }
        } 
        
       
        old.removeAttribute("dama"); 
        // limpa o guadrado anterior
        old.innerHTML="";
        old.removeAttribute("part");

        if ( enemy != "0" ) {
            game.eatPart(enemy);
        }      
       
    }

    // inicializa
    game.start = function(){
        game.table();
        game.takePart();
    }
    return game.start();

})();
