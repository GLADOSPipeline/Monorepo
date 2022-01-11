const express = require('express'); //Import the express dependency
const fs = require('fs');
const {
	spawn,
	fork
} = require('child_process');
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5005; //Save the port number where your server will be listening
var submit = false;
var expname = null;
var filepath = "";


//main();




//Idiomatic expression in express to route and respond to a client request
app.use(express.static('public'));
app.use(express.json());
app.use('/styles', express.static(__dirname + 'public/styles'));
app.use('/scripts', express.static(__dirname + 'public/scripts'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/html/loginpage.html');
});
app.get('/index', (req, res) => {
	res.sendFile(__dirname + '/html/index.html');
});
app.get('/parameters', (req, res) => {
	res.sendFile(__dirname + '/html/parameters.html');
});
app.get('/favicon.ico', (req, res) => {
	res.sendFile(__dirname + '/favicon.ico');
});

app.post('/parameters', (req, res) => {	
	expname = req.body.experimentName;
	console.log(expname);

	var json = req.body;

	submit = req.body.submit;
	console.log(__dirname + `/exploc/experiment_${expname}`);
	// instantiate experiment on DB, recv ID.
	// as soon as id is here, create working directory under /exploc/experiemnt_[id]
	// fs.writeFile(__dirname + `/exploc/experiment_${expname}`, JSON.stringify(req.body), err => {
	// 	if (err) {
	// 		console.error(err)
	// 		return
	// 	}
	// 	//file written successfully
	// })

	app.post(`/experiment`,(req, res) => {
		res.send(json);
		})
	})
	// announce to daemon that new experiment is online
	//


//Comment out the next method before testing
app.listen(port, () => { //server starts listening for any attempts from a client to connect at port: {port}
	console.log(`Now listening on port ${port}`);
});

function main() {
	const path_a = 'GLADOS_PROD_A';
	const path_b = 'GLADOS_PROD_A';
	let fifo_b = spawn('mkfifo', [path_b]); // Create Pipe B
	fifo_b.on('exit', function (status) {
		console.log('Created Pipe B');

		const fd = fs.openSync(path_b, 'r+');
		let fifoRs = fs.createReadStream(null, {
			fd
		});
		let fifoWs = fs.createWriteStream(path_a);

		console.log('Ready to write')

		setInterval(() => {
			if (submit) {		
				submit = false;
				console.log('-----   Send packet   -----');
				fifoWs.write(__dirname + `/exploc/experiment_${expname}`);
			}
		}, 1000); // Write data at 1 second interval

		fifoRs.on('data', data => {
			console.log('----- Received packet -----');
			console.log(data.toString());
		});
	});

}


//Place functions to be tested below, there should be a copy here and in main
// function paramJSON(paramName, defaultVal, minVal, maxVal, incrementVal) {
// 	const parsedDef = parseFloat(defaultVal);
	// const parsedMin = parseFloat(minVal);
	// const parsedMax = parseFloat(maxVal);
	// const parsedInc = parseFloat(incrementVal);
// 	if(isNaN(parsedDef) || isNaN(parsedMin) || isNaN(parsedMax) || isNaN(parsedInc)) {
// 		throw new TypeError();
// 	}
// 	var param = {
// 		"paramName" : paramName,
// 		"values" :
// 		[defaultVal,
// 		minVal,
// 		maxVal,
// 		incrementVal]
// 	}
// 	return param;
// }

// function createUser(username, password) {

// }

// function checkUser(username, password) {

// }


// function experimentParamsJSON(paramsArr, experimentName, user, experiment){

// 	const params = {
// 		"experimentName": experimentName,
// 		"user": user,
// 		"parameters": paramsArr,
// 		"file" : experiment
// 	};
// return params;

// }


// module.exports.paramJSON = paramJSON;
// module.exports.experimentParamsJSON = experimentParamsJSON;
// module.exports.createUser = createUser;
// module.exports.checkUser = checkUser;
