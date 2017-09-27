//Call package
var Discord = require("discord.js"); // require the installed discord package to run
var schedule = require('node-schedule');
var caterpieBot = new Discord.Client(); //create new discord client
var nextClubMeeting; //variable to hold the club meeting date (currently does NOT persist)

var onlineMeetingReminder = schedule.scheduleJob('46 21 * * *', function()//'0 3 21 * * *'
{
  console.log("test321");
  caterpieBot.channels.find("name", "bot-testing").send("Its 10:18");
})

//Listener Event for recieved messages
caterpieBot.on("message", message => //this is called every time the bot reads a message.
{
  var commands = [" !Terminate", " !Restart", " !Commands", " !Caterpiefact", " !Pokefact"]; //All bot commands
  var pokeFacts = ["Cubone wears the skull of its dead mother like a mask.",
  "The name Pokemon isn't Japanese at all! It's really just a combination of 'pocket' and 'monster.'",
  "Kabutops cut open prey with their claws, then suck up the spilled bodily fluids."]; //database of pokefacts
  var randomNumber;

  var sender = message.author; // who sent the message
  var msg = message.content.toUpperCase(); // convert message to all uppercase letters
  var prefix = "!" //command to interact with caterpieBot
  var tempMsg = msg; //set msg to a tempmsg
  var splitMsg = tempMsg.split(":"); //split the string into two strings when finding the character ":"


  if(splitMsg[0] === "CATERPIE, PLEASE SCHEDULE OUR NEXT CLUB MEETING FOR")
  {
      message.channel.send("Yes " + sender + ", I will schedule the next club meeting for: " + splitMsg[1])

      nextClubMeeting = splitMsg[1]; //Set club meeting to the second part of the message (the date)

      console.log(nextClubMeeting);
  }

  if(msg === prefix + "CLUBMEETING")
  {
      //message.channel.send(msg) // reply to "!caterpiefact"
      message.channel.send("The next club meeting is scheduled for: " + nextClubMeeting)
  }
  if(msg === "HI CATERPIE")
  {
      message.channel.send("Hello " + sender)
  }
  if(msg === prefix + "CATERPIE")
  {
      //message.channel.send(msg) // reply to "!caterpiefact"
      message.channel.send("test!!")

  }

  if(msg === prefix + "TERMINATE")
  {
      throw new Error("Process ended.");
  }

  if(msg === prefix + "RESTART")
  {
      Process.RESTART(); //currently does not work properly. (i think?)
  }

  if(msg === prefix + "COMMANDS") //command that a user may enter
  {
      message.channel.send("Here is the current list of Commands: " + commands) // reply to "!caterpiefact"
  }

  if(msg === prefix + "POKEFACT") //command that a user may enter
  {
      randomNumber = Math.floor(Math.random() * pokeFacts.length); //get a random number between 0 and how many pokefacts there are.
      message.channel.send(pokeFacts[randomNumber]) // send a random string from pokeFacts[]
  }
});

caterpieBot.on("ready", () => //this is called when the bot first starts (only once)
{
  //Clock();
});

caterpieBot.login("MzUzOTY0NjE4OTQ4ODA0NjA4.DI3W5Q.z5A6nlMHyVJCE8e-ZfrkQ8kGP_I") //Bot"s token found in https://discordapp.com/developers/applications/me/353964618948804608?success=created

function Clock () //so the bot can tell what time it was started when it starts (code similiar to the time script we made in csc201 class)
{
    var currentTime = new Date ( );

    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds ( );

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

    // Convert an hours component of "0" to "12"
    currentHours = ( currentHours == 0 ) ? 12 : currentHours;

    // Compose the string for display
    currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

    //Send the time to channel along with a welcome message
    caterpieBot.channels.find("name", "bot-testing").send("Caterpie Bot is now online. The time is: " + currentTimeString);
}
