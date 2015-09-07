var gulp = require('gulp');
var jshint = require('gulp-jshint');
var del = require('del');
var zip = require('gulp-zip');

var identifier = 'com.lissenberg.DHCCodeGenerator';
var extensionsDir = '/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/';
var homeDir = process.env.HOME || process.env.HOMEPATH;

var paths = {
    scripts: ['src/*.js'],
    templates: ['src/*.mustache'],
    deps: ['node_modules/URIjs/src/URI.js', 'node_modules/mustache/mustache.js'],
    paw: homeDir + extensionsDir,
    build: 'build/',
    dist: 'dist'
}

gulp.task('clean', function () {
    del(paths.dist);
    del(paths.build);
});

gulp.task('lint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('resources', function () {
    return gulp.src(paths.templates)
        .pipe(gulp.dest(paths.build + identifier));
});

gulp.task('build', function () {
    return gulp.src(paths.scripts)
        .pipe(gulp.dest(paths.build + identifier));
});

gulp.task('deps', function () {
    return gulp.src(paths.deps)
        .pipe(gulp.dest(paths.build + identifier));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['build']);
    gulp.watch(paths.templates, ['resources']);
});

gulp.task('install', function () {
    return gulp.src(paths.build + '/**/*')
        .pipe(gulp.dest(paths.paw));
})

gulp.task('zip', function () {
    var fileName = identifier.split('.').pop() + '.zip';
    return gulp.src(paths.build + '**/*')
        .pipe(zip(fileName))
        .pipe(gulp.dest(paths.dist));
});


gulp.task('default', ['deps', 'lint', 'resources', 'build']);

