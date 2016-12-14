// Dependencies
const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
const env = require('env-var');

// Parameters
const apiKey = env('APIKEY').required().asString();
const inputFile = env('INPUT').asString() || 'resource/test.txt';
const outputFile = env('OUTPUT').asString() || 'resource/out.txt';
const scoreOption = env('SCORE').asBool();
const strictMode = env('STRICT').asBool();

const googleTranslate = require('google-translate')(apiKey);

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

        googleTranslate.translate(word, 'en', 'fr', function(err, translation) {
            if (err) {
                console.error(err);
                if (strictMode) {
                    process.exit(1);
                }
                return;
            }
            var text = translation.translatedText.toLowerCase();
            fs.appendFileSync(outputFile, text + score + '\n');
        });
    });
}