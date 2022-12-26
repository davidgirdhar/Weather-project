const express = require("express");
const https = require("https");


const app = express();

// 1be9eca93837a1cd110922b93720c28b
app.get("/",function(req,res){
    // res.send("request received");
    res.sendFile(__dirname +"/input.html") 

})


app.post("/",function(req,res){
    console.log("in post",req.body);

    const apid =  ""
    var city = "london"
    https.get('https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=metric&appid='+ apid, (response) => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    response.on('data', (d) => {
        // process.stdout.write(d);
        console.log("d",d);
        var weatherdata = JSON.parse(d)
        console.log("weatherdata",weatherdata);
        var temperature = weatherdata.main.temp;
        var city = weatherdata.name;
        var desp = weatherdata.weather[0].description
        var icon = weatherdata.weather[0].icon;
        const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

        console.log(weatherdata.weather[0].description)
        res.write("<p>The weather is currently"+ desp + "</p>")
        res.write("<h1>temperature of " +city+ " is "+ temperature + "*C</h1>")
        res.write("<img src="+imageurl+"></img>")
        res.send();
    });

    }).on('error', (e) => {
    console.error(e);
    });


})



app.listen(3000,function(){
    console.log("server started");
})
