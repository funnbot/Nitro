var spawn = require('child_process').spawn,
    fs = require('fs'),
    streamBuffers = require('stream-buffers');


/**
 * @module node_API
 */

/**
 * @function speak
 *
 * @param {String}    text              text to speak
 *
 * @param {Object}    o
 * @param {String}   [o.lang='en']      language to use. ex: en, fr, es, pt...
 * @param {String}   [o.format='mp3']   format. can be either mp3 or ogg.
 *
 * @param {Number}   [o.amplitude=200]  espeak parameter. amplitude ~ volume.
 * @param {Number}   [o.pitch=40]       espeak parameter. voice pitch.
 * @param {Number}   [o.speed=150]      espeak parameter. narration speed.
 * @param {Number}   [o.wordgap=3]      espeak parameter. time between words.
 *
 * @param {String}   [o.filename]       filename of file to save the rendering to (mutually exclusive with stream)
 * @param {Stream}   [o.stream]         stream where to write the rendering to (mutually exclusive with filename)
 */
var speak = function (text, o) {
    if (!('lang' in o)) {
        o.lang = 'en';
    }
    if (!('format' in o)) {
        o.format = 'mp3';
    }

    if (!('amplitude' in o)) {
        o.amplitude = 200;
    } else {
        o.amplitude = parseInt(o.amplitude, 10);
    }
    if (!('pitch' in o)) {
        o.pitch = 40;
    } else {
        o.pitch = parseInt(o.pitch, 10);
    }
    if (!('speed' in o)) {
        o.speed = 150;
    } else {
        o.speed = parseInt(o.speed, 10);
    }
    if (!('wordgap' in o)) {
        o.wordgap = 3;
    } else {
        o.wordgap = parseInt(o.wordgap, 10);
    }

    var f;

    if ('filename' in o) {
        f = fs.createWriteStream(o.filename + '.' + o.format, {
            encoding: 'binary'
        });
    } else if ('stream' in o) {
        f = o.stream;
    } else if ('buffer' in o) {
        f = new streamBuffers.WritableStreamBuffer();
    } else {
        throw 'either stream or filename must be passed in!';
    }

    var converter = (o.format === 'ogg') ? 'oggenc' : 'lame';

    text = text.replace(/\!/g, '\\!');
    text = text.replace(/'/g, '\\');


    var cmd = [
        'echo', '-e', '' + text + '',
        '|',
        'espeak',
        '--stdin',
        '--stdout',
        '-v', o.lang,
        '-a', o.amplitude,
        '-p', o.pitch,
        '-s', o.speed,
        '-g', o.wordgap,
        '|',
        converter,
        '--quiet',
        '-b', 16, // bit rate
    ];
    if (o.format === 'mp3') {
        cmd = cmd.concat([
            '-h', // quality
            //'-m', 'm', // mono
        ]);
    } else {
        cmd = cmd.concat([
            '-q', -1, // quality
            //'--downmix', // mono
        ]);
    }

    cmd.push('-');
    cmd = cmd.join(' ');

    //console.log(cmd);

    var child = spawn('bash', ['-c', cmd], {
        cwd: __dirname
    });

    child.stdout.on('data', function (data) {
        f.write(data, 'binary');
    });

    child.stderr.on('data', function (data) {
        if (o.cb) {
            return o.cb(data, null);
        } else {
            throw data;
        }
    });

    child.on('exit', function (code) {
        f.end();
        if ('cb' in o) {
            if (code !== 0) {
                return o.cb('Process returned error code=' + code, null);
            }
            o.cb(null, f);
        }
    });

};

module.exports = speak;