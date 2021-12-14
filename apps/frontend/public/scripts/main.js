// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// const dom = new JSDOM();

//Save


function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}

function paramJSON(paramName, defaultVal, minVal, maxVal, incrementVal) {
	const parsedDef = parseInt(defaultVal);
	const parsedMin = parseInt(minVal);
	const parsedMax = parseInt(maxVal);
	const parsedInc = parseInt(incrementVal);
	if(isNaN(parsedDef) || isNaN(parsedMin) || isNaN(parsedMax) || isNaN(parsedInc)) {
		throw new TypeError();
	}
	var param = {
		"paramName" : paramName,
		"values" :
		[defaultVal,
		minVal,
		maxVal,
		incrementVal]
	}
	return param;
}

function createUser(username, password) {

}

function checkUser(username, password) {

}
 

function experimentParamsJSON(numParams, experimentName, user){

	var array = [];

			for (let i = 0; i < numParams; i++) {
				console.log("#paramName" + i);
				var paramName = document.querySelector('#paramName' + i).value;
				var defVal = document.querySelector("#defaultValue" + i).value
				var minVal = document.querySelector("#minValue" + i).value
				var maxVal = document.querySelector("#maxValue" + i).value
				var incVal = document.querySelector("#incValue" + i).value
				var param = paramJSON(paramName, defVal, minVal, maxVal, incVal);


				array.push(param);
			}
			const params = {
				"experimentName": experimentName,
				"user": user,
				"parameters": array,
			};
	return params;

}


// module.exports.paramJSON = paramJSON;
// module.exports.experimentParamsJSON = experimentParamsJSON;
// module.exports.createUser = createUser;
// module.exports.checkUser = checkUser;

LoginPageController = class {
	constructor() {
		document.querySelector("#submitCreateUser").addEventListener("click", (event) => {
			var username = document.querySelector("#newUsername").value;
			var password = document.querySelector("#newPassword").value;
			console.log("new user created!", username, password);
		});

		document.querySelector("#login").addEventListener("click", (event) => {
			var username = document.querySelector("#username").value;
			var password = document.querySelector("#password").value;
			window.location.assign('index?user=' + username);
		});
	}

}

LoginManager = class {
	constructor() {}
	beginListening(changeListener) {
		changeListener();
	}
	stopListening() {
		this._unsubscribe();
	}

}
InitialPageController = class {
	constructor(user) {

		this.user = user;
		console.log(user + " is logged in");
		// document.querySelectorAll("#submitAddQuote").onclick = (event) => {
		// 	console.log("submit");
		// };
		document.querySelector("#initSubmit").addEventListener("click", (event) => {
			console.log("pog");
			var x = document.querySelector("#typeNumber").value;
			window.location.assign('parameters?int=' + x);
		});

	}
}


ParameterPageController = class {
	constructor(int) {
		this.int = int;

		document.querySelector("#paramSubmit").addEventListener("click", (event) => {
			// 		var dict = {"one" : [15, 4.5],
			// "two" : [34, 3.3],
			// "three" : [67, 5.0],
			// "four" : [32, 4.1]};
			var params = experimentParamsJSON(this.int, "POG", "Williae2");S
			var executable = JSON.stringify(params);
			//this.download(executable, 'exp.json', 'json');

			// Creating a XHR object
			//let xhr = new XMLHttpRequest();
			//let url = "https://194.195.213.242:5000/experiment";
			let url = "http://localhost:5000/";
			fetch(`${url}`, {
				mode: 'no-cors',
				cache: 'no-cache'}).then(data=>{console.log(data)})

			console.log(executable);
			fetch(`${url}experiment?user=${params.user}&parameters=${params.parameters}&experimentName=${params.experimentName}`, {
				method: 'POST',
				mode: 'no-cors',
			body: executable}).then(data => {
					console.log(data)
				}).catch(err => console.log(err))

			// open a connection
//			xhr.open("POST", url, true);
//
//			// Set the request header i.e. which type of content you are sending
//			xhr.setRequestHeader("Content-Type", "application/json");
//
//			// Create a state change callback
//			xhr.onreadystatechange = function () {
//				if (xhr.readyState === 4 && xhr.status === 200) {
//					// Print received data from server
//					result.innerHTML = this.responseText;
//				}
//			};
//
//			xhr.send(executable);
		});

		document.querySelector("#fab").addEventListener("click", (event => {
			var x = parseInt(this.int, 10) + 1;
			window.location.assign('parameters.html?int=' + x);
		}))

		this.updateList();


	}

	updateList() {
		const newList = htmlToElement('<div id="parameterContainer"></div>');
		newList.appendChild(htmlToElement('<div class="row"> <div class= "col-3">Parameter Name</div> <div class= "col-2">Default Value</div> <div class= "col-2">Min Value</div> <div class= "col-2">Max Value</div> <div class= "col-2">Size Iteration</div></div>'))
		for (let i = 0; i < this.int; i++) {
			const newCard = this._createCard(i);
			newCard.onclick = (event) => {
				console.log(`You clicked on ${i}`);
			}
			newList.appendChild(newCard);
		}
		newList.appendChild(htmlToElement('<div class="justify-content-center align-items-center">Number Iterations</div>'));
		newList.appendChild(htmlToElement('<div class="form-outline justify-content-center align-items-center d-flex"><input type="number" id="iter" class="form-control" /></div>'));

		newList.appendChild(htmlToElement('<div class="justify-content-center align-items-center">Executable Script/Command</div>'));
		newList.appendChild(htmlToElement('<div class="form-outline justify-content-center align-items-center d-flex"><input type="text" id="execute" class="form-control" /></div>'));


		const oldList = document.querySelector("#parameterContainer");
		oldList.removeAttribute("id");
		oldList.hidden = true;

		oldList.parentElement.append(newList);
	}
	_createCard(int) {
		return htmlToElement(`<div class="row">
		<div class="col-3 form-outline justify-content-center align-items-center d-flex">
			<input type="text" id="paramName${int}" class="form-control" />
		</div>

		<div class="col-2 form-outline justify-content-center align-items-center d-flex">
		  <input type="number" id="defaultValue${int}" class="form-control" />
		</div>

		<div class="col-2 form-outline justify-content-center align-items-center d-flex">
		  <input type="number" id="minValue${int}" class="form-control" />
		</div>

		<div class="col-2 form-outline justify-content-center align-items-center d-flex">
		  <input type="number" id="maxValue${int}" class="form-control" />
		</div>

		<div class="col-2 form-outline justify-content-center align-items-center d-flex">
		  <input type="number" id="incValue${int}" class="form-control" />
		</div>

	  </div>`);
	}
}
ParameterManager = class {
	constructor() {}
	beginListening(changeListener) {
		changeListener();
	}
	stopListening() {
		this._unsubscribe();
	}

}

/* Main */
/** function and class syntax examples */
main = function () {
	console.log("Ready");
	if(document.querySelector("#loginPage")) {
		console.log("You are on the login page");

		new LoginPageController();
	}
	if (document.querySelector("#initialPage")) {
		console.log("You are on the initial page");
		//rhit.intialPageManager = new rhit.InitialPageManager();
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const user = urlParams.get("user");
		console.log(`Detail page for ${user}`);
		if (!user) {
			window.location.href = "/";
		}
		new InitialPageController(user);

	}

	if (document.querySelector("#parametersPage")) {
		console.log("You are on the parameters page");
		// mqid = rhit.storage.getMovieQuoteId();
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const int = urlParams.get("int");
		console.log(`Detail page for ${int}`);
		if (!int) {
			window.location.href = "/index";
		}
		new ParameterPageController(int);
	}

	// const ref = firebase.firestore().collection("MovieQuotes");
	// ref.onSnapshot((querySnap) => {

	// 	querySnap.forEach((doc) => {
	// 		console.log(doc.data());
	// 	})
	// })
	// ref.add({
	// 	quote: "popping off",
	// 	movie: "GamerPogchamp"

	// })

};

main();

