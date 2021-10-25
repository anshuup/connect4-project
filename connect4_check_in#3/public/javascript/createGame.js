let socket = null;
let gameType;
function joinGame(){
  if(socket == null){
    socket = io();
    socket.emit("register",window.location.href.split("/")[4])
    socket.on("userJoined", userNameJoined)
    socket.on("retrieve", retrieveData)
    socket.on("userTurn", turn)
    socket.on("msg",sendMsg)
    socket.on("sendMsg1",displayMsg)
    socket.on("leftGame",disConnectGame)
  }
}
function sendMsg(msg){
  socket.emit("msg1",document.getElementById("chatField").value)
}

function disConnectGame(user){
  if(document.getElementById("boxAfterWinLose").style.display == "block"){

  }
  else{
    document.getElementById("nextButton").style.display = "none"
    document.getElementById("playAgainButton").style.display = "none"
    var exitB = document.getElementById("exitButton")
    var modalBox  = document.getElementById("boxAfterWinLose")
    var modalHeader = document.getElementsByClassName("modal-header")[0]
    var modalFooter = document.getElementsByClassName("modal-footer")[0]
    var winnerId = document.getElementById("winner")
    exitB.style.backgroundColor = "grey"
    modalBox.style.display = "block";
    modalHeader.style.backgroundColor = "grey"
    modalFooter.style.backgroundColor = "grey"
    winnerId.innerHTML = user + "has left the game! You are the winner"
    sendUserNameQuit(window.location.href.split("/")[4],user)
  }
}
function sendUserNameQuit(win,lose){
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
    }
  }
  req.open("POST","/afterLogInPage/connect4_gamePage/updatestatQuit",true)
  req.send(JSON.stringify({winner:win,loser:lose}))
}
let open = false;
function displayMsg(msg,user){
  console.log(user + "sent message")
  if(msg != ""){
    if(user == window.location.href.split("/")[4]){
      let msgUl = document.createElement("ul")
      msgUl.id="myMsg"
      let msgli = document.createElement("li")
      msgli.className = user
      let textNode = document.createTextNode(msg)
      msgli.appendChild(textNode)
      msgUl.appendChild(msgli)
      document.getElementById("chatMiddle").appendChild(msgUl)
      for(i=0;i<document.getElementsByClassName(user).length;i++){
        document.getElementsByClassName(user)[i].style.backgroundColor = "lightblue"
        document.getElementsByClassName(user)[i].style.width = "97%"
        document.getElementsByClassName(user)[i].style.textAlign = "end"
        document.getElementsByClassName(user)[i].style.borderStyle = "solid"
        document.getElementsByClassName(user)[i].style.borderWidth = "0.2px"
        document.getElementsByClassName(user)[i].style.borderRadius = "4px"
        document.getElementsByClassName(user)[i].style.borderColor = "aliceblue"
        document.getElementsByClassName(user)[i].style.padding = "5px"
        document.getElementsByClassName(user)[i].style.wordWrap = "break-word"
        document.getElementsByClassName(user)[i].style.display = "inline"
      }
    }
    else{
      let msgUl = document.createElement("ul")
      msgUl.id="myMsg"
      let msgli = document.createElement("li")
      msgli.className = user
      let textNode = document.createTextNode(msg)
      msgli.appendChild(textNode)
      msgUl.appendChild(msgli)
      document.getElementById("chatMiddle").appendChild(msgUl)
      for(i=0;i<document.getElementsByClassName(user).length;i++){
        document.getElementsByClassName(user)[i].style.backgroundColor = "lightgrey"
        document.getElementsByClassName(user)[i].style.width = "97%"
        document.getElementsByClassName(user)[i].style.textAlign = "left"
        document.getElementsByClassName(user)[i].style.borderStyle = "solid"
        document.getElementsByClassName(user)[i].style.borderWidth = "0.2px"
        document.getElementsByClassName(user)[i].style.borderRadius = "4px"
        document.getElementsByClassName(user)[i].style.borderColor = "aliceblue"
        document.getElementsByClassName(user)[i].style.padding = "5px"
        document.getElementsByClassName(user)[i].style.wordWrap = "break-word"
        document.getElementsByClassName(user)[i].style.display = "inline"
      }
      document.getElementById("newMessageAlert").style.display = "block"
    }
  }
  document.getElementById("chatField").value = ""
}
function hideChatWindow(){
  if(open == false){
    document.getElementById("chatMiddle").style.display = "none"
    document.getElementById("chatBottom").style.display = "none"
    document.getElementById("chatTop").style.top = "91%"
    document.getElementById("chatTop").style.left = "85%"
    document.getElementById("chatTop").style.borderRadius = "15px"
    document.getElementById("chatTop").style.width = "12%"
    document.getElementById("chatTop").style.height = "8%"

    document.getElementById("chatText").style.inenrHTML = ""
    document.getElementById("chatbtn").style.display  = "block"
    document.getElementById("chatText").style.display = "none"

    open = true;
  }
  else if(open == true){
    document.getElementById("chatMiddle").style.display = "block"
    document.getElementById("chatBottom").style.display = "block"
    document.getElementById("chatTop").style.top = "51%"
    document.getElementById("chatTop").style.width = "90%"
    document.getElementById("chatTop").style.height = "6%"
    document.getElementById("chatTop").style.left = "10%"
    document.getElementById("chatTop").style.borderRadius = "0px"
    document.getElementById("chatbtn").style.display  = "none"
    document.getElementById("chatTop").style.borderRadius = "4px"
    document.getElementById("chatText").style.display = "block"
    document.getElementById("newMessageAlert").style.display = "none"
    open = false;
  }
}
let prevColor = "yellow"
let buttonArray = []
let userArray = []
function turn(name){
  //placing found user in userArray
  userArray.push(name)
  //disable all the buttons is opponent player board when the gme starts
  if(userArray.length != 0 && name != userArray[0]){
    for(var i=0;i<9;i++){
      for(var j=0;j<8;j++){
        document.getElementById("b"+i+j).disabled = true;
      }
    }
    //updating opponent user profile based on their color and move
    document.getElementById("userTurn").innerHTML =  "Opponent Turn"
    document.getElementById("assignColor").innerHTML = ""
    document.getElementById("userRnameOnTop").style.color = "red"
    document.getElementById("userYnameOnTop").style.color = "white"
    document.getElementById("RedBox").style.backgroundColor = "#ca2222"
    document.getElementById("yellowBox").style.backgroundColor = "white"

  }
  //updating user profile based on their color and move
  document.getElementById("userRnameOnTop").style.color = "red"
  document.getElementById("userYnameOnTop").style.color = "white"
  document.getElementById("RedBox").style.backgroundColor = "red"
  document.getElementById("yellowBox").style.backgroundColor = "white"
  if(name == userArray[0]){
    document.getElementById("userTurn").innerHTML =  "Your turn"
    document.getElementById("assignColor").innerHTML = ""
  }
}
function userNameJoined(name){
  if(prevColor == "yellow"){
    prevColor = "red"
  }
  else if(prevColor == "red"){
    prevColor = "yellow"
  }
  //updating button state
  buttonArray.push(name)
  document.getElementById(name).classList.remove("empty");
  document.getElementById(name).classList.add(prevColor);
  document.getElementById(name).style.backgroundColor = prevColor;
  //updating user profile based on user turn
  if(prevColor == "red"){
    document.getElementById("userRnameOnTop").style.color = "white"
    document.getElementById("userYnameOnTop").style.color = "yellow"
    document.getElementById("RedBox").style.backgroundColor = "white"
    document.getElementById("yellowBox").style.backgroundColor = "yellow"
  }
  else if(prevColor == "yellow"){
    document.getElementById("userRnameOnTop").style.color = "red"
    document.getElementById("userYnameOnTop").style.color = "white"
    document.getElementById("RedBox").style.backgroundColor = "red"
    document.getElementById("yellowBox").style.backgroundColor = "white"
  }
  document.getElementById(name).disabled = true;
  if(window.location.href.split("/")[6] == 'login'){
    winAlgorithm("reg")
  }
  if(window.location.href.split("/")[6] == 'tournament'){
    winAlgorithm("tournament")
  }

}
function retrieveData(name,buttonId){
  // when clicked on button if the name is same as the user who clicked button then update state of other user by disabling the button
	if(window.location.href.split("/")[4] == name){
    document.getElementById(buttonId).style.backgroundColor = prevColor;
    document.getElementById("userTurn").innerHTML =  "Opponent turn"
    document.getElementById("assignColor").innerHTML = ""

    if(prevColor == "red"){
      document.getElementById("userRnameOnTop").style.color = "white"
      document.getElementById("userYnameOnTop").style.color = "yellow"
      document.getElementById("RedBox").style.backgroundColor = "white"
      document.getElementById("yellowBox").style.backgroundColor = "yellow"
    }
    else if(prevColor == "yellow"){
      document.getElementById("userRnameOnTop").style.color = "red"
      document.getElementById("userYnameOnTop").style.color = "white"
      document.getElementById("RedBox").style.backgroundColor = "red"
      document.getElementById("yellowBox").style.backgroundColor = "white"
    }
    for(var i=0;i<9;i++){
      for(var j=0;j<8;j++){
        document.getElementById("b"+i+j).disabled = true
      }
    }
	}
	else{
    document.getElementById("userTurn").innerHTML =  "Your turn"
    document.getElementById("assignColor").innerHTML = ""

		if(document.getElementById(buttonId).disabled == false){
		}
		else{
      for(var i=0;i<9;i++){
        for(var j=0;j<8;j++){
          document.getElementById("b"+i+j).disabled = false
        }
      }
			buttonArray.push(buttonId)
			for(i = 0;i<buttonArray.length;i++){
				document.getElementById(buttonArray[i]).disabled = true
			}
		}
	}
}
function createButton(){
  let type = window.location.href.split("/")[6]
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
  if(type == 'login'){
    playGame(type)

  }
  if(type == "tournament"){
    playGame("tournament")
  }
}
function playGame(type){
  if(type == 'login'){
    document.getElementById("userYnameOnTop").style.color = "yellow"
    document.getElementById("userYnameOnTop").style.color = "yellow"
    document.getElementById("chatTop").style.display = "block"
    document.getElementById("chatMiddle").style.display = "none"
    document.getElementById("chatBottom").style.display = "none"
    document.getElementById("chatText").style.inenrHTML = ""
    document.getElementById("chatbtn").style.display  = "block"
    document.getElementById("chatTop").style.top = "91%"
    document.getElementById("chatTop").style.left = "85%"
    document.getElementById("chatTop").style.borderRadius = "15px"
    document.getElementById("chatTop").style.width = "12%"
    document.getElementById("chatTop").style.height = "8%"
    document.getElementById("chatText").style.display = "none"
    open = true;
    buttonClick("reg")
  }
  if(type == 'tournament'){
    document.getElementById("userYnameOnTop").style.color = "yellow"
    document.getElementById("userYnameOnTop").style.color = "yellow"
    document.getElementById("chatTop").style.display = "block"
    document.getElementById("chatMiddle").style.display = "none"
    document.getElementById("chatBottom").style.display = "none"
    document.getElementById("chatText").style.inenrHTML = ""
    document.getElementById("chatbtn").style.display  = "block"
    document.getElementById("chatTop").style.top = "91%"
    document.getElementById("chatTop").style.left = "85%"
    document.getElementById("chatTop").style.borderRadius = "15px"
    document.getElementById("chatTop").style.width = "12%"
    document.getElementById("chatTop").style.height = "8%"
    document.getElementById("chatText").style.display = "none"
    open = true;
    buttonClick("tournament")
  }
}
function findUser(type){
  document.getElementById("findingUserToPlayWith").innerHTML = "Finding opponent..."
  let url = window.location.href
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      if( type == 'login'){
        displayGame('login')
      }
      if(type == 'tournament'){
        displayGame('tournament')
      }
    }
  };
  req.open("GET","/afterLogInPage/"+url.split("/")[4] +"/findOpp/",true)
  req.send()
}
function displayGame(type){
  document.getElementById("findingUserToPlayWith").innerHTML = "Finding opponent..."
  let urlArray = []
  let url = window.location.href
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      urlArray.push(url)
      if(type == "tournament"){
        setTimeout(function(){
          window.onbeforeunload = null
          window.location.href= "/afterLogInPage/"+url.split("/")[4]+"/connect4_gamePage/"+type
        },5000)
      }
      else if(type == "login"){
        gameType = "reg"
        setTimeout(function(){
          window.onbeforeunload = null
          window.location.href= "/afterLogInPage/"+url.split("/")[4]+"/connect4_gamePage/"+type
        },5000)
      }
    }
  };
  req.open("GET","/afterLogInPage/"+url.split("/")[4] +"/connect4_gamePage/"+type,true)
  req.send()
}
function buttonClick(type){
  var redB = document.getElementById("RedBox")
  var yellowB = document.getElementById("yellowBox")
  var userYname = document.getElementById("userYnameOnTop")
  var userRname = document.getElementById("userRnameOnTop")
  if(type == "reg"){
    for(var i=0;i<9;i++){
      for(var j=0;j<8;j++){
        var lastplayer = "red";
        document.getElementById("b"+i+j).onclick = function buttonClick(){
          if(prevColor == "red"){
            buttonRow = this.id.charAt(2)
            for(var k = 8; k>=0;k--){
              var buttonRowGetId = document.getElementById("b"+k+buttonRow)
              if(buttonRowGetId.classList.contains("empty")){
                socket.emit("buttonId","b"+k+buttonRow)
              // winAlgorithm("reg")
                break
              }
            }
          }
          /* switch between player -- player 2 */
          else if(prevColor == "yellow"){
            buttonRow = this.id.charAt(2)
            for(var k = 8; k>=0;k--){
              var buttonRowGetId = document.getElementById("b"+k+buttonRow)
              if(buttonRowGetId.classList.contains("empty")){
                socket.emit("buttonId","b"+k+buttonRow)
              //  winAlgorithm("reg")
                break
              }
            }
          }
        }
      }
    }
  }
  if(type == "tournament"){
      for(var i=0;i<9;i++){
        for(var j=0;j<8;j++){
          var lastplayer = "red";
          document.getElementById("b"+i+j).onclick = function buttonClick(){
            if(prevColor == "red"){
              buttonRow = this.id.charAt(2)
              for(var k = 8; k>=0;k--){
                var buttonRowGetId = document.getElementById("b"+k+buttonRow)
                if(buttonRowGetId.classList.contains("empty")){
                  socket.emit("buttonId","b"+k+buttonRow)
                // winAlgorithm("reg")
                  break
                }
              }
            }
            else if(prevColor == "yellow"){
              buttonRow = this.id.charAt(2)
              for(var k = 8; k>=0;k--){
                var buttonRowGetId = document.getElementById("b"+k+buttonRow)
                if(buttonRowGetId.classList.contains("empty")){
                  socket.emit("buttonId","b"+k+buttonRow)
                //  winAlgorithm("reg")
                  break
                }
              }
            }
          }
        }
      }
    }
  }
let array =[]
function checkHorizontally(type){
  let tie = true;
  var winner;
  for(var i = 0;i<9;i++){
    for(var j=0;j<6;j++){
      var buttonIJ = document.getElementById("b"+i+j)
      var nextButton = document.getElementById("b"+i+(j+1))
      var secondNextButton = document.getElementById("b"+i+(j+2))
      var thirdNextButton = document.getElementById("b"+i+(j+3))
      if(buttonIJ.style.backgroundColor == "yellow" && nextButton.style.backgroundColor == "yellow" && secondNextButton.style.backgroundColor == "yellow" && thirdNextButton.style.backgroundColor == "yellow")
      {
        winner = "yellow"
        tie = false;
        winPopUpColorChange(winner,type)
        if(type == "tournament"){
          winnerCalculator(winner)
        }
        for(var i =0;i<9;i++){
          for(var j =0;j<8;j++){
            document.getElementById("b"+i+j).disabled = true
          }
        }
      }
      if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red")
      {
        winner = "red"
        tie = false;
        winPopUpColorChange(winner,type)
        if(type == "tournament"){
          winnerCalculator(winner)
        }
        for(var i =0;i<9;i++){
          for(var j =0;j<8;j++){
            document.getElementById("b"+i+j).disabled = true
          }
        }
      }
    }
  }
  return tie;
}
let winnerName
function checkVertically(type){
  let tie = true;
  var winner;
  for(var i = 0;i<6;i++){
    for(var j=0;j<8;j++){
      var buttonIJ = document.getElementById("b"+i+j)
      var nextButton = document.getElementById("b"+(i+1)+j)
      var secondNextButton = document.getElementById("b"+(i+2)+j)
      var thirdNextButton = document.getElementById("b"+(i+3)+j)
      if(buttonIJ.style.backgroundColor == "yellow" && nextButton.style.backgroundColor == "yellow" && secondNextButton.style.backgroundColor == "yellow" && thirdNextButton.style.backgroundColor == "yellow")
      {
        winner = "yellow"
        tie = false;
        winPopUpColorChange(winner,type)
        if(type == "tournament"){
          winnerCalculator(winner)
        }
        for(var i =0;i<9;i++){
          for(var j =0;j<8;j++){
            document.getElementById("b"+i+j).disabled = true
          }
        }
      }
      if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red")
      {
        winner = "red"
        tie = false;
        winPopUpColorChange(winner,type)
        if(type == "tournament"){
          winnerCalculator(winner)
        }
        for(var i =0;i<9;i++){
          for(var j =0;j<8;j++){
            document.getElementById("b"+i+j).disabled = true
          }
        }
      }
    }
  }
  return tie;
}
function checkDiagnollyTopLeft(){
  let tie = true;
  var winner
  for(var i =0;i<6;i++){
    for(var j =0;j<5;j++){
      var buttonIJ = document.getElementById("b"+i+j)
      var nextButton = document.getElementById("b"+(i+1)+(j+1))
      var secondNextButton = document.getElementById("b"+(i+2)+(j+2))
      var thirdNextButton = document.getElementById("b"+(i+3)+(j+3))
      if(buttonIJ.style.backgroundColor == "yellow" && nextButton.style.backgroundColor == "yellow" && secondNextButton.style.backgroundColor == "yellow" && thirdNextButton.style.backgroundColor == "yellow")
      {
        winner = "yellow"
        tie = false;
        winPopUpColorChange(winner,type)
        if(type == "tournament"){
          winnerCalculator(winner)
        }
        for(var i =0;i<9;i++){
          for(var j =0;j<8;j++){
            document.getElementById("b"+i+j).disabled = true
          }
        }
      }
      if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red")
      {
        winner = "red"
        tie = false;
        winPopUpColorChange(winner,type)
        if(type == "tournament"){
          winnerCalculator(winner)
        }
        for(var i =0;i<9;i++){
          for(var j =0;j<8;j++){
            document.getElementById("b"+i+j).disabled = true
          }
        }
      }
    }
  }
  return tie;
}
function checkDiagnollyTopRight(){
  let tie = true;
  var winner;
  for(var i = 0;i<6;i++){
    for(var j = 3; j<8;j++){
      var buttonIJ = document.getElementById("b"+i+j)
      var nextButton = document.getElementById("b"+(i+1)+(j-1))
      var secondNextButton = document.getElementById("b"+(i+2)+(j-2))
      var thirdNextButton = document.getElementById("b"+(i+3)+(j-3))
      if(buttonIJ.style.backgroundColor == "yellow" && nextButton.style.backgroundColor == "yellow" &&secondNextButton.style.backgroundColor == "yellow" && thirdNextButton.style.backgroundColor == "yellow"){
        winner = "yellow"
        tie = false;
        winPopUpColorChange(winner,type)
        if(type == "tournament"){
          winnerCalculator(winner)
        }
        for(var i =0;i<9;i++){
          for(var j =0;j<8;j++){
            document.getElementById("b"+i+j).disabled = true
          }
        }
      }
      if(buttonIJ.style.backgroundColor == "red" && nextButton.style.backgroundColor == "red" && secondNextButton.style.backgroundColor == "red" && thirdNextButton.style.backgroundColor == "red"){
        winner = "red"
        tie = false;
        winPopUpColorChange(winner,type)
        if(type == "tournament"){
          winnerCalculator(winner)
        }
        for(var i =0;i<9;i++){
          for(var j =0;j<8;j++){
            document.getElementById("b"+i+j).disabled = true
          }
        }
      }
    }
  }
  return tie;
}
function checkForTie(type){
  let tieValH = checkHorizontally()
  let tieValV = checkVertically()
  let tieValdTL = checkDiagnollyTopLeft()
  let tieValdTR = checkDiagnollyTopRight()

  let emptyArray = []
  for(i=0;i<9;i++){
    for(j=0;j<8;j++){
      if(document.getElementById("b"+i+j).style.backgroundColor == "yellow" || document.getElementById("b"+i+j).style.backgroundColor == "red"){
        emptyArray.push("true")
      }
    }
  }
  if(tieValH == true && tieValV == true && tieValdTL == true && tieValdTR == true && emptyArray.length == 72){
    console.log("tie!!!!!!!")
    winPopUpColorChange("tie",type)
    for(var i =0;i<9;i++){
      for(var j =0;j<8;j++){
        document.getElementById("b"+i+j).disabled = true
      }
    }
  }
}
function winAlgorithm(type){
  if(type == "reg"){
    checkVertically('reg')
    checkHorizontally('reg')
    checkDiagnollyTopLeft('reg')
    checkDiagnollyTopRight('reg')
    checkForTie('reg')
  }
  if(type == "tournament"){
    checkVertically('tournament')
    checkHorizontally('tournament')
    checkDiagnollyTopLeft('tournament')
    checkDiagnollyTopRight('tournament')
    checkForTie('tournament')
  }
}
//timer -- ddoes  work
function timer(color){
    var time = 5;
    var now = 0;
    var x = setInterval(function(){

      var di = time - now
      document.getElementById("timer").innerHTML = "0"+time
      if(time <= 0){
        clearInterval(x)
      }
      time--;
      document.getElementById("line"+color).style.width  = time +"%"
      document.getElementById("line"+color).style.transition = "width 2s"
      if(time < 0){
        document.getElementById("line"+color).style.display = "none"
      }
    },10000)
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
    if(color == "red"){
      winnerId.innerHTML = document.getElementById("userRnameOnTop").innerHTML +" Wins..."
    }
    else if(color == "yellow"){
      winnerId.innerHTML = document.getElementById("userYnameOnTop").innerHTML +" Wins..."
    }
    else if(color == "tie"){
      winnerId.innerHTML = "Game Tied!!!"
    }
  }
  else if(type == "reg"){
    nextB.style.display = "none"
    playAgainB.style.backgroundColor = color
    exitB.style.backgroundColor = color
    modalBox.style.display = "block";
    modalHeader.style.backgroundColor = color
    modalFooter.style.backgroundColor = color
    if(color == "red"){
      winnerId.innerHTML = document.getElementById("userRnameOnTop").innerHTML +" Wins..."
    }
    else if(color == "yellow"){
      winnerId.innerHTML = document.getElementById("userYnameOnTop").innerHTML +" Wins..."
    }
    else if(color == "tie"){
      winnerId.innerHTML = "Game Tied!!!"
    }
    let winColor = color.charAt(0).toUpperCase()+color.slice(1)
    if(winColor == "Yellow"){
      winColor = "Yellow"
      sendUserName(document.getElementById("userYnameOnTop").innerHTML,document.getElementById("userRnameOnTop").innerHTML)
    }
    else if(winColor == "Red"){
      winColor = "Red"
      sendUserName(document.getElementById("userRnameOnTop").innerHTML,document.getElementById("userYnameOnTop").innerHTML)
    }
    else if(winColor == "Tie"){
      sendTieUser(document.getElementById("userYnameOnTop").innerHTML,document.getElementById("userRnameOnTop").innerHTML)
    }
  }
}
function createNewGame(type){
  if(type == 'reg'){
    document.getElementById("sqBox").remove()
    var b = document.createElement("div")
    b.id="sqBox"
    b.className = "sqBox"
    document.getElementById("gameBox").appendChild(b)
    document.getElementById("sqBox").style.display = "block"
    createButton()

    buttonClick("reg")
    document.getElementById("boxAfterWinLose").style.display = "none"
  }
  if(type == 'tournament'){
    document.getElementById("sqBox").remove()
    var b = document.createElement("div")
    b.id="sqBox"
    b.className = "sqBox"
    document.getElementById("gameBox").appendChild(b)
    document.getElementById("sqBox").style.display = "block"
    createButton()

    buttonClick("tournament")
    document.getElementById("boxAfterWinLose").style.display = "none"
  }
}
function exitDialogue(){
  let url = window.location.href

  window.location.href = "/afterLogInPage/"+url.split("/")[4]
}
function quitDialogue(){
  if(document.getElementById("boxAfterWinLose").style.display == "block"){
  }
  else{
    if (confirm("Are you sure you want to quit? You will lose the game if you quit")) {
      let url = window.location.href
      window.location.href = "/afterLogInPage/"+url.split("/")[4]
    }
    else {
    }
  }
}
function logOutDialogue(){
  window.onbeforeunload = null
  let name;
  let url = window.location.href;
  name = url.split("/")[4]

  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
    }
  };
  req.open("POST","/loggedinuser",true)
  req.send(JSON.stringify({name:name}))
  window.location.href = "/"
}
function friendsNavigation(){
  window.onbeforeunload = null
  let url = window.location.href;
  name = url.split("/")[4]
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      window.location.href="/afterLogInPage/"+name+"/connect4_friends"
    }
  };
  req.open("GET","/afterLogInPage/"+name+"/connect4_friends",true)
  req.send()

}
function tournament(){
  window.onbeforeunload = null
  window.onbeforeunload = null
  let name;
  let url = window.location.href;
  name = url.split("/")[4]
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      window.location.href="/afterLogInPage/"+name+"/connect4_tournament"
    }
  };
  req.open("GET","/afterLogInPage/"+name+"/connect4_tournament",true)
  req.send()
}
function sendUserName(win,lose){
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
    }
  }
  req.open("POST","/afterLogInPage/connect4_gamePage/updatestat",true)
  req.send(JSON.stringify({winner:win,loser:lose}))
}
function sendTieUser(user1,user2){
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
    }
  }
  req.open("POST","/afterLogInPage/connect4_gamePage/updatestatTie",true)
  req.send(JSON.stringify({user1:user1,user2:user2}))
}
var numOfGame = 0;
var redArray = []
var yellowArray = []
function playTournament(type){
  //document.getElementById("turn").innerHTML = "Yellow turn"
  document.getElementById("RedBox").style.backgroundColor = "white"
  document.getElementById("yellowBox").style.backgroundColor = "yellow"
  document.getElementById("yellowBox").style.display = "block"
  document.getElementById("RedBox").style.display = "block"
  document.getElementById("userRnameOnTop").style.display = "block"
  document.getElementById("userYnameOnTop").style.display = "block"
  document.getElementById("userYnameOnTop").style.color = "yellow"

  ++numOfGame;
  createNewGame("tournament")
  if(numOfGame > 2){
    for(var i =0;i<9;i++){
      for(var j =0;j<8;j++){
        document.getElementById("b"+i+j).disabled = "true"
      }
    }
    if(redArray.length > yellowArray.length){
      document.getElementById("nextButton").style.display = "none"
      document.getElementById("playAgainButton").style.display = "none"
      var exitB = document.getElementById("exitButton")
      var modalBox  = document.getElementById("boxAfterWinLose")
      var modalHeader = document.getElementsByClassName("modal-header")[0]
      var modalFooter = document.getElementsByClassName("modal-footer")[0]
      var winnerId = document.getElementById("winner")
      exitB.style.backgroundColor = "red"
      modalBox.style.display = "block";
      modalHeader.style.backgroundColor = "red"
      modalFooter.style.backgroundColor = "red"
      winnerId.innerHTML = document.getElementById("userRnameOnTop").innerHTML +" is the winner of the tournament..."

    }
    else{
      document.getElementById("nextButton").style.display = "none"
      document.getElementById("playAgainButton").style.display = "none"
      var exitB = document.getElementById("exitButton")
      var modalBox  = document.getElementById("boxAfterWinLose")
      var modalHeader = document.getElementsByClassName("modal-header")[0]
      var modalFooter = document.getElementsByClassName("modal-footer")[0]
      var winnerId = document.getElementById("winner")
      exitB.style.backgroundColor = "yellow"
      modalBox.style.display = "block";
      modalHeader.style.backgroundColor = "yellow"
      modalFooter.style.backgroundColor = "yellow"
      winnerId.innerHTML = document.getElementById("userYnameOnTop").innerHTML +" is the winner of the tournament..."
    }
  }
}
function winnerCalculator(x){
  if(x == "yellow"){
    yellowArray.push(x)
  }
  else if(x == "red"){
    redArray.push(x)
  }
}
