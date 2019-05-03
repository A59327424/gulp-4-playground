//* Load stuff
const gulp = require('gulp');

let args = require('yargs').argv;
let rename = require('gulp-rename');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let filterif = require('gulp-if');

let uglify = require('gulp-uglify');
let pipeline = require('readable-stream').pipeline;

/**
 * build_pluginsjs
 *
 * Bundle javascript files
 * Create sourcemap
 * Minify 
 * filters already minified files using glob
 * Concatenate
 * 
 */
function build_pluginsjs(cb)
{
		let plugins = require('./src/js/plugins_draft.js');
	  
	  /** Filter minified files using gulp-if */
	  return gulp.src(plugins)
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(filterif(['*', '!.min.'], uglify({ output: { comments: /^!/i } })))
			.pipe(concat('plugins.min.js'), { newLine: '\r\n' })
			.pipe(sourcemaps.write('./'))
		  .pipe(gulp.dest('./public_html/js/'));
    
	cb();
}


function gulp_arg(cb)
{
	var dest = args.destination ? args.destination : 'dist';
	console.log(dest);

	cb();
}

exports.build_pluginsjs = build_pluginsjs;

exports.gulp_arg = gulp_arg;