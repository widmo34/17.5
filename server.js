var express = require('express');
var app = express();
var path = require('path');


app.get('/test', function(req, res){
   res.send('Hello World');
})

app.use('/store', function(req, res, next){
    console.log(' Jestem pośrednikiem przy żądaniu do /store');
    next();
})



app.get('/store', function(req, res){
    res.send('to jest sklep');
})

app.get('/', function(req, res){
 
    res.sendFile(path.join(__dirname, '/assets', 'index.html'));
    
});

app.get('/userform', function(req, res){
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    res.send(JSON.stringify(response));
})

var server = app.listen(3000, 'localhost', function(){
    var host = server.address().address;
    var port = server.address().port;
  
    app.use(express.static('assets'));
  
    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port )
});

app.use(function(req, res, next){
    res.status(404).send('Wybacz strona nie istnieje');
})
