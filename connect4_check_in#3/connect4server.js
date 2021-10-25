
const fs = require("fs");
let userDataBase = {"key": []}
const express = require("express")
const bodyParser = require('body-parser');
const pug = require('pug')
const path = require('path')
let array = {"key":[]}
let app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true }));


let gameWin;
let gameLost;
let winUser;
let winrate;
let numGame;
let jsonArray = {"val":[]}

let myArray = []
let opponent;
let gameArray = []
let opp1;
let opp2;
let userStatus;
let userMode;


app.get("/",(req,res) => {
	res.sendFile(path.join(__dirname, "/connect4.html"))
})
app.get("/playGuest",(req,res)=>{
	res.sendFile(path.join(__dirname, "/playGuest.html"))
})
app.post("/user",validateLogIn)
app.get("/afterLogInPage/:uname", (req,res) =>{
	nameOfUser = req.url.split("/")[2]

	let userExist = checkIfFileExist(nameOfUser)
	if(userExist == false){
		res.setHeader("Location", "/");
		res.status(401).send("User does not exist! Create Account")
	}
	if(userExist == true){
		let data = JSON.parse(fs.readFileSync("./userInfo/"+req.url.split("/")[2]+".json",'utf-8'))
		if(data.loggedin == "yes"){
			res.render("afterlogInPage",{uservalname:req.url.split("/")[2],status:data.status,userMode:data.mode})
		}
		else{
			res.status(401).send("Invalid Log in")
		}
	}
})
app.post("/updateJSON", createUserAccount)
app.post("/resetPassword",updatePasswordInFile)
app.post("/loggedinuser",logOut);
app.get("/howToPlay",(req,res) =>{
	res.sendFile(path.join(__dirname, "/howToPlayPage.html"))
	if(req.url.split("/")[2] != undefined && opponent != undefined){
		let playerData = JSON.parse(fs.readFileSync("./userInfo/"+req.url.split("/")[2]+".json",'utf-8'))
		let opponentData = JSON.parse(fs.readFileSync("./userInfo/"+opponent+".json",'utf-8'))
		playerData.opponent = ""
		opponentData.opponent = ""
		fs.writeFileSync("./userInfo/"+req.url.split("/")[2]+".json", JSON.stringify(playerData,null,2))
		fs.writeFileSync("./userInfo/"+opponent+".json", JSON.stringify(opponentData,null,2))
	}
})
app.get("/afterLogInPage/:uname/findOpp/",findOpponentPlayer)
app.get("/afterLogInPage/:uname/connect4_gamePage/:type",(req,res) =>{
	nameOfUser = req.url.split("/")[2]
	let userExist = checkIfFileExist(nameOfUser)

	if(userExist == false){
		res.status(401).send("User does not exist! Create Account")
	}
	if(userExist == true){
		let data = JSON.parse(fs.readFileSync("./userInfo/"+req.url.split("/")[2]+".json",'utf-8'))
		if(data.loggedin == "yes"){
			res.render("connect4_gamePage",{usery:opp1,userR:opp2,userMode:data.mode})
		}
		else{
			res.status(401).send("Invalid Log in")
		}
	}
})
app.post("/afterLogInPage/connect4_gamePage/updatestat", updateWinStatInfo)
app.post("/afterLogInPage/connect4_gamePage/updatestatTie", updateTieStatInfo)
app.post("/afterLogInPage/connect4_gamePage/updatestatQuit",updateWinStatInfoQuit)
app.use("/afterLogInPage/:user/statPage",readUserFile)
app.get("/afterLogInPage/:user/statPage",(req,res) => {
	nameOfUser = req.url.split("/")[2]
	let userExist = checkIfFileExist(nameOfUser)

	if(userExist == false){
		res.status(401).send("User does not exist! Create Account")
	}
	if(userExist == true){
		let data = JSON.parse(fs.readFileSync("./userInfo/"+req.url.split("/")[2]+".json",'utf-8'))
		if(data.loggedin == "yes"){
			res.render("statPage",{win:gameWin,lost:gameLost,winUser:req.url.split("/")[2],winRate:winrate,numGame:numGame,array:jsonArray,userMode:data.mode})
		}
		else{
			res.status(401).send("Invalid Log in")
		}
	}
})
app.post("/afterLogInPage/:uname/makeFriend", makeFriends)
app.post("/afterLogInPage/:uname/findNewFriend", findNewFriend)
app.use("/afterLogInPage/:uname/connect4_friends",friendsList)
app.get("/afterLogInPage/:uname/connect4_friends",(req,res) =>{
	nameOfUser = req.url.split("/")[2]
	let userExist = checkIfFileExist(nameOfUser)

	if(userExist == false){
		res.status(401).send("User does not exist! Create Account")
	}
	if(userExist == true){
		let data = JSON.parse(fs.readFileSync("./userInfo/"+req.url.split("/")[2]+".json",'utf-8'))
		if(data.loggedin == "yes"){
			res.render("connect4_friends", {searchedFriend:searchedFriend, searchedNewFriend:searchedNewFriend,listOfFriends:listFriends,loggedInFriends:loggedInFriends,
					friendReqArray:friendReqArray,userMode:data.mode})		}
		else{
			res.status(401).send("Invalid Log in")
		}
	}
})
app.get("/afterLogInPage/:uname/connect4_tournament",(req,res) => {
	nameOfUser = req.url.split("/")[2]
	let userExist = checkIfFileExist(nameOfUser)

	if(userExist == false){
		res.status(401).send("User does not exist! Create Account")
	}
	if(userExist == true){
		let data = JSON.parse(fs.readFileSync("./userInfo/"+req.url.split("/")[2]+".json",'utf-8'))
		if(data.loggedin == "yes"){
			res.render("connect4_gamePage",{usery:req.url.split("/")[2],userR:data.opponent})
		}
		else{
			res.status(401).send("Invalid Log in")
		}
	}
})
app.post("/afterLogInPage/:uname/updateStatus",updateUserStatus)
app.post("/afterLogInPage/:uname/updateMode", updateUserMode)
app.post("/afterLogInPage/:uname/acceptFriendRequest",acceptRequest)
app.post("/afterLogInPage/:uname/rejectFriendRequest",rejectRequest)
app.post("/afterLogInPage/:uname/removefriend",unfriendUser)
app.post("/afterLogInPage/:uname/friendStat",displayfriendStat)


let friendObj = {};
let searchedFriend = [];
let searchedNewFriend = [];
let listFriends = [];
let loggedInFriends = [];
let friendReqArray = []
function validateLogIn(req,res,next){
	let body=""
	let flag = false;
	let password;

	let givenUsername;
	let givenPasswd;

	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let info = JSON.parse(body)
			givenUsername = info.username;
			givenPasswd = info.passwd
			let dataInfo;
			let fileExist = checkIfFileExist(givenUsername);
			if(fileExist == true){
				let data = fs.readFileSync("./userInfo/"+givenUsername+".json",'utf-8')
				let parsedData = JSON.parse(data)
				password = parsedData.passwd;
				if(givenPasswd == password){
					parsedData.loggedin = "yes"
					fs.writeFile("./userInfo/"+givenUsername+".json", JSON.stringify(parsedData,null,2),function(err){
						if(err){
							return console.log("err")
						}
					})
					res.render("afterlogInPage")
					next();
				}
				else{
					res.send("Error")
				}
			}
			else{
				res.send("Error")
				next();
			}
		});
	})
}
function checkIfFileExist(id){
	if(fs.existsSync(path.join(__dirname,"/userInfo/"+id+".json"))){
		return true;
	}
	else{
		return false;
	}
}
function createUserAccount(req,res,next){
	let body=""
	let flag = true;
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let id = JSON.parse(body)
			array.key.push(JSON.parse(body))
			body = JSON.parse(body)

			if(id.firstname == ""){
				flag = false;
			}
			if(id.lastname == ""){
				flag = false;
			}
			if(id.passwd == ""){
				flag = false;
			}
			if(fs.existsSync("./userInfo/"+id.userid+".json")){
				flag = false;
			}
			if(flag == false){
				res.send("Cannot Proceed")
			}
			if(flag == true){
				fs.writeFile("./userInfo/"+id.userid+".json", JSON.stringify(body,null,2),function(err){
					if(err){
						return console.log("err")
					}
				})
				res.send("Proceed")
				next()
			}
		});
	})
}
function updatePasswordInFile(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let parsedData = JSON.parse(body);
			let username = parsedData.username;
			let newPassword = parsedData.newPasswd;
			let repeatedPsw = parsedData.repeatPswd;
			let fileExist = checkIfFileExist(username)
			if(fileExist == true){
				let data = fs.readFileSync("./userInfo/"+username+".json",'utf-8')
				let parsedData = JSON.parse(data)
				parsedData.passwd = newPassword

				if(newPassword == repeatedPsw){
					fs.writeFile("./userInfo/"+username+".json", JSON.stringify(parsedData,null,2),function(err){
						if(err){
							return console.log("err")
						}
						res.end("Proceed")
						next()
					})
				}
				else{
					res.send("No match")
					next();
				}
			}
			else{
				res.send("Username does not exist")
				next();
			}
		});
	})
}
function logOut(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let parsedBody = JSON.parse(body)
			let data = fs.readFileSync("./userInfo/"+parsedBody.name+".json",'utf-8')
			let parsedData = JSON.parse(data)
			parsedData.loggedin = "no"
			fs.writeFile("./userInfo/"+parsedBody.name+".json", JSON.stringify(parsedData,null,2),function(err){
				if(err){
					return console.log("err")
				}
			})
			res.end()
			next()
		})
	})
}

let counter = 1;
function updateWinStatInfo(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			if(counter % 2 == 0){
				let parsedData = JSON.parse(body)
				let winner = parsedData.winner
				let loser = parsedData.loser

				let win = 0;
				let lose = 0;
				let gamesPlayed = 0;

				let winnerFile = JSON.parse(fs.readFileSync("./userInfo/"+winner+".json",'utf-8'))
				let loserFile = JSON.parse(fs.readFileSync("./userInfo/"+loser+".json",'utf-8'))

				let dateObj = new Date().toString()
				winnerFile.win = winnerFile.win+1;
				loserFile.loss = loserFile.loss+1;
				winnerFile.numGamePlayed = winnerFile.numGamePlayed + 1
				loserFile.numGamePlayed = loserFile.numGamePlayed + 1;
				winnerFile.winPercentage = ((winnerFile.win / winnerFile.numGamePlayed)*100).toFixed(2)
				loserFile.winPercentage = ((loserFile.win / loserFile.numGamePlayed)*100).toFixed(2)
				winnerFile.gameHistory.unshift(loser)
				loserFile.gameHistory.unshift(winner)
				winnerFile.gameTime.unshift(dateObj.substr(0,10))
				loserFile.gameTime.unshift(dateObj.substr(0,10))
				winnerFile.gameStatus.unshift("win")
				loserFile.gameStatus.unshift("lose")

				fs.writeFileSync("./userInfo/"+winner+".json", JSON.stringify(winnerFile,null,2))
				fs.writeFileSync("./userInfo/"+loser+".json", JSON.stringify(loserFile,null,2))
				if(winnerFile.gameHistory.length > 18){
					winnerFile.gameHistory.pop()
					winnerFile.gameTime.pop()
					winnerFile.gameStatus.pop()
				}
				else{}
				if(loserFile.gameHistory.length > 18){
					loserFile.gameHistory.pop()
					loserFile.gameTime.pop()
					loserFile.gameStatus.pop()
				}
				else{}
				fs.writeFileSync("./userInfo/"+winner+".json", JSON.stringify(winnerFile,null,2))
				fs.writeFileSync("./userInfo/"+loser+".json", JSON.stringify(loserFile,null,2))
				counter++;
			}
			else{
				counter++;
			}
			next();
		})
	})
}
function updateWinStatInfoQuit(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
				let parsedData = JSON.parse(body)
				let winner = parsedData.winner
				let loser = parsedData.loser

				let win = 0;
				let lose = 0;
				let gamesPlayed = 0;

				let winnerFile = JSON.parse(fs.readFileSync("./userInfo/"+winner+".json",'utf-8'))
				let loserFile = JSON.parse(fs.readFileSync("./userInfo/"+loser+".json",'utf-8'))

				let dateObj = new Date().toString()
				winnerFile.win = winnerFile.win+1;
				loserFile.loss = loserFile.loss+1;
				winnerFile.numGamePlayed = winnerFile.numGamePlayed + 1
				loserFile.numGamePlayed = loserFile.numGamePlayed + 1;
				winnerFile.winPercentage = ((winnerFile.win / winnerFile.numGamePlayed)*100).toFixed(2)
				loserFile.winPercentage = ((loserFile.win / loserFile.numGamePlayed)*100).toFixed(2)
				winnerFile.gameHistory.unshift(loser)
				loserFile.gameHistory.unshift(winner)
				winnerFile.gameTime.unshift(dateObj.substr(0,10))
				loserFile.gameTime.unshift(dateObj.substr(0,10))
				winnerFile.gameStatus.unshift("win")
				loserFile.gameStatus.unshift("lose")

				fs.writeFileSync("./userInfo/"+winner+".json", JSON.stringify(winnerFile,null,2))
				fs.writeFileSync("./userInfo/"+loser+".json", JSON.stringify(loserFile,null,2))

				if(winnerFile.gameHistory.length > 18){
					winnerFile.gameHistory.pop()
					winnerFile.gameTime.pop()
					winnerFile.gameStatus.pop()
				}
				else{}
				if(loserFile.gameHistory.length > 18){
					loserFile.gameHistory.pop()
					loserFile.gameTime.pop()
					loserFile.gameStatus.pop()
				}
				else{}

				fs.writeFileSync("./userInfo/"+winner+".json", JSON.stringify(winnerFile,null,2))
				fs.writeFileSync("./userInfo/"+loser+".json", JSON.stringify(loserFile,null,2))
			next();
		})
	})
}

function updateTieStatInfo(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			if(counter % 2 == 0){
				let parsedData = JSON.parse(body)
				let player1 = parsedData.user1
				let player2 = parsedData.user2

				let tie = 0;
				let gamesPlayed = 0;

				let player1File = JSON.parse(fs.readFileSync("./userInfo/"+player1+".json",'utf-8'))
				let player2File = JSON.parse(fs.readFileSync("./userInfo/"+player2+".json",'utf-8'))

				let dateObj = new Date().toString()
				player1File.tied = player1File.tied+1
				player2File.tied = player2File.tied + 1

				player1File.numGamePlayed = player1File.numGamePlayed + 1
				player2File.numGamePlayed = player2File.numGamePlayed + 1;
				player1File.winPercentage = ((player1File.win / player1File.numGamePlayed)*100).toFixed(2)
				player2File.winPercentage = ((player2File.win / player2File.numGamePlayed)*100).toFixed(2)
				player1File.gameHistory.unshift(player2)
				player2File.gameHistory.unshift(player1)
				player1File.gameTime.unshift(dateObj.substr(0,10))
				player2File.gameTime.unshift(dateObj.substr(0,10))
				player1File.gameStatus.unshift("win")
				player2File.gameStatus.unshift("lose")

				fs.writeFileSync("./userInfo/"+player1+".json", JSON.stringify(player1File,null,2))
				fs.writeFileSync("./userInfo/"+player2+".json", JSON.stringify(player2File,null,2))
				if(player1File.gameHistory.length > 18){
					player1File.gameHistory.pop()
					player1File.gameTime.pop()
					player1File.gameStatus.pop()
				}
				else{}
				if(player2File.gameHistory.length > 18){
					player2File.gameHistory.pop()
					player2File.gameTime.pop()
					player2File.gameStatus.pop()
				}
				else{}
				counter++;
			}
			else{
				counter++;
			}
			next();
		})
	})
}
function readUserFile(req,res,next){
	let userName = req.originalUrl.split("/")[2]
	let fileData = JSON.parse(fs.readFileSync("./userInfo/"+userName+".json",'utf-8'))
	gameWin = fileData.win;
	gameLost =fileData.loss;
	winrate = fileData.winPercentage;
	numGame = fileData.numGamePlayed;
	winUser = fileData.userid

	jsonArray.val = []
	let len = fileData.gameHistory.length;
	for(i=0;i<len;i++){
		let obj = {"playerName": "",
							 "gameHistory":"",
							 "gameStat":"",
							 "gameTime" : ""}
		obj.playerName = fileData.userid
		obj.gameHistory = fileData.gameHistory[i]
		obj.gameStat = fileData.gameStatus[i]
		obj.gameTime = fileData.gameTime[i]
		jsonArray.val.push(obj)
	}
	next()
}


let userArray = []
function findOpponentPlayer(req,res,next){
	userArray.push(req.params.uname)
	let newArray = []
	for(i=0;i<userArray.length;i++){
		if(userArray[i] != req.params.uname){
			newArray.push(userArray[i])
		}
	}
	let newPair =[]
	let pairFound = false;
	newPair.push(req.params.uname)

	if(userArray.length != 0){
		newPair.push(newArray[0])
		if(newPair[1] != undefined){
			newArray.shift()
			newArray.shift()
			userArray.shift()
			userArray.shift()
			pairFound = true;
			opp1 = newPair[1]
			opp2 = newPair[0]
		}
	}
	res.status(200).send()
	next()
}
function makeFriends(req,res,next){

			let body=""

			req.on("data", (chunk) => {
				body+=chunk
				req.on("end", () => {
					let searchedFriend = JSON.parse(body).newFriendName
					let data = fs.readFileSync("./userInfo/"+req.url.split("/")[2]+".json",'utf-8')
					let friendData = fs.readFileSync("./userInfo/"+searchedFriend+".json",'utf-8')
					let parsedData = JSON.parse(data);
					let parsedFriendData = JSON.parse(friendData);
					if(!parsedData.friendReq.includes(searchedFriend) && !parsedFriendData.friendReq.includes(req.url.split("/")[2])){
					//	parsedData.friendReq.push(searchedFriend);
						parsedFriendData.friendReq.push(req.url.split("/")[2]);
					}
					fs.writeFile("./userInfo/"+req.url.split("/")[2]+".json", JSON.stringify(parsedData,null,2),function(err){
						if(err){
							return console.log("err")
						}
					})
					fs.writeFile("./userInfo/"+searchedFriend+".json", JSON.stringify(parsedFriendData,null,2),function(err){
						if(err){
							return console.log("err")
						}
					})
				})
			})
		res.send()
		next()
}
function friendsList(req,res,next){
	let readFile = fs.readFileSync("./userInfo/"+req.params.uname+".json",'utf-8')
	let len = JSON.parse(readFile).friends.length
	let friendReqLen = JSON.parse(readFile).friendReq.length
	listFriends = []
	loggedInFriends = []
	friendReqArray = []
	for(i=0;i<len;i++){
		listFriends.push(JSON.parse(readFile).friends[i])
	}
	for(i=0;i<len;i++){
		let friendsName = JSON.parse(readFile).friends[i]
		let readFriendFile = fs.readFileSync("./userInfo/"+friendsName+".json",'utf-8')
		loggedInFriends.push(JSON.parse(readFriendFile).loggedin)
	}
	for(i=0;i<friendReqLen;i++){
		let reqName = JSON.parse(readFile).friendReq[i]
		friendReqArray.push(reqName)
	}
	next()
}
function findNewFriend(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let parsedData = JSON.parse(body);
			let friendName = parsedData.newFriendName;
			let fileExist = checkIfFileExist(friendName)
			if(fileExist == true && friendName != req.params.uname){

				let data = fs.readFileSync("./userInfo/"+req.params.uname+".json",'utf-8')
				let friendData = fs.readFileSync("./userInfo/"+friendName+".json",'utf-8')
				let parsedUserData = JSON.parse(data)
				let parsedFriendData = JSON.parse(friendData);

				if(!parsedUserData.friends.includes(friendName) && parsedFriendData.status != "private") {
					searchedNewFriend.push(friendName);
					if(parsedFriendData.friendReq.includes(req.params.uname)){
						res.status(200).send("sent")
						next()
					}
					else{
						//res.render("connect4_friends", {searchedFriend:searchedFriend, searchedNewFriend:searchedNewFriend, numwins:friendObj.win, numlosses:friendObj.loss, numties:friendObj.tied, gamesplayed:friendObj.numGamePlayed, winpercent:friendObj.winPercentage, listOfFriends:listFriends})
						res.status(200).send(friendName)
						next();
					}
				}
				else{
					searchedNewFriend = [];
					res.send("Already friend or private account")
					next();
				}
			}
			else{
				searchedNewFriend = [];
				res.send("Friend not found")
				next();
			}
		});
	})
}

function updateUserStatus(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let status = JSON.parse(body).status
			if(status == true){
				let data = fs.readFileSync("./userInfo/"+req.params.uname+".json",'utf-8')
				let parsedData = JSON.parse(data)
				parsedData.status = "public"
				fs.writeFile("./userInfo/"+req.params.uname+".json", JSON.stringify(parsedData,null,2),function(err){
					if(err){
						return console.log("err")
					}
				})
				res.send()
				next()
			}
			else if(status == false){
				let data = fs.readFileSync("./userInfo/"+req.params.uname+".json",'utf-8')
				let parsedData = JSON.parse(data)
				parsedData.status = "private"
				fs.writeFile("./userInfo/"+req.params.uname+".json", JSON.stringify(parsedData,null,2),function(err){
					if(err){
						return console.log("err")
					}
				})
				res.send()
				next()
			}
		})
	})
}
function updateUserMode(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let modeChange = JSON.parse(body).mode
			if(modeChange == true){
				let data = fs.readFileSync("./userInfo/"+req.params.uname+".json",'utf-8')
				let parsedData = JSON.parse(data)
				parsedData.mode = "dark"
				fs.writeFile("./userInfo/"+req.params.uname+".json", JSON.stringify(parsedData,null,2),function(err){
					if(err){
						return console.log("err")
					}
				})
				res.send("dark")
				next()
			}
			else if(modeChange == false){
				let data = fs.readFileSync("./userInfo/"+req.params.uname+".json",'utf-8')
				let parsedData = JSON.parse(data)
				parsedData.mode = "light"
				fs.writeFile("./userInfo/"+req.params.uname+".json", JSON.stringify(parsedData,null,2),function(err){
					if(err){
						return console.log("err")
					}
				})
				res.send("light")
				next()
			}
		})
	})
}

function acceptRequest(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let friend = JSON.parse(body).friendName
			let data = JSON.parse(fs.readFileSync("./userInfo/"+friend+".json",'utf-8'))
			let user = JSON.parse(fs.readFileSync("./userInfo/"+req.url.split("/")[2]+".json",'utf-8'))
			let requestArray = []
			data.friends.push(req.url.split("/")[2])
			user.friends.push(friend)

			for(i=0;i<user.friendReq.length;i++){
				if(user.friendReq[i] != friend){
					requestArray.push(user.friendReq[i])
				}
			}
			user.friendReq = []
			for(i=0;i<requestArray.length;i++){
				user.friendReq.push(requestArray[i])
			}
			fs.writeFileSync("./userInfo/"+friend+".json", JSON.stringify(data,null,2))
			fs.writeFileSync("./userInfo/"+req.url.split("/")[2]+".json", JSON.stringify(user,null,2))

		})
	})
	res.status(200).send()
	next()
}
function rejectRequest(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let friend = JSON.parse(body).friendName
			let data = JSON.parse(fs.readFileSync("./userInfo/"+friend+".json",'utf-8'))
			let user = JSON.parse(fs.readFileSync("./userInfo/"+req.url.split("/")[2]+".json",'utf-8'))
			let requestArray = []

			for(i=0;i<user.friendReq.length;i++){
				if(user.friendReq[i] != friend){
					requestArray.push(user.friendReq[i])
				}
			}
			user.friendReq = []
			for(i=0;i<requestArray.length;i++){
				user.friendReq.push(requestArray[i])
			}
			fs.writeFileSync("./userInfo/"+friend+".json", JSON.stringify(data,null,2))
			fs.writeFileSync("./userInfo/"+req.url.split("/")[2]+".json", JSON.stringify(user,null,2))
		})
	})
	res.status(200).send()
	next()
}
function unfriendUser(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let friend = JSON.parse(body).friendName
			let data = JSON.parse(fs.readFileSync("./userInfo/"+friend+".json",'utf-8'))
			let user = JSON.parse(fs.readFileSync("./userInfo/"+req.url.split("/")[2]+".json",'utf-8'))
			let friendsArray = []
			let anotherFriendsArray = []
			for(i=0;i<user.friends.length;i++){
				if(user.friends[i] != friend){
					friendsArray.push(user.friends[i])
				}
			}
			user.friends = []
			for(i=0;i<friendsArray.length;i++){
				user.friends.push(friendsArray[i])
			}

			for(i=0;i<data.friends.length;i++){
				if(data.friends[i] != req.url.split("/")[2]){
					anotherFriendsArray.push(data.friends[i])
				}
			}
			data.friends = []
			for(i=0;i<anotherFriendsArray.length;i++){
				data.friends.push(anotherFriendsArray[i])
			}

			fs.writeFileSync("./userInfo/"+friend+".json", JSON.stringify(data,null,2))
			fs.writeFileSync("./userInfo/"+req.url.split("/")[2]+".json", JSON.stringify(user,null,2))
		})
	})
	res.status(200).send()
	next()
}
function displayfriendStat(req,res,next){
	let body=""
	req.on("data", (chunk) => {
		body+=chunk
		req.on("end", () => {
			let friendName = JSON.parse(body).friendName
			let friendData = JSON.parse(fs.readFileSync("./userInfo/"+friendName+".json",'utf-8'))
			let gameSummaryOffriend =  {"val":[]}

			gameSummaryOffriend.val = []

			if(friendData.status == "public"){
				if(friendData.gameHistory.length < 5){
					for(i=0;i<friendData.gameHistory.length;i++){
						let obj = {"playerName": "",
											 "gameHistory":"",
											 "gameStat":"",
											 "gameTime" : ""}
						obj.playerName = friendData.userid
						obj.gameHistory = friendData.gameHistory[i]
						obj.gameStat = friendData.gameStatus[i]
						obj.gameTime = friendData.gameTime[i]
						gameSummaryOffriend.val.push(obj)
					}
				}
				else{
					for(i=0;i<5;i++){
						let obj = {"playerName": "",
											 "gameHistory":"",
											 "gameStat":"",
											 "gameTime" : ""}
						obj.playerName = friendData.userid
						obj.gameHistory = friendData.gameHistory[i]
						obj.gameStat = friendData.gameStatus[i]
						obj.gameTime = friendData.gameTime[i]
						gameSummaryOffriend.val.push(obj)
					}
				}

				let friendInfoData = {fname:friendData.firstname, lname:friendData.lastname,win:friendData.win,lose:friendData.loss,numGame:friendData.numGamePlayed,winRate:friendData.winPercentage, gameSum:gameSummaryOffriend}

				res.send(JSON.stringify(friendInfoData))
			}
			else if(friendData.status == "private"){
				res.send("private")
			}
		})
	})
	next()
}

http.listen(3000,() =>{
	console.log('Server running at http://127.0.0.1:3000/');
});
let color = "red"
io.on("connection",handleConnection);
function handleConnection(socket){
	socket.on("disconnect",msg =>{
		io.emit("leftGame",socket.username)
	})
	socket.on("register", userName =>{
		socket.username = userName
		io.emit("userTurn",userName)
	})
	socket.on("buttonId", buttonID =>{
		io.emit("userJoined",buttonID)
		io.emit("retrieve",socket.username,buttonID)
	})
	socket.on("sendMsg", msgData =>{
	})
	socket.on("msg1",data=>{
		io.emit("sendMsg1",data,socket.username)
	})
}
