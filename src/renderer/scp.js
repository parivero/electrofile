var scp2 = require('scp2');
var ProgressBar = require('progress');

var client = new scp2.Client();
var bar;

client.on('transfer', function (buf, uploading, total) {
    if (!bar) {
        bar = new ProgressBar(' uploading [:bar] :rate/bps :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: total
        });
    }
    bar.tick(buf.length);
});

scp2.scp('logs.jsonl', 'usuario:password@host:path', client, function (err) {
    console.log(err);
});
