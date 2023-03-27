const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const https = require('https');

app.use(bodyParser.urlencoded({extended: true}));

// this will tell what should render when browser makes a request for page
// /this means will render root of page

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html")
})

app.get("/about",function(req,res){
  res.send("Im RZ")

})

// app.post("/",function(req,res){
//   var num1 = Number(req.body.num1);
//   var num2 = Number(req.body.num2);
//
//   var result = num1+num2;
//   //only string can be sent
//   res.send(String(result))
//
// })

app.post("/",function(req,res){
  // var location = req.body.location;
  var location = "London"
  const apiKey = "b25e207dbf2882e98fbe92a13e1a0f5c";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&limit=5&appid="+apiKey+"&units=metric";

  https.get(url,function(response){
    response.on("data",function getData (data){
      var weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      res.send(String(temp))
    })
  })
})

app.listen(3000,function (){
  console.log("server started on port 3000");
} );
