const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({apiKey: "e22f5833d83a6d896214c12a247c4146-us21",  server: "us21",});

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res)
{ res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res)
{
    const firstName= req.body.fname;
    const lastName= req.body.lname;
    const email= req.body.email;

    //const run = async () =>
    // {
    //    const response = await client.lists.addListMember("f3e7f8ad4a", {
    //      email_address: email,
    //      status: "subscribed",
    //      merge_fields: {
    //          FNAME: firstName,
    //          LNAME: lastName
    //      }
    //    });
    //    console.log(response); // (optional) 
    //  };
    //  run();
         const data = {
             members : [
                 {
                     email_address : email,
                     status : "subscribed",
                     merge_fields : {
                         FNAME : firstName,
                         LNAME : lastName
                     }
                 }
             ]
            }
  

         const jsonData = JSON.stringify(data);
         const url = "https://us21.api.mailchimp.com/3.0/lists/f3e7f8ad4a";
         const options = {
                    method : "POST",
                    auth: "abhijeet:e22f5833d83a6d896214c12a247c4146-us21"
                   }
         const request = https.request(url , options , function(response)
         {    if(response.statusCode===200){
                 res.sendFile(__dirname+ "/success.html");
                 }
                 else {
                  res.sendFile(__dirname+ "/failure.html");
                 }


            response.on("data", function(data){
            console.log(JSON.parse(data));
            });
         });
         
         request.write(jsonData);
        request.end();
    
});

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server  is running at 3000");
 });

 //API key -  e22f5833d83a6d896214c12a247c4146-us21
 // list di - f3e7f8ad4a