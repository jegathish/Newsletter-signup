//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/82d3a4831e",
    method: "POST",
    headers: {
       "Authorization": "jegathish fc8f40a38e0828ef40c9a40a25a0b392-us20"
     },
    body: jsonData
  };

  request(options, function(error, response, body){
    if(error) {
      res.sendFile(__dirname + "/failure.html");
    }
    else {
      if(response.statusCode===200) {
        res.sendFile(__dirname + "/success.html");
      }
      else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post("/failure",function(req, res) {
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});
