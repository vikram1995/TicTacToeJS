
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
    playingStatus;
   // winArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    winMap = new Map([[0,[[1,2],[3,6],[4,8]]],
                    [1,[[0,2],[4,7]]],
                    [2,[[0,1],[4,6],[5,8]]],
                    [3,[[0,6],[4,5]]],
                    [4,[[0,8],[1,7],[2,6],[3,5]]],
                    [5,[[2,8],[3,4]]],
                    [6,[[0,3],[2,4],[7,8]]],
                    [7,[[1,4],[6,8]]],
                    [8,[[0,4],[2,5],[6,7]]]])


    init(){
        this.playingStatus = true;
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


  /*  playerWin()
    {
        console.log("win logic is called");
        for(let i = 0 ; i<8;i++)
        {
            let win = this.winArray[i];
            if(this.gameBoard.boxArray[win[0]] == this.currentPlayer.symbol && 
                this.gameBoard.boxArray[win[1]] == this.currentPlayer.symbol && 
                this.gameBoard.boxArray[win[2]] == this.currentPlayer.symbol)
            
            {   
                document.querySelector('#p-' + (win[0]+1)).style.color="orange";
                document.querySelector('#p-' + (win[1]+1)).style.color="orange";
                document.querySelector('#p-' + (win[2]+1)).style.color="orange";
                this.toggleStatus=false;
                return true;
        
            }
            
        }
        return false;

    }

    */

    advanceLogicWinClaculactor(box,symbolIndex)
    {
       
       var possibleCombinationForWin = this.winMap.get(symbolIndex);
       for(let i=0;i<possibleCombinationForWin.length;i++)
       {
           let win = possibleCombinationForWin[i];
           
           if(this.gameBoard.boxArray[win[0]] == this.currentPlayer.symbol && this.gameBoard.boxArray[win[1]] == this.currentPlayer.symbol)
           {    
                
                
                document.querySelector('#p-' + (win[0]+1)).style.color="orange";
                document.querySelector('#p-' + (win[1]+1)).style.color="orange";
                document.querySelector('#p-' + ((symbolIndex)+1)).style.color="orange";
                
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

    fillBox(box,symbolIndex){

        
        if(this.gameBoard.isBoxEmpty(box) && this.playingStatus)
        {
            box.textContent = this.currentPlayer.symbol;
            this.gameBoard.boxArray[symbolIndex] = box.textContent = this.currentPlayer.symbol;
            
            box.classList.add ("marked");
            this.toggleStatus = true;
        }

        else{
            this.toggleStatus = false;
        }
    }

    run(){
            document.querySelector('.outer-box').addEventListener('click', (e) => {
                
                var box = document.querySelector('#' + e.target.id);
                var symbolIndex = (e.target.id.substring(2,3)) - 1;

                if(this.playingStatus){

                    if(this.count>5 || !this.advanceLogicWinClaculactor(box,symbolIndex)){
                        this.fillBox(box,symbolIndex);
                        this.count--;
                        //console.log(this.count);
                        
                    }
                    
                    console.log("count :"+ this.count);
                    console.log("win :"+ this.advanceLogicWinClaculactor(box,symbolIndex));
    
                    if(this.count<=4 && this.advanceLogicWinClaculactor(box,symbolIndex)){
                        this.fillBox(box,symbolIndex);   
                        this.messageDisplay(this.currentPlayer.name + " wins ", 'green');
                        this.toggleStatus=false;
                        this.playingStatus = false;
                               
                    }

                    else if(this.count == 0){

                        this.messageDisplay("DRAW",'red');
                        this.playingStatus=false;
                        this.toggleStatus=false;
                    }
    
                    if(this.toggleStatus)
                    {
                        this.togglePlayer();
                    }
                }
                
              
                
            })

            document.querySelector('.reset').addEventListener('click',this.init.bind(this));
        
        

    }
    

}

