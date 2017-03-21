var c = 0;

function printC() {
	console.log(c);
}

function plus(callback) {
	setTimeout(function () {
		c++;		
		callback();
	}, 1000);
}

plus(printC);
