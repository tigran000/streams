const { Writable, Readable, Transform } = require("stream");
const fs = require("fs");
const moment = require("moment");

const reFormat = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString() + "\n");
  }
});


const readable = new Readable({ objectMode: true });
readable._read = () => { };
setInterval(() => {
  readable.push(moment().format("LTS"));
}, 1000);


const writable = new Writable({ objectMode: true });
writable._write = (data, encoding, done) => {
  fs.appendFile("time.txt", data, err => {
    if (err) throw err;
  });
  done();
};

readable
  .pipe(reFormat)
  .pipe(writable);