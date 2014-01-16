
//<!--
//ok - blank square has value 0, white has value 1, black has value 2
sqblank=0;
sqwhite=1;
sqblack=2;
firstmove=true;


//boardarray - contains what's in the board - declaration
boardarray=new Array(8);

for(i=0;i<8;++i){
    boardarray[i] = new Array(i);
}


//reset the board. Set all squares except the middle four to blank.
function doreset(){
    for (i=1; i<=8; ++i){
        for (j=1; j<=8; ++j){
            setsquare(i,j, sqblank);
            
            }
    }
//set up initial squares
    setsquare(4,4, sqwhite);
    setsquare(5,5, sqwhite);
    setsquare(4,5, sqblack);
    setsquare(5,4, sqblack);
//whose turn is it? White goes first...
    whoseturn = sqblack;
    nextmove();
}

function getscore(){
//update the score on the board.
    wtscore=calculatescore(sqwhite);
    bkscore=calculatescore(sqblack);
    showscore(wtscore,bkscore)
}

function calculatescore(icol){
    result = 0;
    for (i=1; i<=8; ++i){
        for (j=1; j<=8; ++j){
            if (boardarray[i-1][j-1] == icol){++result;}
        }
    }
    return result;
}

function showscore(wtscore, bkscore){
    document.boardform.whitesc.value=wtscore;
    document.boardform.blacksc.value=bkscore;
}


function cancapture(x,y,n)
//function to see if this piece can capture something
{
//we're looking at all the surrounding squares.
    for (a=-1;a<=1;++a)
    {
        for(b=-1;b<=1;++b)
        {
            if(!(a == 0 && b == 0))
            {
            //check if we can capture in this direction.
                if(cancapturedir(x,y,a,b,n))
                {
                return true;
                break;
                }
            }
        }
    }

//otherwise...
    return false;
}

function cancapturedir(x,y,xoff,yoff,n)
//xoff, yoff are between -1 and 1.
//if something can be captured in the direction
{
    thiscolor = n;
    thatcolor = 0;
    result = false;
    
    if (thiscolor == 1){ thatcolor = 2;}
    if (thiscolor == 2){ thatcolor = 1;}
//doesn't do anything yet.
//to capture something - in a straight line, there must be
//(1) no blank squares before a square of the same colour 
//(2) at least one square of the opposite colour before a square of the same colour.

//if we're out of bounds:
    if(
        x+xoff+xoff < 1 || 
        x+xoff+xoff > 8 || 
        y+yoff+yoff < 1 || 
        y+yoff+yoff > 8
       ) 
    { 
       return false; 
    
    }

    //no blank squares...
    if(boardarray[x+xoff-1][y+yoff-1] == sqblank )
    {
        return false;
    }
    
    //one square of opposite colour before a square of the same colour.
    if(
    boardarray[x+xoff-1][y+yoff-1]== thatcolor &&
    (
    boardarray[x+xoff+xoff-1][y+yoff+yoff-1] == thiscolor || cancapturedir(x+xoff,y+yoff,xoff,yoff,thiscolor)
    ))
    {
        return true;
    }
    return false;
}


//isvalidmove - check if this is a valid move for this colour
function isvalidmove(x,y,n){

    if (x<1 || x >8 || y<1 || y> 8)
    {
        return false;
    }
//if the square is filled
    if(boardarray[x-1][y-1]!=sqblank)
    {
        return false;
    }
//if nothing is captured
    
    if(cancapture(x,y,n)!=true)
    {
        return false;
    }
    
    return true;
}

//setsquare - changes square at x,y to the colour of n. changes both the image and the array.
function setsquare(x,y,n){
    boardarray[x-1][y-1]=n;
    
    strcode = "document.sq" + x + "x" + y + ".src=";
    switch (n){
      case sqwhite : 
        strcode = strcode + "\"whitesquare.gif\"";
        break;
      case sqblack: 
        strcode = strcode + "\"blacksquare.gif\"";
        break;
      default : 
        strcode = strcode + "\"blanksquare.gif\"";
    }
    
    eval(strcode);
    
}

function validmovesexist(n)
//see if there are any valid moves for this color. If not - show an alert and skip.
{
    strString = "";
    result=false;
    //for each square...
    for(i=1;i<=8;++i){
        for(j=1;j<=8;++j){
        //if it is a valid move...
                if (isvalidmove(i,j,n)){
                    result=true;
                    return result;
                    break;
            }
        }
    }
    
    
    return result;
}


function nextmove(){
    getscore();
    
    if (whoseturn==sqwhite && validmovesexist(sqblack))
    {
        whoseturn=sqblack;
        document.nextmove.src="blacksquare.gif"
    }
    else
    {
        if(whoseturn==sqblack && validmovesexist(sqwhite))
        {
            whoseturn=sqwhite;
            document.nextmove.src="whitesquare.gif"
        }
    }


    if(!(validmovesexist(sqwhite) || validmovesexist(sqblack)))
    {
        gameover();
    }
    else
    {
        if( iscomputersmove(whoseturn) == true)
        {
            docomputersmove(whoseturn);
        }
    }


}

function iscomputersmove(test){
//if whoseturn is computer's move return true
if(document.boardform.compwhite.checked==true && test == sqwhite){return true;}
if(document.boardform.compblack.checked==true && test == sqblack){return true;}

return false;
}

function docomputersmove(icol){
//whatever has to be done for the computers move.
//we're already checking if valid moves exist so don't need to -recheck.
//score all valid squares.
//move in highest scoring square.
//highestscoringsquare - highx, highy
//highestscore - highscore
highscore=0.0;
highx=0;
highy=0;

    for (i=1;i<=8;i++)
    {
        for(j=1;j<=8;j++)
        {
//if this square scores more than previous best scoring square, update the highest scoring square

            currscore = getvalue(i,j,icol);
            
            if(currscore > highscore){
                highx=i;
                highy=j;
                highscore = currscore;
            }
        }
    }

    domove(highx,highy,icol);
}

function getvalue(i,j,icol){
//if this is a valid move for this colour, return a score for moving here.
    score = 0;
    if(isvalidmove(i,j,icol)){
        score = 1;
        //insert scoring code here
        //at the moment all valid moves are scored equally (not good!)

        //for each direction, how many pieces are captured?
        for (x=-1;x<=1;x++)
        {
            for(y=-1;y<=1;y++)
            {
                if(!(x == 0 && y == 0))
                {
                //check if we can capture in this direction.
                    if(cancapturedir(i,j,x,y,icol))
                    {
                        score = score + scoreinbetweensdir(i,j,x,y,icol);
                    }
                }
            }
        }
       

    }
    return score;
}


function gameover(){
    wtscore = calculatescore(sqwhite);
    bkscore = calculatescore(sqblack);
    
    if (wtscore> bkscore){winner="Winner is White"}
    if (bkscore> wtscore){winner="Winner is Black"}
    if (wtscore==bkscore){winner="Draw"}
    
    alert("Game over!\n\nScore is:\nwhite " + calculatescore(sqwhite) + "\nblack " + calculatescore(sqblack) +
    "\n" + winner);

}

//do a move...
function domove(x,y,n){
   //if this is a valid move...

   if(isvalidmove(x,y,n))
   { 
        //set this square
        setsquare(x,y,whoseturn);
        //fill inbetweens...
        doinbetweens(x,y,n);
        
        //end of move. Other player please!
        nextmove();
   }
}


function doinbetweens(x,y,n){
//this function turns over all the pieces which can be...
//we're looking at all the surrounding squares.
    for (i=-1;i<=1;++i)
    {
        for(j=-1;j<=1;++j)
        {
            if(!(i == 0 && j == 0))
            {
            //check if we can capture in this direction.
                if(cancapturedir(x,y,i,j,n))
                {
                    doinbetweensdir(x,y,i,j,n);
                }
            }
        }
    }
}


function scoreinbetweensdir(x,y,xoff,yoff,n){
//count all inbetween pieces
    thiscolor = n;
    thatcolor = 0;
    result = 0;
    if (thiscolor == 1){ thatcolor = 2;}
    if (thiscolor == 2){ thatcolor = 1;}
    //if the next piece in this direction is the same colour, return 0.
    //if it is the other colour, return 1 + this function on next space.
    if (boardarray[x+xoff-1][y+yoff-1]== thatcolor){
        ++result;
        result +=  scoreinbetweensdir(x+xoff,y+yoff,xoff,yoff,thiscolor);
    }
    return result;
}

function doinbetweensdir(x,y,xoff,yoff,n){
//flip all inbetween pieces...
    thiscolor = n;
    thatcolor = 0;
    
    if (thiscolor == 1){ thatcolor = 2;}
    if (thiscolor == 2){ thatcolor = 1;}
    //if the next piece in this direction is the same colour, do nothing.
    //if it is the other colour, flip it, and run this function on the next space.
    if( boardarray[x+xoff-1][y+yoff-1]== thatcolor){
        setsquare(x+xoff,y+yoff,thiscolor);
        doinbetweensdir(x+xoff,y+yoff,xoff,yoff,thiscolor);
    }
    

    
}


//register click on the board.
function clickat(x,y){
    domove(x,y,whoseturn);

}

doreset();
//-->
