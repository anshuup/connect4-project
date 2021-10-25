function displayBoxGuest(){
  document.getElementById("guestSqBox").style.display = "block"
  document.getElementById("RedBox").style.backgroundColor = "white"
  document.getElementById("RedBox").style.display = "block"
  document.getElementById("yellowBox").style.backgroundColor = "yellow"
  document.getElementById("yellowBox").style.display = "block"
  document.getElementById("body").onload= createButtonGuest()
  document.getElementById("body").onload = buttonClickGuest("reg")
  document.getElementById("nextButton").style.display = "none"
  document.getElementById("myModal").style.display = "none"
  document.getElementById("userRnameOnTop").style.display = "block"
  document.getElementById("userYnameOnTop").style.display = "block"
  document.getElementById("userYnameOnTop").style.color = "yellow"
}
function createNewGameGuest(type){
  document.getElementById("guestSqBox").remove()
  var b = document.createElement("div")
  b.id="guestSqBox"
  b.className = "guestSqBox"
  document.getElementById("body").appendChild(b)
  document.getElementById("guestSqBox").style.display = "block"
  createButtonGuest()
  if(type == "reg"){
    buttonClickGuest("reg")
  }
  document.getElementById("myModal").style.display = "none"
}
function createButtonGuest(){
  for(var i=0;i<9;i++){
    for(var j=0;j<8;j++){
      var b = document.createElement("button")
      b.className = "button empty col" + j
      b.id = "b"+i+j
      document.getElementById("guestSqBox").appendChild(b)
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
function buttonClickGuest(type){
  var redB = document.getElementById("RedBox")
  var yellowB = document.getElementById("yellowBox")
  var userYname = document.getElementById("userYnameOnTop")
  var userRname = document.getElementById("userRnameOnTop")
  if(type == "reg"){

    for(var i=0;i<9;i++){
      for(var j=0;j<8;j++){
        var lastplayer = "yellow";
        document.getElementById("b"+i+j).onclick = function buttonClickGuest(){
          if(lastplayer == "yellow"){
        //    document.getElementById("turn").innerHTML = "Red turn"
            redB.style.backgroundColor = "red"
            yellowB.style.backgroundColor = "white"
            userYname.style.color = "white"
            userRname.style.color = "red"
            buttonRow = this.id.charAt(2)

						let randomI = Math.floor((Math.random() * 8)+ 0)
						let randomJ = Math.floor((Math.random() * 7) + 0);
						console.log("b"+randomI+randomJ)
						setTimeout(function(){
									document.getElementById("b"+randomI+randomJ).click()
								},500)
						winAlgorithm('reg')

            for(var k = 8; k>=0;k--){
              var buttonRowGetId = document.getElementById("b"+k+buttonRow)
              if(buttonRowGetId.classList.contains("empty")){
                buttonRowGetId.style.backgroundColor= "yellow"
                buttonRowGetId.classList.remove("empty")
                buttonRowGetId.classList.add("yellow")
                lastplayer = "red"
                break
              }
            }
          }
          /* switch between player -- player 2 */
          else if(lastplayer == "red"){
            buttonRow = this.id.charAt(2)
            redB.style.backgroundColor = "white"
            yellowB.style.backgroundColor = "yellow"
            userYname.style.color = "yellow"
            userRname.style.color = "white"
            for(var k = 8; k>=0;k--){
              var buttonRowGetId = document.getElementById("b"+k+buttonRow)
							console.log(buttonRowGetId)
              if(buttonRowGetId.classList.contains("empty")){
                buttonRowGetId.style.backgroundColor= "red"
                buttonRowGetId.classList.remove("empty")
                buttonRowGetId.classList.add("red")
                lastplayer = "yellow"
                winAlgorithm("reg")
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
  if(type == "reg"){
    var winner;
    /*checks vertically and if winner is found then disable the buttons*/
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
          winPopUpColorChange(winner,"reg")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
              buttonIJ.disabled = true
            }
          }
        }
        if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red")
        {
          //alert("Red Wins")
          winner = "red"
          winPopUpColorChange(winner,"reg")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
							buttonIJ.disabled = true
            }
          }
        }
      }
    }
    /*checks horizontally and if winner is found then disable the buttons*/
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
          winPopUpColorChange(winner,"reg")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
							buttonIJ.disabled = true
            }
          }
        }
        if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red")
        {
          //alert("Red Wins")
          winner = "red"
          winPopUpColorChange(winner,"reg")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
							buttonIJ.disabled = true
            }
          }
        }
      }
    }
    /*checks diagnolly from top-left corner to bottom-right corner and if winner is found then disable the buttons*/
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
          winPopUpColorChange(winner,"reg")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
							buttonIJ.disabled = true
            }
          }
        }
        if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red")
        {
          //alert("Red Wins")
          winner = "red"
          winPopUpColorChange(winner,"reg")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
							buttonIJ.disabled = true
            }
          }
        }
      }
    }
    /*checks diagnolly from top-right corner to bottom-left corner and if winner is found then disable the buttons*/
    for(var i = 0;i<6;i++){
      for(var j = 3; j<8;j++){
        var buttonIJ = document.getElementById("b"+i+j)
        var nextButton = document.getElementById("b"+(i+1)+(j-1))
        var secondNextButton = document.getElementById("b"+(i+2)+(j-2))
        var thirdNextButton = document.getElementById("b"+(i+3)+(j-3))
        if(buttonIJ.style.backgroundColor == "yellow" && nextButton.style.backgroundColor == "yellow" &&secondNextButton.style.backgroundColor == "yellow" && thirdNextButton.style.backgroundColor == "yellow"){
          //alert("Yellow Wins")
          winner = "yellow"
          winPopUpColorChange(winner,"reg")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
							buttonIJ.disabled = true
            }
          }
        }
        if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red"){
          //alert("Red wins")
          winner = "red"
          winPopUpColorChange(winner,"reg")
          winnerCalculator(winner)
          for(var i =0;i<9;i++){
            for(var j =0;j<8;j++){
							buttonIJ.disabled = true
            }
          }
        }
      }
    }
    return winner
  }
}
function hideWindow(){
  document.getElementById("myModal").style.display = "none";
}/*change the color of dialogue box which opens up after winning the game for tournament*/
function winPopUpColorChange(color,type){
  var nextB = document.getElementById("nextButton")
  var playAgainB = document.getElementById("playAgainButton")
  var exitB = document.getElementById("exitButton")
  var modalBox  = document.getElementById("myModal")
  var modalHeader = document.getElementsByClassName("modal-header")[0]
  var modalFooter = document.getElementsByClassName("modal-footer")[0]
  var winnerId = document.getElementById("winner")
  if(type == "reg"){
    nextB.style.display = "none"
    playAgainB.style.backgroundColor = color
    exitB.style.backgroundColor = color
    modalBox.style.display = "block";
    modalHeader.style.backgroundColor = color
    modalFooter.style.backgroundColor = color
    winnerId.innerHTML = color.charAt(0).toUpperCase()+color.slice(1)+" Wins..."
  }
}
function goToMainPage(){
	window.location.href = "/"
}
