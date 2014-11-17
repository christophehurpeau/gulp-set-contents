var gutil = require('gulp-util');
var through = require('through2');

module.exports = function(setContents) {
    return through.obj(function (file, enc, callback) {
        try {
            file.contents = new Buffer(typeof setContents === 'function' ? setContents(file) : setContents);
            this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-set-contents', err, {fileName: file.relative}));
        }

        callback();
    });
};
