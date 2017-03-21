/**
 * 尝试下nodejs扒取bilibili一个视频的评论
 * 
 * 思路是传入每一页的参数通过get获取返回数据，最后再一次性写入文件中
 * 
 * 原本编写代码时是通过循环递增page数，后发现get是异步的，遂脑洞大开使用事件驱动来强行同步get的使用
 */

const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const EventEmitter = require('events').EventEmitter;

var currentPage = 1;
var count = 0;

var url = "http://api.bilibili.com/x/v2/reply?";
var allRepliesTxt = 'C:\\Users\\Administrator\\Desktop\\allReplies.txt'
var allContent = "";

var max = 5;


var controller = new EventEmitter();

var queryStringParameters = querystring.stringify({
	'callback':'jQuery1720854432312475105_1490108865166',
	'jsonp':'jsonp',
	'pn': currentPage,
	'type':'1',
	'oid':'539600',
	'sort':'0',
	'_':'1490108905577'
});

controller.on('start', function () {
	http.get(url + queryStringParameters, function (res) {
		var message = "";
		res.on('data', function (data) {
			message += data;
		});
		res.on('end', function () {
			message = message.slice(message.indexOf('(') + 1, message.length - 1);
			var messageObj = JSON.parse(message);
			messageObj.data.replies.forEach(function (item) {
				allContent = allContent + count + " : " + item.content.message + "\n";
				count++;
			});
			if (currentPage == 146) {
				fs.writeFileSync(allRepliesTxt, allContent, 'utf-8');
			} else {
				currentPage++;
				queryStringParameters = querystring.stringify({
					'callback':'jQuery1720854432312475105_1490108865166',
					'jsonp':'jsonp',
					'pn': currentPage,
					'type':'1',
					'oid':'539600',
					'sort':'0',
					'_':'1490108905577'
				});
				controller.emit('start');
			}
			
		});
	}).on('error', function (err) {
		console.log("出现错误：" + err);
		return;
	});
});

controller.emit('start');	





// var options = {
// 	hostname : 'api.bilibili.com',
// 	port : 80,
// 	path : '/',
// 	method : 'GET',
// 	headers : {
// 		'Accept':'*/*',
// 		'Accept-Encoding':'gzip, deflate, sdch',
// 		'Accept-Language':'zh-CN,zh;q=0.8',
// 		'Cache-Control':'no-cache',
// 		'Connection':'keep-alive',
// 		'Cookie':'fts=1479450903; pgv_pvi=1258938368; sid=53rfdpn3; buvid3=C643CE1C-743F-410B-9F9A-935DE34668696138infoc; LIVE_BUVID=7b5b4ff13e9e48192d2f6f7a5dd84197; LIVE_BUVID__ckMd5=e3c735369670d9b5; purl_token=bilibili_1490108911; pgv_si=s6019812352',
// 		'Host':'api.bilibili.com',
// 		'Pragma':'no-cache',
// 		'Referer':'http://www.bilibili.com/video/av539600/?from=search&seid=1579506754837904012',
// 		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
// 	}
// };

// var req = http.request(options, function (res) {
// 	console.log('Status: ' + res.statusCode);
// 	console.log('Headers: ' + JSON.stringify(res.headers));

// 	res.on('data', function (chunk) {
// 		console.log(Buffer.isBuffer(chunk));
// 		console.log(typeof chunk);
// 		console.log(chunk.toString());
// 	});

// 	res.on('end', function () {
// 		console.log('抓取完毕!');
// 	});
// });

// req.on('error', function (e) {
// 	console.log('出现错误 :' + e.message);
// });
// req.write(queryStringParameters);
// req.end();