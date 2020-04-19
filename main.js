class Player{
    constructor(name,symbol,array){
        this.name = name;
        this.symbol = symbol;
        this.array = array;
    }

}


class Board{

    constructor(boxArray){
        this.boxArray = boxArray;
    }

    fillBox(e){
        if(this.isBoxEmpty(e))
        {
            var box = document.querySelector('#' + e.target.id);
            box.textContent = gcObj.currentPlayer.symbol;
            gcObj.gameBoard.boxArray[(e.target.id.substring(2,3)) - 1] = box.textContent = gcObj.currentPlayer.symbol;
            box.classList.add ("marked");
            gcObj.toggleStatus = true;
        }

        else{
            gcObj.toggleStatus = false;
        }       
       
    }

    isBoxEmpty(e){

       var box = document.querySelector('#' + e.target.id);
       if(box.classList.contains("marked"))
       {
           return false;
       } 
       else{
           return true;
       }
    }


}

class gameCrontroler{
    constructor(name,gameBoard,player1,player2)
    {
        this.name = name;
        this.gameBoard = gameBoard;
        this.player1 = player1;
        this.player2 = player2;
        
    }
    count;
    currentPlayer;
    toggleStatus =true;
    winArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];


    init(){
        
        this.count = 9;
        this.currentPlayer = this.player1;
        let box=document.querySelectorAll('.box-element');
        for(let i=0; i<box.length;i++)
        {
            box[i].textContent = "";
            box[i].classList.remove("marked");
            box[i].style.color = "black";
        }
        this.gameBoard.boxArray = ["","","","","","","","",""];
        this.messageDisplay(this.currentPlayer.name + " turns");
    }


    playerWin()
    {
        for(let i = 0 ; i<8;i++)
        {
            let win = this.winArray[i];
            if(this.gameBoard.boxArray[win[0]] == this.currentPlayer.symbol && 
                this.gameBoard.boxArray[win[1]] == this.currentPlayer.symbol && 
                this.gameBoard.boxArray[win[2]] == this.currentPlayer.symbol)
            
            {   
                document.querySelector('#p-' + (win[0]+1)).style.color="pink";
                document.querySelector('#p-' + (win[1]+1)).style.color="pink";
                document.querySelector('#p-' + (win[2]+1)).style.color="pink";
                return true;
        
            }
            
        }
        return false;

    }

  

    messageDisplay(message,color = "black"){
        let dipElement = document.querySelector('.player-to-play');
        dipElement.textContent =  message;
        dipElement.style.color = color;
    }



    togglePlayer(){
        if(this.currentPlayer == this.player1)
        {
            this.currentPlayer = this.player2;
        }

        else if(this.currentPlayer == this.player2)
        {
            this.currentPlayer = this.player1;
        }
            
        this.messageDisplay(this.currentPlayer.name + " turns");
      
        
    }


    run(){
        
            document.querySelector('.outer-box').addEventListener('click', (e) => {
                
                

                if(!this.playerWin()){
                    this.gameBoard.fillBox(e);
                    this.count--;
                }

            
        
                if(this.playerWin())
                {   
                    this.messageDisplay(this.currentPlayer.name + " wins ", 'green')
                    
                    
                    return; //why this return dose not work. 
                }
                else if(this.count == 0){
                    this.messageDisplay("DRAW", 'red');
                }
                else if(this.toggleStatus)
                {
                    this.togglePlayer();
                }
            })

            document.querySelector('.reset').addEventListener('click',this.init.bind(this));
        
        if(this.playerWin())
        {
            return;
        }
        //this.togglePlayer();

    }
    

}

const player1 = new Player('Player 1','X',[]);
const player2 = new Player('Player 2','O',[]);
const gameBoard = new Board(["","","","","","","","",""]);
const gcObj = new gameCrontroler('Tic tac toe',gameBoard, player1,player2);

gcObj.init();
gcObj.run();


