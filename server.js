// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octobar", "November", "December"]

function isNumeric(num){
   return (typeof num == "number" && !isNaN(num));
}

function convertToDate(dateString){
  var natural = null;
  var unix = 0
  if(isNaN(parseInt(dateString))){
    console.log("Its a string: ", dateString)
    var date = new Date(dateString);
    natural = dateString
    unix = date.getTime()/1000
  }else{
    console.log("Its a number")
    var date = new Date(dateString * 1000)
    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    natural =  `${month} ${day}, ${year}`
    unix = parseInt(dateString)
  }
  return  {natural, unix}
}

app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/views/index.html")
})
// http://expressjs.com/en/starter/basic-routing.html
app.get("/:date", function (request, response) {
  console.log(request.params.date)
  const myDate = convertToDate(request.params.date);
  console.log(myDate)
  response.json(myDate)
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
