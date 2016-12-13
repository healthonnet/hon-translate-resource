var fs = require('fs');
var readline = require('readline');
var Stream = require('stream');
var translate = require('google-translate-api');

var inputFile = process.env.INPUT || 'ressource/test.txt';
var outputFile = process.env.OUTPUT || 'ressource/out.txt';
var scoreOption = process.env.SCORE || true;

readFileLineByLine(inputFile, outputFile);

function readFileLineByLine(inputFile, outputFile) {

    var instream = fs.createReadStream(inputFile);
    fs.writeFileSync(outputFile, '');
    var outstream = new Stream();
    outstream.readable = true;
    outstream.writable = true;

    var rl = readline.createInterface({
        input: instream,
        output: outstream,
        terminal: false
    });

    rl.on('line', function (line) {
        var score = line.slice(line.length -4, line.length);

        if (!scoreOption) {
            score = '';
        }

        var word = line.substring(0, line.length -4 );
        translate(word, {from: 'en', to: 'fr'}).then(res => {
            var text = res.text.toLowerCase();
            fs.appendFileSync(outputFile, text + score + '\n');
        }).catch(err => {
            console.error(err);
        });
    });
}