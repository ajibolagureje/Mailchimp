
const express = require("express");
const bodyParser= require("body-parser"); 
const request = require("request");
const https = require("https");

const app = express();
const port = 5000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname + "/signup.html")
})


app.post("/",function(req,res){
      const firstname= req.body.firstname;
      const lastname = req.body.lastname;
      const email = req.body.email;
    //   const data = firstname + lastname + email
    //   console.log(firstname, lastname, email)

      const data = {
          members: [ 
              {
                  email_address: email,
                  status: "subscribed",
                  merge_fields:{
                      FNAME:firstname,
                      LNAME: lastname
                  }
              }
          ]
      }
      const jsonData = JSON.stringify(data)
      const url = "https://us20.api.mailchimp.com/3.0/lists/1778a26975/"

      const options = {
          method: "POST",
          auth: "jibola:007d39ab0f81ad878e93850d7a8b3591-us20"
      }
     const request = https.request(url,options, function(response){
          response.on("data",function(data){
            //   console.log(JSON.parse(data));
          })
           if(response.statusCode === 200){
               res.sendFile(__dirname + "/succes.html");
           } else{
               res.sendFile(__dirname +"/failure.html")
           }
      })
      request.write(jsonData);
      request.end()
})

app.post("/tryagain", function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || port, function(){
    console.log("Server started at port 5000");
})
 



// Apikey
// 007d39ab0f81ad878e93850d7a8b3591-us20

// List id
// 1778a26975