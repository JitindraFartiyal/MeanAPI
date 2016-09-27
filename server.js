var express = require('express');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var app = express();
var url = "mongodb://jitindrafartiyal-meanapi-3821685:27017/contactlist";

// configure app

// use middleware



// define the routes

app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.json());


app.get('/contactlist',function(req, res){
    console.log('I recieved a GET request'); 
    var result = [];

    mongo.connect(url,function(err,db){
        if(err != null)
            console.log('Error in connecting to database');
        else
        {
            console.log('Successfully connected to database');
            var cursor = db.collection('contacts').find();
            
            cursor.forEach(function(doc,err){
                if(err != null)
                    console.log('Unable to fetch data');
                else    
                    result.push(doc);    
            },function(){
                res.json(result);
            });
        }
   });
});

app.post('/addcontact',function(req, res){
    console.log('Adding user contact details : ',req.body);
    mongo.connect(url,function(err,db){
        if(err != null)
            console.log('Error in connecting to database');
        else
        {
            db.collection('contacts').insert(req.body,function(err,doc){
                if(err != null)
                    console.log('Error in inserting database');
                else
                {
                    console.log('Successfully added contact details');
                     res.json(req.body);
                }     
            });
        }
    });
});

// start the server

var port = process.env.PORT || 8080;
app.listen(port,function(err){
    if(err != null)
        console.log('Error in starting server at port : ',port);
    else
        console.log('Successfully started server at port : ',port);
});