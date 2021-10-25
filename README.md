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

 folders:
	
  	public:
    		css:
      			connect4.css			: placement/styling for each html/pug page
 		images: contains the required image for the pages
    
    		JavaScript:
      			connect4_businessLogic.js - Contains JavaScript of business logic which runs in node.js console
      			connecct4_tournamnet.js - contains JavaScript of connect4_tournament.html
      			connect4.js - Contains JavaScript of connect4.html, afterlogInPage.html
      			createGame.js - contains JavaScript of connect4_gamePage.html, afterlogInPage.html
  	userInfo - contains all the json file of each user

  	views -- contains pug files

To run Page on localhost:
-> in cmd use node connect4server.js
-> type localhost:3000

To run on openstack
 -- Instance Name: AnshuPatel
 -- IP address : 134.117.133.186
 -- username:student
 -- password: connect4Project
 -- folder is located in student directory, named connect4FinalSubmission -> connect4_check_in#3
 -- Then connect on localhost:9999 using ssh -L 9999:localhost:3000 student@134.117.133.186. And once connected navigate your browser to localhost:9999

To Log into the page
 -- Try any of the username and password
 -- username : annasmith
 -- password : annasmith

 -- username : janedoe
 -- password : janedoe

 -- username : janes
 -- password : janes

 -- username : johndoe
 -- password : johndoe

 -- username : user123
 -- password : user1

To Play game/Tournament
-- Open one user account in one tab and other user in other tab
-- then select Play/Play Tournament button for both players and it will connect the both user to play a game


References:
-- html to pug converter : https://html-to-pug.com/
-- https://www.w3schools.com/howto/howto_css_switch.asp
