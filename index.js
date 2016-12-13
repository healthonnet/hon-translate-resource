// Dependencies
const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
const translate = require('google-translate-api');
const env = require('env-var');

// Parameters
const inputFile = env('INPUT').asString() || 'ressource/test.txt';
const outputFile = env('OUTPUT').asString() || 'ressource/out.txt';
const scoreOption = env('SCORE').asBool();

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
        var score = '';
        var word = line;

        if (scoreOption) {
            score = line.slice(line.length -4, line.length);
            word = line.substring(0, line.length -4 );
        }

        translate(word, {from: 'en', to: 'fr'}).then(res => {
            var text = res.text.toLowerCase();
            fs.appendFileSync(outputFile, text + score + '\n');
        }).catch(err => {
            console.error(err);
        });
    });
}