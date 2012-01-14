Reason of written `bufferhelper`: [小心data事件里的chunk拼接](http://cnodejs.org/blog/?p=5425).

Install it via NPM:
  
    npm install bufferhelper

Usage:

    var http = require('http');
    var BufferHelper = require('bufferhelper');
  
    http.createServer(function (request, response) {
        var bufferHelper = new BufferHelper();
    
        request.on("data", function (chunk) {
            bufferHelper.concat(chunk);
        });
        request.on('end', function () {
            var html = bufferHelper.toBuffer().toString();
            response.writeHead(200);
            response.end(html);
        });
  
    }).listen(8001);

