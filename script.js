var boxValues = [];
var arrayOfPlayer1=[];
var arrayOfPlayer2=[];
var player = 1;
var playerwin = false;
var boxClicked;
var boxClickedId;
var box;


togglePlayer = () => {
    
    if(player == 1)
    {
        player = 2;
        
    }

    else if (player == 2)
    {
        player = 1;
    }
    playerTurnDisplay(player);
}

playerTurnDisplay = (player) => {
    let dipElement = document.querySelector('.player-to-play');
    dipElement.textContent = "Player " + player + " turns"
}


fillBox = () => {
     box = document.querySelector('#' + boxClickedId);
   
    if(player == 1)
    {
        box.textContent = "X";
        arrayOfPlayer1.push(boxClicked-1);
        boxValues[boxClicked-1] = 1;
    }

    if(player == 2)
    {
        box.textContent = "O";
        arrayOfPlayer2.push(boxClicked-1);
        boxValues[boxClicked-1] = 2;
    }

    
    
}


 

winCalculator = (player) => {

    function checkForElement(item){
        for(i=0;i<winArray.length;i++)
        {
            if(winArray[i][0]== item[0] && winArray[i][1]== item[1] && winArray[i][2]== item[2] 
                || winArray[i][0]== item[1] && winArray[i][1]== item[2] && winArray[i][2]== item[3]
                || winArray[i][0]== item[0] && winArray[i][1]== item[2] && winArray[i][2]== item[3]
                || winArray[i][0]== item[0] && winArray[i][1]== item[1] && winArray[i][2]== item[3])
            {
                return true;
            }
        }
    }
    
    function playerWinDisplay()
    {
            let win = document.querySelector('.player-win');
            win.textContent = "Player " + player + " wins";
            win.style.color = "green"
            let dipElement = document.querySelector('.player-to-play');
            dipElement.style.display = "none";
    }

    var winArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    
    if(player == 1)
    {
        if(checkForElement(arrayOfPlayer1.sort()))
        {
            console.log("player 1 wins!");
            playerWinDisplay();
            
            playerwin = true;
        }
        
        
    }

    else if(player == 2)
    {
        if(checkForElement(arrayOfPlayer2.sort()))
        {
            console.log("player 2 wins!");
            playerWinDisplay();
            playerwin = true;
        }
    }

}

function isDraw(){

}
    
(function gameControler()
{
    var error;
    var count=9;
    window.onclick = e => {
        if(count >0 && !playerwin)
        {
            boxClickedId = e.target.id;
            boxClicked = e.target.id.substring(2,3); 
            console.log(boxClicked);
            box = document.querySelector('#' + boxClickedId);
            if(box.textContent != "X" && box.textContent !="O" || box.textContent == "")
            {
                
                fillBox();
                winCalculator(player);
                togglePlayer();
                count--;
                if(count == 0)
                {
                    let win = document.querySelector('.player-win');
                    win.textContent = "DRAW";
                    win.style.color = "red";   
                }
            }
    
            else{
                
                error = document.querySelector('.error')
                error.textContent = "already filled box choose another box";
                
            }
        }

        else{
            if(!playerwin)
            {
                let win = document.querySelector('.player-win');
                win.textContent = "DRAW";
                win.style.color = "red";
            }
            
        }
       
        
    }


})()
