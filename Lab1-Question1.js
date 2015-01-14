/**
 * New node file
 */
/**
 * New node file
 */
var application_root = __dirname,
express = require("express"),
mysql = require('mysql');
path = require("path");

var url=require("url");
var arg1;
var arg2;
var num;

var primes = [];

var app = express();

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'Thay1rSaadam',
	database: "cmpe273"
});

app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, "public")));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


function isPrime( n ) {
	var max = Math.sqrt(n);
	for( var i = 2;  i <= max;  i++ ) {
		if( n % i === 0 )
			return false;
	}
	return true;
}
function listPrimes( nPrimes ) {
	primes=[];
	for( var n = 2;  n<=nPrimes;  n++ ) {
		if( isPrime(n) ) {
			primes.push( n );

		}

	}
	return primes;
}



app.get('/', function(req,res){
	res.sendfile('./sample.htm');
});

app.get('/findprimes', function(req,res){
	res.sendfile('./findprimes.htm');
});

app.get('/checkifprime', function(req,res){
	res.sendfile('./checkifprime.htm');
});

app.get('/checkifprimenumber', function(req,res){

	var pathname=url.parse(req.url).pathname;
	var _get=url.parse(req.url, true).query;

	var data1=_get['number'];
	console.log("Request for" + pathname+ " and " + data1);
	if((data1>1000)||(data1<0))
	{
		res.statusCode=400;
		return res.send('Error: Enter a valid number within 1000.');
	}
	if (isNaN(data1)) {
		res.statusCode=400;
		return res.send("This is not a number. Please enter a valid number within 1000!");
	}
	if((data1==1)||(data1==0))
	{
		//console.log("Request for 1 or 0!");
		res.statusCode=200;
		return res.send("1 and 0 are neither prime nor composite! Enter any valid number from 2 till 1000!");
	}
	else if(isPrime(data1))
	{
		//console.log("Request for any number other than 1 and prime.");
		res.statusCode=200;
		return res.send("The number "+data1+" is prime!");
	}
	else
	{
		res.statusCode=200;
		return res.send("The number "+data1+" is a composite!");
	}
});

app.get('/findprimenumber', function (req, res) {
	var pathname=url.parse(req.url).pathname;
	var _get=url.parse(req.url, true).query;

	var data1=_get['number'];
	console.log("Request for" + pathname+ " and " + data1);
	if((data1>1000)||(data1<0))
	{
		res.statusCode=400;
		return res.send('Error: Enter a valid number within 1000.');
	}
	if (isNaN(data1)) {
		res.statusCode=400;
		return res.send("This is not a number. Please enter a valid number within 1000!");
	}
	if((data1==1)||(data1==0))
	{
		res.statusCode=200;
		return res.send("1 or 0 is neither prime nor composite! Enter any valid number from 2 till 1000!");
	}
	var i;
	listPrimes(data1);	
	//return res.send("This " + data1 + " is prime!");
	//console.log("Length: "+ primes.length);
	var str= "The primes till "+ data1 + " are: \n";

	//for(i=0;i<primes.length; i++)
	
	res.writeHead(200, {'Content-Type': 'application/json'});
	//for(i=0;i<primes.length; i++)
	//res.statusCode=200;
	res.end(str + primes);
	


});



app.get('/chumma', function(req, res) {
	res.sendfile('./index.html');
});

app.post('/chumma', function (req, res){
	console.log("POST: ");

	arg1 = req.body.num1;
	arg2 = req.body.num2;
	num = parseInt(arg1);

	console.log("Argument: " + num + " and " + arg1 + arg2);

	res.send("added value" + num);

	res.send('Form Submitted '+num);
	//res.send("added value" +arg3);

});

// Launch server
app.listen(4010);