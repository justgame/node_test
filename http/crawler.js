var http = require('http');
var cheerio = require('cheerio');
var url = "http://www.imooc.com/learn/348";

function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $('.chapter');
	var chapterArr = [];
	chapters.each(function (chapter) {
		var chapterItem = {};
		var chapterTitle = $(this).find('strong').text();
		chapterItem.title = chapterTitle;
		chapterItem.videos = [];
		var videos = $(this).find('li');
		videos.each(function (video) {
			var id = $(this).find('a').prop('href').substring(7);
			var title = $(this).find('a').text();
			var videoItem = {
				id : id,
				title : title
			}
			chapterItem.videos.push(videoItem);
		});
		chapterArr.push(chapterItem);
	});
	return chapterArr;
}

function displayChapters(chapterArr) {
	chapterArr.forEach(function (item) {
		console.log(item.title);
		item.videos.forEach(function (item) {
			console.log("    [" + item.id + "] " + item.title);
		});
	});
}

http.get(url, function (res) {
	var html = "";
	res.on('data', function (data) {
		html += data;
	});
	res.on('end', function () {
		var chapterArr = filterChapters(html);
		displayChapters(chapterArr);
	});
}).on('error', function () {
	console.log("获取数据出错！");
});