function displayLogInAndCreateWindow(id){
  if(id == "logInButton"){
    document.getElementById("logInPopUp").style.display = "block"
  }
  else if(id == "createAccount"){
    document.getElementById("createAccountPopUp").style.display = "block"
  }
}
function hideLogInAndCreateWindow(id){
  if(id == "cancelbtn"){
    document.getElementById("logInPopUp").style.display = "none"
  }
  else if(id == "createAccountCancelButton"){
    document.getElementById("createAccountPopUp").style.display = "none"
  }
  else if(id == "cancelbtnForgotPsw"){
    document.getElementById("forgotPswContainer").style.display = "none"
    document.getElementById("newPswField").value = ""
    document.getElementById("repeatPswField").value = ""
    document.getElementById("pswMatch").innerHTML = ""
  }
  else if(id == "cancelB"){
    document.getElementById("statContainer").style.display = "none"
    document.getElementById("statPopUp").style.display = "none";
  }
}
function addLink(id){
  let element = document.getElementById(id)
  document.getElementById("forgotPswContainer").style.display = "block"
  document.getElementById("logInPopUp").style.display = "none"
}
function playAsGuest(){
  window.location.href = "/playGuest"
}
function hideItems(){
  for(var i =0;i<arguments.length;i++){
    document.getElementById(arguments[i]).style.display = "none"
  }
}
function disPlayButtons(){
  hideItems("logInButton","createAccount","playGuest", "logInPopUp")
  document.getElementById("afterLogInScreen").style.display = "block"
}
window.onclick = function(event) {
  event.preventDefault()
  if (event.target == "logInWindowButton") {
  disPlayButtons()
  }
}
function login(uname,psw){
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      if(this.responseText != "Error"){
        document.getElementById("loginexist").style.display = "none"
        window.location.href = "/afterlogInPage/"+uname
      }
      if(this.responseText == "Error"){
        document.getElementById("loginexist").style.display = "block"
      }
    }
  };
  req.open("POST","/user",true)
  req.send(JSON.stringify({username:uname,passwd:psw}))
}
function createAccount(firstname, lastname,uname,psw){
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){

      if(this.responseText == "Cannot Proceed"){
        document.getElementById("existText").style.display = "block"
      }
      if(this.responseText == "Proceed"){
        document.getElementById("existText").innerHTML = "Success! Log into account!"
        document.getElementById("existText").style.color = "green"
        document.getElementById("existText").style.display = "block"
      }
    }
  };
  req.open("POST","/updateJSON",true)
  req.send(JSON.stringify({firstname:firstname, lastname:lastname,userid:uname,passwd:psw,win:0,loss:0,tied:0,numGamePlayed:0,winPercentage:0,status:"private",loggedin:"no",opponent:"",friends:[],friendReq:[],gameHistory: [],gameTime:[],gameStatus:[],mode:"light"}))
}
function sendPage(request){
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      window.location.href= "/"+request
    }
  };
  req.open("GET","/"+request,true)
  req.send()
}
function howToPlay(){
  window.location.href = "/howToPlay"
}
function updatePassword(username,newPassword,repeatedPassword){
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      if(this.responseText == "Proceed"){
        document.getElementById("pswMatch").style.display = "block"
        document.getElementById("pswMatch").innerHTML = "Success! Log in to account!"
        document.getElementById("pswMatch").style.color = "green"
      }
      else if(this.responseText == "Username does not exist"){

        document.getElementById("pswMatch").style.display = "block"
        document.getElementById("pswMatch").innerHTML = "Username does not exist! Create new account"
      }
      else if(this.responseText == "No match"){
        document.getElementById("pswMatch").style.display = "block"
        document.getElementById("pswMatch").innerHTML = "Both the password do not match"
      }
      else{
        document.getElementById("pswMatch").style.display = "none"
      }
    }
  };
  req.open("POST","/resetPassword",true)
  req.send(JSON.stringify({username:username,newPasswd:newPassword,repeatPswd:repeatedPassword}))
}
function statInfo(){
  window.onbeforeunload = null
  let url = window.location.href
  window.location.href=url+"/statPage"
}
function logOut(){
  let name;
  let url = window.location.href;
  name = url.split("/")[4]
  let req = new XMLHttpRequest()
  req.open("POST","loggedinuser",true)
  req.send(JSON.stringify({name:name}))
}
function findNewFriend(friendName){
  let url = window.location.href;
  name = url.split("/")[4]
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      if(this.responseText == "Friend not found") {
        document.getElementById("name1").innerHTML = '"' +document.getElementById("newFriendSearch").value +'"'+ " not found"
        document.getElementById("name1").style.display = "block"
        document.getElementById("newFriendButton1").style.display = "none"
        document.getElementById("newFriendSearch").value = ""
      }
      else if(this.responseText == "sent"){
        document.getElementById("name1").innerHTML = friendName
        document.getElementById("name1").style.display = "block"
        document.getElementById("newFriendButton1").style.display = "block"
        document.getElementById("newFriendButton1").innerHTML = "Friend Req Sent"
        document.getElementById("newFriendButton1").disabled = true;
        document.getElementById("newFriendSearch").value = ""

      }
      else if(this.responseText == "Already friend or private account"){
        document.getElementById("name1").innerHTML = '"'+document.getElementById("newFriendSearch").value + '"'+" is already friend or has private account"
        document.getElementById("name1").style.display = "block"
        document.getElementById("newFriendButton1").style.display = "none"
        document.getElementById("newFriendSearch").value = ""
      }
      else{
        document.getElementById("name1").innerHTML = this.responseText
        document.getElementById("name1").style.display = "block"
        document.getElementById("newFriendButton1").style.display = "block"
        document.getElementById("newFriendSearch").value = ""
      }
    }
  }
  req.open("POST","/afterLogInPage/"+name+"/findNewFriend",true)
  req.send(JSON.stringify({newFriendName:friendName}))
}
function makeFriends(friendName){
  let url = window.location.href;
  name = url.split("/")[4]
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      document.getElementById("newFriendButton1").innerHTML = "Friend Req Sent"
      document.getElementById("newFriendButton1").disabled = true;
    }
  }
  req.open("POST","/afterLogInPage/"+name+"/makeFriend",true)
  req.send(JSON.stringify({newFriendName:friendName}))
}
function chatWithFriend(name){
  document.getElementById("chatSection").style.display = "block"
  document.getElementById("chatFriend").innerHTML = name
}
function changeCheckBox(){
  if(document.getElementById("togBtn").checked == false){
    document.getElementById("togBtn").checked = true
  }
  else if(document.getElementById("togBtn").checked == true){
    document.getElementById("togBtn").checked = false
  }
  updateUserStatus(document.getElementById('togBtn').checked)
}
function changeMode(){
  if(document.getElementById("togBtn1").checked == false){
    document.getElementById("togBtn1").checked = true
  }
  else if(document.getElementById("togBtn1").checked == true){
    document.getElementById("togBtn1").checked = false
  }
  updateMode(document.getElementById("togBtn1").checked)
}
function updateMode(val){
    let url = window.location.href;
    name = url.split("/")[4]
    let req = new XMLHttpRequest()
    req.onreadystatechange = function (){
      if(this.readyState == 4 && this.status == 200){
        if(this.responseText == "dark"){
          document.getElementById("togBtn1").checked = true
          document.getElementById("backgroundSq").style.backgroundColor = "black"
          if(document.getElementById("userTurn") != null){
            document.getElementById("userTurn").style.color = "white"
          }
          if(document.getElementById("assignColor")){
            document.getElementById("assignColor").style.color = "white"
          }
        }
        else if(this.responseText == "light"){
          document.getElementById("togBtn1").checked = false
          document.getElementById("backgroundSq").style.backgroundColor = "lightblue"
          if(document.getElementById("userTurn") != null){
            document.getElementById("userTurn").style.color = "black"
          }
          if(document.getElementById("assignColor")){
            document.getElementById("assignColor").style.color = "black"
          }
        }
      }
    }
    req.open("POST","/afterLogInPage/"+name+"/updateMode",true)
    req.send(JSON.stringify({mode:val}))
}
function updateUserStatus(val){
  let url = window.location.href;
  name = url.split("/")[4]
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      if(this.responseText == "public"){
        document.getElementById("togBtn").checked = true
      }
      else if(this.responseText == "private"){
        document.getElementById("togBtn").checked = false
      }
    }
  }
  req.open("POST","/afterLogInPage/"+name+"/updateStatus",true)
  req.send(JSON.stringify({status:val}))
}
function acceptFriendReq(friendName){
  let url = window.location.href;
  name = url.split("/")[4]

  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      window.location.reload()
    }
  }
  req.open("POST","/afterLogInPage/"+name+"/acceptFriendRequest",true)
  req.send(JSON.stringify({friendName:friendName}))
}
function rejectFriendReq(friendName){
  let url = window.location.href;
  name = url.split("/")[4]
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      window.location.reload()

    }
  }
  req.open("POST","/afterLogInPage/"+name+"/rejectFriendRequest",true)
  req.send(JSON.stringify({friendName:friendName}))
}
function unfriend(friendName){
  let url = window.location.href;
  name = url.split("/")[4]
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      window.location.reload()
    }
  }
  req.open("POST","/afterLogInPage/"+name+"/removefriend",true)
  req.send(JSON.stringify({friendName:friendName}))
}
function showFriendStat(friendName){
  let url = window.location.href;
  name = url.split("/")[4]
  let req = new XMLHttpRequest()
  req.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      if(this.responseText == "private"){
        document.getElementById("statPopUp").style.display = "none"
        document.getElementById("privateAccount").style.display = "block"
        document.getElementById("privateAccount").innerHTML = "Private Account!!!"
      }
      else{
        let parsedFriendInfo = JSON.parse(this.responseText)

        console.log(this.responseText)
        document.getElementById("privateAccount").style.display = "none";

        document.getElementById("win").innerHTML = "Win   : "+parsedFriendInfo.win
        document.getElementById("lose").innerHTML = "Lose : "+parsedFriendInfo.lose
        document.getElementById("numGamePlayed").innerHTML = "Number of Games Played :"+parsedFriendInfo.numGame
        document.getElementById("winRate").innerHTML = "Winning percentage :"+parsedFriendInfo.winRate +"%"
        document.getElementById("userHeader").innerHTML = parsedFriendInfo.fname.charAt(0).toUpperCase()+parsedFriendInfo.fname.slice(1)+" "+parsedFriendInfo.lname.charAt(0).toUpperCase()+parsedFriendInfo.lname.slice(1)+"'s Stat"

        document.getElementById("gameSumHeader").innerHTML =""
        for(i=0;i<parsedFriendInfo.gameSum.val.length;i++){
          let tableElem = document.createElement("table")
          let tbodyElem = document.createElement("tbody")
          let trElem = document.createElement("tr")
          tableElem.id = "table2GameSum"
          tableElem.appendChild(tbodyElem)
          tbodyElem.appendChild(trElem)

          let tdElem1 = document.createElement("td")
          let tdElem2 = document.createElement("td")
          let tdElem3 = document.createElement("td")
          let tdElem4 = document.createElement("td")

          tdElem1.id = "playerSum"
          tdElem2.id = "playerSumGameHist"
          tdElem3.id = "playerSumGameStat"
          tdElem4.id = "playerSumGameStat"
          tdElem1.innerHTML = parsedFriendInfo.gameSum.val[i].playerName
          if(parsedFriendInfo.gameSum.val[i].gameHistory == name){
            tdElem2.innerHTML = "You"

          }
          else{
            tdElem2.innerHTML = parsedFriendInfo.gameSum.val[i].gameHistory
          }
          tdElem3.innerHTML = parsedFriendInfo.gameSum.val[i].gameStat
          tdElem4.innerHTML = parsedFriendInfo.gameSum.val[i].gameTime

          trElem.appendChild(tdElem1)
          trElem.appendChild(tdElem2)
          trElem.appendChild(tdElem3)
          trElem.appendChild(tdElem4)

          document.getElementById("gameSumHeader").appendChild(tableElem)

        }
        document.getElementById("statPopUp").style.display = "block"
      }
    }
  }
  req.open("POST","/afterLogInPage/"+name+"/friendStat",true)
  req.send(JSON.stringify({friendName:friendName}))
}
function changeColorBasedOnMode(){
  if(document.getElementById("currMode").innerHTML == "light"){
    document.getElementById("backgroundSq").style.backgroundColor = "lightblue"
    if(document.getElementById("userTurn") != null){
      document.getElementById("userTurn").style.color = "black"
      document.getElementsByClassName("darkSwitch")[0].style.top = "3%"
    }
    if(document.getElementById("assignColor") != null){
      document.getElementById("assignColor").style.color = "black"
      document.getElementsByClassName("darkSwitch")[0].style.top = "3%"
    }
    else{
      document.getElementsByClassName("darkSwitch")[0].style.top = "-1%"
    }

  }
  else if(document.getElementById("currMode").innerHTML == "dark"){
    if(document.getElementById("userTurn") != null){
      document.getElementById("userTurn").style.color = "white"
      document.getElementsByClassName("darkSwitch")[0].style.top = "3%"
    }
    else{
      document.getElementsByClassName("darkSwitch")[0].style.top = "-1%"
    }
    if(document.getElementById("assignColor") != null){
      document.getElementById("assignColor").style.color = "white"
      document.getElementsByClassName("darkSwitch")[0].style.top = "3%"
    }
    else{
      document.getElementsByClassName("darkSwitch")[0].style.top = "-1%"
    }
    document.getElementById("backgroundSq").style.backgroundColor = "black"
  }
}
function changeColorStat(){
  document.getElementsByClassName("darkSwitch")[0].style.display = "none"
  if(document.getElementById("currMode").innerHTML == "light"){
    document.getElementById("backgroundSq").style.backgroundColor = "lightblue"
    document.getElementById("header").style.borderColor = "black"
    document.getElementById("table1").style.color = "black"
    document.getElementById("userVal").style.color = "black"
    document.getElementById("gamePlayed").style.color = "black"
    document.getElementById("winPercent").style.color = "black"
  }
  else if(document.getElementById("currMode").innerHTML == "dark"){
    document.getElementById("backgroundSq").style.backgroundColor = "black"
    document.getElementById("header").style.borderColor = "white"
    document.getElementById("table1").style.color = "white"
    document.getElementById("userVal").style.color = "white"
    document.getElementById("gamePlayed").style.color = "white"
    document.getElementById("winPercent").style.color = "white"
  }
}
function changeColorFriend(){
  document.getElementsByClassName("darkSwitch")[0].style.display = "none"
  if(document.getElementById("currMode").innerHTML == "light"){
    document.getElementById("backgroundSq").style.backgroundColor = "lightblue"
    let friendList = document.getElementsByClassName("friendsList")
    let friendReq = document.getElementsByClassName("friendsReqList")

    for(i=0;i<friendList.length;i++){
      friendList[i].style.color = "black"
    }
    for(i=0;i<friendReq.length;i++){
      friendReq[i].style.color = "black"
    }
    document.getElementById("friendSearchSection").style.color = "black"
    document.getElementById("friendReqSection").style.colot = "black"
    document.getElementById("friendsName").style.color = "black"
    document.getElementById("name1").style.color = "black"
    document.getElementById("friendInfo").style.borderColor = "black"
    document.getElementById("userHeader").style.color = "black"
    document.getElementById("win").style.color = "black"
    document.getElementById("lose").style.color = "black"
    document.getElementById("numGamePlayed").style.color = "black"
    document.getElementById("winRate").style.color = "black"
    document.getElementById("gameSummaryHeader").style.color = "black"
    document.getElementById("table1GameSum").style.color = "black"
    document.getElementById("table1GameSum").style.borderColor = "black"
    document.getElementById("privateAccount").style.color = "black"

  }
  else if(document.getElementById("currMode").innerHTML == "dark"){
    document.getElementById("backgroundSq").style.backgroundColor = "black"
    let friendList = document.getElementsByClassName("friendsList")
    let friendReq = document.getElementsByClassName("friendsReqList")
    for(i=0;i<friendList.length;i++){
      friendList[i].style.color = "white"
    }
    for(i=0;i<friendReq.length;i++){
      friendReq[i].style.color = "white"
    }
    document.getElementById("friendSearchSection").style.color = "white"
    document.getElementById("friendReqSection").style.color = "white"
    document.getElementById("name1").style.color = "white"
    document.getElementById("friendInfo").style.borderColor = "white"
    document.getElementById("userHeader").style.color = "white"
    document.getElementById("win").style.color = "white"
    document.getElementById("lose").style.color = "white"
    document.getElementById("numGamePlayed").style.color = "white"
    document.getElementById("winRate").style.color = "white"
    document.getElementById("gameSummaryHeader").style.color = "white"
    document.getElementById("table1GameSum").style.color = "white"
    document.getElementById("table1GameSum").style.borderColor = "white"
    document.getElementById("privateAccount").style.color = "white"

  }
}
