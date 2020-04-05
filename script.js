let inputs = [];
let len = 9;
let full = false;
let position;
let option;

let player = 1;
let win =false;

let count = 0;
let emptyPositions;

//console.log(inputs);


searchEmptyPosition = () => {
    emptyPositions="";
    for(let i=0; i<len;i++)
    {
        if(inputs[i] == null )
        {   

            emptyPositions = emptyPositions+ " "  + (i+1);
            
        }
    }
    
}
 takeInput  = () =>{
    
    searchEmptyPosition();
    

    let message = "player " + player + " " + "select the position out of - " + emptyPositions;
    
    position = prompt(message);


    if(inputs[position-1]!=null)
    {
        alert("already occoupied");
        count--;
        return;
    }

    if(position == 1 ||position == 2 || position == 3 || position == 4 ||position == 5 ||position == 6 ||position == 7 ||position == 8 ||position == 9 )
    {
        if(player == 1)
        {
            option = "X"
        }

        else if(player == 2)
        {
            option = "O"
        }
            inputs[position-1] = option ;
            console.log(inputs.length);
            var pos = document.querySelector("#p-" + position);
            pos.textContent = option;
    

        
    }

    else{
        alert("invalid position try again !");
        takeInput();
    }

    
    
 }

 

 
while(!win && !full)
{
  takeInput();
  if(player == 1)
  {
      player = 2;
  }

  else if(player == 2)
  {
      player = 1;
  }

  count++;
  
  if(count === 9)
  {
      full = true;
  }
}
