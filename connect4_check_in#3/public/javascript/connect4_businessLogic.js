let user = require("./users.json")

//checkign if the userid is already in the dataabse
//if it is then return false
function isValidUserid(userObj){
  if(!userObj){
    return false;
  }
  if(!userObj.userid || !user.hasOwnProperty(userObj.userid)){
    return false;
  }
  return true
}

//creating user and updating database
function createUser(newUser){
  if(typeof newUser.firstname === "undefined" || typeof newUser.lastname === "undefined" || typeof newUser.userid==="undefined" || typeof newUser.passwd==="undefined"){
    console.log(typeof newUser.firstname)
    return "";
  }
  else if (user.hasOwnProperty(newUser.userid)){
    return "User Already Exist"
  }
  user[newUser.userid] = newUser
  newUser.win = 0;
  newUser.loss = 0;
  newUser.tied = 0;
  newUser.numGamePlayed = 0;
  newUser.winPercentage = 0;
  newUser.status = "public",
  newUser.friends = [];
  return user[newUser.userid]
}

//get the requestedd user
function getUser(reqUser, findUserId){
  if(!isValidUserid(reqUser)){
    return null;
  }
  if(user.hasOwnProperty(findUserId)){
    if(reqUser.userid == findUserId || reqUser.friends.includes(findUserId)){
      return user[findUserId];
    }
  }
}

//search for the user in database
function searchForUser(requestingUser,searchTerm){
  let searches = []
  if(!isValidUserid(requestingUser)){
    return searches;
  }
  for(username in user){
    let userVal = user[username];
    if(userVal.userid.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0){
      if(userVal.userid === requestingUser.userid || requestingUser.friends.includes(userVal.userid)){
        searches.push(userVal);
      }
    }
  }
  return searches;
}

//make friends
function makeFriends(requestingUser,addAsFriendUser){
  if(!user.hasOwnProperty(requestingUser) && !user.hasOwnProperty(addAsFriendUser)){
    return;
  }
  if(user[requestingUser].friends.includes(addAsFriendUser)){
    return;
  }
  console.log(requestingUser)
  user[requestingUser].friends.push(addAsFriendUser)
  user[addAsFriendUser].friends.push(requestingUser)
}

//update user stat based on games played and other info
function addingStat(winnerUser,loserUser){
  winnerUser.win = winnerUser.win  + 1
  loserUser.loss = loserUser.loss + 1
  winnerUser.numGamePlayed = winnerUser.numGamePlayed+1
  loserUser.numGamePlayed = loserUser.numGamePlayed + 1
  winnerUser.winPercentage = ((winnerUser.win/winnerUser.numGamePlayed) * 100).toFixed(2) + "%"
  loserUser.winPercentage = ((loserUser.win/loserUser.numGamePlayed) * 100).toFixed(2)+"%"

}

//updating user stat when games are tied
function tiedStat(userA,userB){
  userA.tied = userA.tied+1
  userB.tied = userB.tied+1
  userA.numGamePlayed = userA.numGamePlayed + 1
  userB.numGamePlayed = userB.numGamePlayed + 1

  userA.winPercentage = (((userA.tied+userA.win)/userA.numGamePlayed) * 100).toFixed(2)+"%"
  userB.winPercentage = (((userB.tied+userB.win)/userB.numGamePlayed) * 100).toFixed(2)+"%"

}

//play game
function playGame(user1, user2){
  let num = 0;
  let winner = true
  let userA = true
  let userB = false
  let array = printBoard()

  let userRIn
  let userYIn
  let result = false
  while(!result){
    if(userA == true){
      let x = Math.floor((Math.random()*4)+0)
      let y = Math.floor((Math.random()*4)+0)
      while(array[x][y] == "R" || array[x][y] == "Y"){
        userRIn = Math.floor((Math.random()*4)+0)
        userYIn = Math.floor((Math.random()*4)+0)
        x = userRIn;
        y = userYIn;
      }
      console.log(user1.userid+" is making move")
      array[x][y] = "R"
      result = checkWinner(array)
      console.log(array)
      if(result == true){
        console.log(user1.userid+" is winner")
        addingStat(user1,user2)
        break;
      }
      userA = false
      userB = true
    }
    else if(userB == true){
      var x = Math.floor((Math.random()*4)+0)
      var y = Math.floor((Math.random()*4)+0)
      while(array[x][y] == "R" || array[x][y] == "Y"){
        userRIn = Math.floor((Math.random()*4)+0)
        userYIn = Math.floor((Math.random()*4)+0)
        x = userRIn;
        y = userYIn;
      }
      console.log(user2.userid +" is making move")
      array[x][y] = "Y"
      result = checkWinner(array)
      console.log(array)
      if(result == true){
        console.log(user2.userid +" is winner")
        addingStat(user2,user1)
        break;
      }
      userA = true
      userB = false
    }
    if(num === 15){
      console.log("No Winner! Game Tied")
      console.log("Game Over")
      tiedStat(user1,user2)
      break;
    }
    num++;
  }

}

//printing board after each move when user made aa move
function printBoard(){
  var array = new Array(4)
  for(var i=0;i<array.length;i++){
    array[i] = new Array(4)
  }

  for(var i =0;i<array.length;i++){
    for(var j =0;j<array[i].length;j++){
      array[i][j]="-"
    }
  }
  return array;
}

//checks the winner
function checkWinner(array){
  let winner = false;
  var i =0;
  var j =0;
  if(array[i][j] == "R" && array[i][j+1] == "R" && array[i][j+2] == "R" && array[i][j+3] == "R"){
    winner = true
  }
  if(array[i][j] == "Y" && array[i][j+1] == "Y" && array[i][j+2] == "Y" && array[i][j+3] == "Y"){
    winner = true
  }
  if(array[i][j] == "R" && array[i+1][j] == "R" && array[i+2][j] == "R" && array[i+3][j] == "R"){
    winner = true
  }
  if(array[i][j] == "Y" && array[i+1][j] == "Y" && array[i+2][j] == "Y" && array[i+3][j] == "Y"){
    winner = true
  }
  if(array[i][j] == "R" && array[i+1][j+1] == "R" && array[i+2][j+2] == "R" && array[i+3][j+3] == "R"){
    winner = true
  }
  if(array[i][j] == "Y" && array[i+1][j+1] == "Y" && array[i+2][j+2] == "Y" && array[i+3][j+3] == "Y"){
    winner = true
  }
  if(array[i][j] == "R" && array[i+1][j-1] == "R" && array[i+2][j-2] == "R" && array[i+3][j-3] == "R"){
    winner = true
  }
  if(array[i][j] == "Y" && array[i+1][j-1] == "Y" && array[i+2][j-2] == "Y" && array[i+3][j-3] == "Y"){
    winner = true
  }
  return winner;
}

//creating some user
let user1 = createUser({firstname:"Ray",lastname:"Sin",userid:"raysin5",passwd:"sin5"})
let user2 = createUser({firstname:"Patty",lastname:"O'Furniture",userid:"pattyO",passwd:"pattyF"})
let user3 = createUser({firstname:"Olive",lastname:"Tree",userid:"otree",passwd:"oliveTree2"})
let user4 = createUser({firstname:"Ben",lastname:"Dover",userid:"bandover",passwd:"doverban"})
let user5 = createUser({firstname:"Sarrah",lastname:"McArthur",userid:"sarrahM",passwd:"sarrah20"})

console.log("Making raysin5 and pattyO friends")
makeFriends("raysin5","pattyO")
console.log(user.raysin5)
console.log(user.pattyO)

console.log("Making raysin5 and bandover friends")
makeFriends("raysin5","bandover")
console.log(user.raysin5)
console.log(user.bandover)

console.log("otree and sarrahM are playing Game")
playGame(user.otree,user.sarrahM)
console.log(user.otree)
console.log(user.sarrahM)


console.log("otree and sarrahM are playing Game again")
playGame(user.otree,user.sarrahM)
console.log(user.otree)
console.log(user.sarrahM)

console.log("bandover and sarrahM are playing Game")
playGame(user.bandover,user.sarrahM)
console.log(user.bandover)
console.log(user.sarrahM)


console.log("bandover and sarrahM are playing Game Again")
playGame(user.bandover,user.sarrahM)
console.log(user.bandover)
console.log(user.sarrahM)
