var gulp = require('gulp');
var jshint = require('gulp-jshint');
var del = require('del');

var identifier = 'com.lissenberg.DHCCodeGenerator';
var extensionsDir = '/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/';
var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

var paths = {
    scripts: ['src/*.js'],
    templates: ['src/*.mustache'],
    deps: ['node_modules/URIjs/src/URI.js', 'node_modules/mustache/mustache.js'],
    build: homeDir + extensionsDir + identifier,
}

gulp.task('clean', function () {
    return del(paths.build);
});

gulp.task('lint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('resources', function () {
    return gulp.src(paths.templates)
        .pipe(gulp.dest(paths.build));
});

gulp.task('transpile', function () {
    return gulp.src(paths.scripts)
        .pipe(gulp.dest(paths.build));
});

gulp.task('deps', function () {
    return gulp.src(paths.deps)
        .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['transpile']);
    gulp.watch(paths.templates, ['resources']);
});


gulp.task('default', ['deps', 'lint', 'resources', 'transpile', 'watch']);

