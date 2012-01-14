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

