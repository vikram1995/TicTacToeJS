class Board{

    constructor(boxArray){
        this.boxArray = boxArray;
    }

    isBoxEmpty(box){

       
       if(box.classList.contains("marked"))
       {
           return false;
       } 
       else{
           return true;
       }
    }

   
}

