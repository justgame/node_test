var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();

life.setMaxListeners(5);

function test(data) {
	console.log('this is 111 ' + data);
}

life.on('test', test);

life.on('test', function (data) {
	console.log('this is 2 ' + data);
});

life.on('test', function (data) {
	console.log('this is 3 ' + data);
});

life.on('test', function (data) {
	console.log('this is 4 ' + data);
});

life.on('test', function (data) {
	console.log('this is 5 ' + data);
});

life.on('test', function (data) {
	console.log('this is 6 ' + data);
});

life.on('test1', function (data) {
	console.log('this is test1' + data);
})

life.on('test1', function (data) {
	console.log('this is test1' + data);
})

life.removeListener('test', test);
life.removeAllListeners('test1');

var everTest = life.emit('test', 'test');
var everTest1 = life.emit('test1', 'test1');
var everTest2 = life.emit('test2', 'test2');

console.log(everTest);
console.log(everTest1);
console.log(everTest2);
console.log(life.listeners('test').length);
console.log(EventEmitter.listenerCount(life, 'test'));