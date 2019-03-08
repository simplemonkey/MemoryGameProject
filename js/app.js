
// array to hold all icons
const icons = [
    "fa fa-gem",
    "fa fa-gem",
    "fa fa-paper-plane",
    "fa fa-paper-plane",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-bomb",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bolt"
];
const deck=document.querySelector(".deck");
let openedCardsArray=[];
let matchedCards=[];
let myVar;
let time_elapsed=0;
//to hold minutes and seconds for timer
let m,s;    

// Create cards with icons
function createCards(){
    for(i=0;i<icons.length;i++){
        let card=document.createElement("li");
        card.innerHTML=`<i class="${icons[i]}"></i>`;
        card.classList.add("card");        
        deck.appendChild(card);
        onClick(card);        
        }
}

// Add Event Listener to cards for click
function onClick(card){
    card.addEventListener("click",function(){
        // consition to check if a card is already opened
        if(openedCardsArray.length===1){        
            card.classList.add("open", "show","disable");
            openedCardsArray.push(this);
            let currentCard=this.classList;
            let previousCard=openedCardsArray[0].classList;       

            // compare two open cards
            if(this.innerHTML === openedCardsArray[0].innerHTML){
                // match case
                console.log("macthed");
                this.classList.add("match");
                openedCardsArray[0].classList.add("match");
                matchedCards.push(this.innerHTML,openedCardsArray[0])
                // check if game is over
                setTimeout(function(){
                    if(matchedCards.length === icons.length){
                        var date=new Date();                     
                           console.log(time_elapsed); //time_elapsed variable holds time
                            // to convert time to minutes:seconds
                            timer();
                            // to reset setInterval
                            clearInterval(myVar);  
                            //comgratulations popup when game ends 
                            callModal();                      
                         }                        
                    },500);
                }

            // cards don't match
            else{                
                setTimeout(function(){
                    currentCard.remove("open","show","disable");
                    previousCard.remove("open","show","disable");
                },500)
            }            
            openedCardsArray=[];
            countMoves();                   
        }

        //  condition for no opened card
        else{
            card.classList.add("open", "show","disable");
            openedCardsArray.push(this);
                // Start Timer on first click 
                if(moves<1){                    
                    // display timer for every 1 second elapsed using setInterval                       
                    myVar=setInterval(function(){
                    time_elapsed++;
                    console.log(time_elapsed);                        
                    timer();
                    },1000);  
                }
        }
    });
}

// Timer to display time in minutes and seconds
function timer(){
    let minutes=Math.floor(time_elapsed/60);
    let seconds=Math.round(time_elapsed - minutes*60);
    minutes=checkTime(minutes);
    seconds=checkTime(seconds);
    document.querySelector(".timer").innerHTML=`${minutes}:${seconds}`;
    document.querySelector(".modal .time").innerHTML=`${minutes}:${seconds}`;
}

// Additional timer function to pre-append 0 in front of numbers less than 0 
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

// Restart game
const restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame);
function restartGame(){
    // deck is cleared
    deck.innerHTML="";
    matchedCards=[];
    moves=0;
    document.querySelector(".moves").innerHTML=`${moves}`;
    time_elapsed=0;
    document.querySelector(".timer").innerHTML="0";
    clearInterval(myVar);  

    // re-create deck
    shuffle(icons);
    createCards()
}

// Count Moves and Rating
let moves=0;
function countMoves(){
    moves++;   
    document.querySelector(".moves").innerHTML=moves;
    let rating = document.querySelector(".rating");    
    let stars=document.querySelector(".stars");
    // default 3 stars for moves less than 10
    if(moves<10){
        stars.innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
        rating.innerHTML=`<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>`;
    }
    // for moves between 10 and 16 - 2star raing
    if(moves>=10 && moves<16){
        stars.innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
        rating.innerHTML=`<i class="fa fa-star"></i><i class="fa fa-star"></i>`;
    }
    // for moves greater than 16 - 1 star rating (being the least )
    else if(moves>=16) {
        stars.innerHTML=`<li><i class="fa fa-star"></i></li>`
        rating.innerHTML=`<i class="fa fa-star"></i>`;
    }      
}

// Shuffle function to randomly display deck of cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Modal logic
function callModal(){    
// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
//when game completes trigger event
modal.style.display = "block";
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal , close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// When user clicks ok
const restartModal =document.getElementById("OkButton");
restartModal.onclick=function(){    
    modal.style.display = "none";
    restartGame();
}
}

// initiate deck of cards for the fisrt time
shuffle(icons);
createCards();


