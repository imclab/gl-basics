var fs = require('fs'),
    concat = require('concat-stream'),
    JSONStream = require('JSONStream'),
    through = require('through'),
    split = require('split');

fs.createReadStream(process.argv[2])
    .pipe(split(getLL))
    .pipe(through(function(data) {
        if (data[0]) {
            this.queue(data[0]);
            this.queue(data[1]);
            this.queue(data[2]);
        }
    }))
    .pipe(JSONStream.stringify())
    .pipe(process.stdout);

function getLL(l) {
    var p = l.split('\t');
    return [parseFloat(p[5]), parseFloat(p[4]), Math.round(parseInt(p[14], 10) / 500000)];
}
