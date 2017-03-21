var fs = require('fs');
var inputTxt = 'C:\\Users\\Administrator\\Desktop\\test.txt';
var outputTxt = 'C:\\Users\\Administrator\\Desktop\\test1.txt';

console.log('开始读取文件');
// fs.readFile(inputTxt, 'utf-8', function (err, data) {
// 	if (err) {
// 		cosole.log(data);
// 	} else {
// 		console.log(data);
// 	}
// });
var data = fs.readFileSync(inputTxt, 'utf-8');
console.log(data);
console.log('结束文件读取');

fs.writeFile(outputTxt, '再来测试一下', 'utf-8', function(err) {
	if (err) {
		throw err;
	}
	console.log('Export Account Success!');
});

fs.writeFile(outputTxt, '继续测试一下', 'utf-8', function(err) {
	if (err) {
		throw err;
	}
	console.log('Export Account Success!');
});