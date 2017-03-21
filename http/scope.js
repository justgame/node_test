var globalVariable = "This is globalVariable";

function localFunction() {
	var localVariable = "This is localVariable";
	console.log("print globalVariable/localVariable");
	console.log(globalVariable);
	console.log(localVariable);

	function innerLocalFunction() {
		var innerLocalVariable = "This is innerLocalVariable";
		console.log("print globalVariable/localVariable/innerLocalVariable");
		console.log(globalVariable);
		console.log(localVariable);
		console.log(innerLocalVariable);
	}
	innerLocalFunction();
}

localFunction();
