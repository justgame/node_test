function Pet(word) {
	this.word = word,
	this.speak = function () {
		console.log(this.word);
	}
}

function Dog(word) {
	Pet.call(this, word);
}

var dog = new Dog("wang");
dog.speak();