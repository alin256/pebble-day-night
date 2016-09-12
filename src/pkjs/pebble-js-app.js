Pebble.addEventListener("ready",
  function(e) {
    var time = Math.round((new Date()).getTime() / 1000);
    Pebble.sendAppMessage({"0": time});
  }
);

// Function to send a message to the Pebble using AppMessage API
// We are currently only sending a message using the "status" appKey defined in appinfo.json/Settings
function sendMessage() {
	Pebble.sendAppMessage({"status": 1}, messageSuccessHandler, messageFailureHandler);
}

// Called when the message send attempt succeeds
function messageSuccessHandler() {
  console.log("Message send succeeded.");  
}

// Called when the message send attempt fails
function messageFailureHandler() {
  console.log("Message send failed.");
  sendMessage();
}

var strPlace1 = "Bergen";
var strPlace2 = "Bagdad";
if (typeof localStorage.getItem('strPlace1') != "undefined")
  {
    //ip_string = localStorage.getItem('place1');
    // Show the notification
    //Pebble.showSimpleNotificationOnPebble("IP loaded", ip_string);
  }


//show config
Pebble.addEventListener('showConfiguration', function() {
  var url = 'https://alin256.github.io/dual-time-config/zone-config.html';
  Pebble.openURL(url);
});

//Called when config is executed
Pebble.addEventListener('webviewclosed', function(e) {
  // Decode the user's preferences
  var configData = JSON.parse(decodeURIComponent(e.response));
  console.log("Places: " + configData.place1 + ", " + configData.place2);
  strPlace1 = configData.place1;
  strPlace2 = configData.place2;
  // Store some data
  localStorage.setItem('place1', strPlace1);
  localStorage.setItem('place2', strPlace2);
  
  // Show the notification
  Pebble.showSimpleNotificationOnPebble("Places updatedd", 
                                        configData.place1 + ", " + configData.place2);
});

												

