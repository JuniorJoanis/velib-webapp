
/**
 * Module dependencies.
 */
var config = require('./config/config.json');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var https = require('https');
var path = require('path');

var events = require("events");
var url = require('url');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


//*******************//
var opts = {
	host : 'api.jcdecaux.com',
	path : '/vls/v1/stations?apiKey='+config.apiKey+'&contract=Paris',	
	method : 'GET' 
};

var velib_emitter = new events.EventEmitter(); 
var jsonResponse = "";
var velibs;
console.info('Options prepared:');
console.info(opts);
console.info('Do the GET call');
function getVelibs() {
	var reqGet = https.request(opts, function(res) {
	    console.log("statusCode: ", res.statusCode);
	
	    res.on('data', function(d) {
					jsonResponse += d;
	    });
			
			res.addListener("end", function() {  
					console.info('\n\nCall completed');
           if(velibs != JSON.parse(jsonResponse)) { 
	 						velibs = JSON.parse(jsonResponse);
              velib_emitter.emit("velibs", velibs); 
							jsonResponse = "";		
           }  
			 });
	});	
	
	reqGet.on('error', function(e) {
	    console.error(e);
	});
	reqGet.end();
}
getVelibs();
setInterval(getVelibs, 7000);
//*******************//


app.get('/velibs.json', function(req, res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query['contract']);
	var listener = velib_emitter.addListener("velibs", function(velibs) {  
			call_number +=1 ;
			console.info("NEW API CALL: number = "+call_number+" \n");
      res.end(JSON.stringify(velibs));  
 });
});


var call_number = 0;
http.createServer(app).listen(app.get('port'), function(){
	console.info("Server Hit !");
  console.log('Express server listening on port ' + app.get('port'));
});
