var BufferHelper = function () {
  this.buffers = [];
  this.size = 0;
  Object.defineProperty(this, 'length', {
    get: function () {
      return this.size;
    }
  });
};

BufferHelper.prototype.concat = function (buffer) {
  this.buffers.push(buffer);
  this.size += buffer.length;
  return this;
};

BufferHelper.prototype.empty = function () {
  this.buffers = [];
  this.size = 0;
  return this;
};

BufferHelper.prototype.toBuffer = function () {
  return Buffer.concat(this.buffers, this.size);
};

BufferHelper.prototype.toString = function (encoding) {
  return this.toBuffer().toString(encoding);
};

BufferHelper.prototype.load = function (stream, callback) {
  var that = this;
  stream.on('data', function (trunk) {
    that.concat(trunk);
  });
  stream.on('end', function () {
    callback(null, that.toBuffer());
  });
  stream.once('error', callback);
};

module.exports = BufferHelper;
