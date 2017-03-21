var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
	'content': '看看能不能测试成功',
	'mid': 8837
});

var options = {
	hostname : 'www.imooc.com',
	port : 80,
	path : '/course/docomment',
	method : 'POST',
	headers : {
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Cache-Control':'no-cache',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=95fd722a-fc79-479f-8eba-1f5a20f8dbe6; imooc_isnew_ct=1483629872; loginstate=1; apsid=FhOTRiYmJlZWVjMThmZTIzMTRkYjMyM2EwYjgzYTUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjk5MDk5NQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyODkyNDMwMTFAcXEuY29tAAAAAAAAAAAAAAAAAAAAADFhZDk5ZWRiOWMxNzIyMDE5ZDhkZTE3ZDFkNjc1NThmD963WA%2Fet1g%3DNz; last_login_username=289243011%40qq.com; PHPSESSID=d6t9rdk2q2ch17i6j43eaemn67; IMCDNS=0; imooc_isnew=2; cvde=58cfadae41601-23',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Pragma':'no-cache',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req = http.request(options, function (res) {
	console.log('Status: ' + res.statusCode);
	console.log('Headers: ' + JSON.stringify(res.headers));

	res.on('data', function (chunk) {
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});

	res.on('end', function () {
		console.log('评论完毕');
	});
});

req.on('error', function (e) {
	console.log('出现错误 :' + e.message);
});
req.write(postData);
req.end();
