function buttonClick(type){
  var redB = document.getElementById("RedBox")
  var yellowB = document.getElementById("yellowBox")
  var userYname = document.getElementById("userYnameOnTop")
  var userRname = document.getElementById("userRnameOnTop")
  if(type == "tournament"){
    for(var i=0;i<9;i++){
      for(var j=0;j<8;j++){
        var lastplayer = "yellow";
        document.getElementById("b"+i+j).onclick = function buttonClick(){
          if(lastplayer == "yellow"){
            redB.style.backgroundColor = "red"
            yellowB.style.backgroundColor = "white"
            userYname.style.color = "white"
            userRname.style.color = "red"
            buttonRow = this.id.charAt(2)
            for(var k = 8; k>=0;k--){
              var buttonRowGetId = document.getElementById("b"+k+buttonRow)
              if(buttonRowGetId.classList.contains("empty")){
                buttonRowGetId.style.backgroundColor= "yellow"
                buttonRowGetId.classList.remove("empty")
                buttonRowGetId.classList.add("yellow")
                lastplayer = "red"
                winAlgorithm("tournament")
                break
              }
            }
          }
          /* switch between player -- player 2*/
          else if(lastplayer == "red"){
            buttonRow = this.id.charAt(2)
            redB.style.backgroundColor = "white"
            yellowB.style.backgroundColor = "yellow"
            userYname.style.color = "yellow"
            userRname.style.color = "white"
            for(var k = 8; k>=0;k--){
              var buttonRowGetId = document.getElementById("b"+k+buttonRow)
              if(buttonRowGetId.classList.contains("empty")){
                buttonRowGetId.style.backgroundColor= "red"
                buttonRowGetId.classList.remove("empty")
                buttonRowGetId.classList.add("red")
                lastplayer = "yellow"
                winAlgorithm("tournament")
                break
              }
            }
          }
        }
      }
    }
  }
}
function winAlgorithm(type){
  if(type == "tournament"){
    var winner;
    //checks vertically and if winner is found then disable the buttons
    for(var i = 0;i<9;i++){
      for(var j=0;j<6;j++){
        var buttonIJ = document.getElementById("b"+i+j)
        var nextButton = document.getElementById("b"+i+(j+1))
        var secondNextButton = document.getElementById("b"+i+(j+2))
        var thirdNextButton = document.getElementById("b"+i+(j+3))
        if(buttonIJ.style.backgroundColor == "yellow" && nextButton.style.backgroundColor == "yellow" && secondNextButton.style.backgroundColor == "yellow" && thirdNextButton.style.backgroundColor == "yellow")
        {
          //alert("Yellow wins")
          winner = "yellow"
          winPopUpColorChange(winner,"tournament")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
              buttonIJ.disabled = "true"
            }
          }
        }
        if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red")
        {
          //alert("Red Wins")
          winner = "red"
          winPopUpColorChange(winner,"tournament")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
              buttonIJ.disabled = "true"
            }
          }
        }
      }
    }
    //checks horizontally and if winner is found then disable the buttons
    for(var i = 0;i<6;i++){
      for(var j=0;j<8;j++){
        var buttonIJ = document.getElementById("b"+i+j)
        var nextButton = document.getElementById("b"+(i+1)+j)
        var secondNextButton = document.getElementById("b"+(i+2)+j)
        var thirdNextButton = document.getElementById("b"+(i+3)+j)
        if(buttonIJ.style.backgroundColor == "yellow" && nextButton.style.backgroundColor == "yellow" && secondNextButton.style.backgroundColor == "yellow" && thirdNextButton.style.backgroundColor == "yellow")
        {
          //alert("Yellow Wins")
          winner = "yellow"
          winPopUpColorChange(winner,"tournament")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
            buttonIJ.disabled = "true"
            }
          }
        }
        if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red")
        {
          //alert("Red Wins")
          winner = "red"
          winPopUpColorChange(winner,"tournament")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
              buttonIJ.disabled = "true"
            }
          }
        }
      }
    }
    //checks diagnolly from top-left corner to bottom-right corner and if winner is found then disable the buttons
    for(var i =0;i<6;i++){
      for(var j =0;j<5;j++){
        var buttonIJ = document.getElementById("b"+i+j)
        var nextButton = document.getElementById("b"+(i+1)+(j+1))
        var secondNextButton = document.getElementById("b"+(i+2)+(j+2))
        var thirdNextButton = document.getElementById("b"+(i+3)+(j+3))
        if(buttonIJ.style.backgroundColor == "yellow" && nextButton.style.backgroundColor == "yellow" && secondNextButton.style.backgroundColor == "yellow" && thirdNextButton.style.backgroundColor == "yellow")
        {
          //alert("Yellow wins")
          winner = "yellow"
          winPopUpColorChange(winner,"tournament")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
              buttonIJdisabled = "true"
            }
          }
        }
        if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red")
        {
          //alert("Red Wins")
          winner = "red"
          winPopUpColorChange(winner,"tournament")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
              buttonIJ.disabled = "true"
            }
          }
        }
      }
    }
    //checks diagnolly from top-right corner to bottom-left corner and if winner is found then disable the buttons
    for(var i = 0;i<6;i++){
      for(var j = 3; j<8;j++){
        var buttonIJ = document.getElementById("b"+i+j)
        var nextButton = document.getElementById("b"+(i+1)+(j-1))
        var secondNextButton = document.getElementById("b"+(i+2)+(j-2))
        var thirdNextButton = document.getElementById("b"+(i+3)+(j-3))
        if(buttonIJ.style.backgroundColor == "yellow" && nextButton.style.backgroundColor == "yellow" &&secondNextButton.style.backgroundColor == "yellow" && thirdNextButton.style.backgroundColor == "yellow"){
          //alert("Yellow Wins")
          winner = "yellow"
          winPopUpColorChange(winner,"tournament")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
              buttonIJ.disabled = "true"
            }
          }
        }
        if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red"){
          //alert("Red wins")
          winner = "red"
          winPopUpColorChange(winner,"tournament")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
              buttonIJ.disabled = "true"
            }
          }
        }
      }
    }
    return winner
  }
  else if(type == "reg"){
    checkVertically()
    checkHorizontally()
    checkDiagnollyTopLeft()
    checkDiagnollyTopRight()
  }
}
function createButton(){
  for(var i=0;i<9;i++){
    for(var j=0;j<8;j++){
      var b = document.createElement("button")
      b.className = "button empty col" + j
      b.id = "b"+i+j
      document.getElementById("sqBox").appendChild(b)
      b.style.width = "10%"
      b.style.height = "10%"
      b.style.marginTop = "1%"
      b.style.marginLeft = "1%"
      b.style.marginRight = "1%"
      b.style.marginBottom = "1%"
      b.style.left = j*12.5 +"%"
      b.style.top = i *11+"%"
    }
  }
}
function winPopUpColorChange(color,type){
  var nextB = document.getElementById("nextButton")
  var playAgainB = document.getElementById("playAgainButton")
  var exitB = document.getElementById("exitButton")
  var modalBox  = document.getElementById("boxAfterWinLose")
  var modalHeader = document.getElementsByClassName("modal-header")[0]
  var modalFooter = document.getElementsByClassName("modal-footer")[0]
  var winnerId = document.getElementById("winner")
  if(type == "tournament"){
    nextB.style.backgroundColor = color
    playAgainB.style.display = "none"
    exitB.style.backgroundColor = color
    modalBox.style.display = "block";
    modalHeader.style.backgroundColor = color
    modalFooter.style.backgroundColor = color
    winnerId.innerHTML = color.charAt(0).toUpperCase()+color.slice(1)+" Wins..."
  }
}
function createNewGame(type){
  document.getElementById("sqBox").remove()
  var b = document.createElement("div")
  b.id="sqBox"
  b.className = "sqBox"
  document.getElementById("gameBox").appendChild(b)
  document.getElementById("sqBox").style.display = "block"
  createButton()
  if(type == "tournament"){
    document.getElementById("gameBox").style.display = "block"
    buttonClick("tournament")
  }
  document.getElementById("boxAfterWinLose").style.display = "none"
}
var redArray = []
var yellowArray = []
function winnerCalculator(x){
  if(x == "yellow"){
    yellowArray.push(x)
  }
  else if(x == "red"){
    redArray.push(x)
  }
}
var numOfGame = 0;
function playTournament(){
  ++numOfGame;
  createNewGame("tournament")
  if(numOfGame > 2){
    for(var i =0;i<9;i++){
      for(var j =0;j<8;j++){
        document.getElementById("b"+i+j).disabled = "true"
      }
    }
    if(redArray.length > yellowArray.length){
      alert("red is winner of the tournament")
    }
    else{
      alert("yellow is winner of the tournament")
    }
  }
  document.getElementById("RedBox").style.backgroundColor = "white"
  document.getElementById("yellowBox").style.backgroundColor = "yellow"
  document.getElementById("yellowBox").style.display = "block"
  document.getElementById("RedBox").style.display = "block"

  document.getElementById("userRnameOnTop").style.display = "block"
  document.getElementById("userYnameOnTop").style.display = "block"
  document.getElementById("userYnameOnTop").style.color = "yellow"
}
