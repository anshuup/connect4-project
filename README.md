# connect4-project
 
---------------------------
Project: Connect 4
Name : Anshu Patel
ID: 101082781
---------------------------
visit https://connect4-gamex.herokuapp.com/ for demo

Files/folders included:
	
	connect4.html			: Main HTML page
	
	connect4_tournament.html	: Tournament page which loads when user clicks on Play Tournament(after login)
 
 	howToPlayPage.html		: Information regarding playing game
 
 	connect4server.js		: creating server, GET and Post request
 
 	playGuest.html 		: When User clicks on Play as Guest button, this page loads

 folders structure:
 
 	public:
    		css:
      			connect4.css			: placement/styling for each html/pug page
 		images	: contains the required image for the pages
    
    		JavaScript:
      			connect4_businessLogic.js - Contains JavaScript of business logic which runs in node.js console
      			connecct4_tournamnet.js - contains JavaScript of connect4_tournament.html
      			connect4.js - Contains JavaScript of connect4.html, afterlogInPage.html
      			createGame.js - contains JavaScript of connect4_gamePage.html, afterlogInPage.html
  	userInfo - contains all the json file of each user

  	views -- contains pug files

References:
-- html to pug converter : https://html-to-pug.com/
-- https://www.w3schools.com/howto/howto_css_switch.asp
