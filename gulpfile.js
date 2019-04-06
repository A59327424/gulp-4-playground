//* Load stuff
const gulp = require('gulp');

let rename = require("gulp-rename");
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let filter = require('gulp-filter');

let uglify = require('gulp-uglify');
let pipeline = require('readable-stream').pipeline;

/**
 * build_pluginsjs
 *
 * Concat plugin files
 * 
 */

function build_pluginsjs(cb)
{
		let plugins = require('./src/js/plugins_draft.js');
		const filtered = filter(['*.min.*'], {restore: true});


		return pipeline(
	    gulp.src(plugins),
	    rename('plugins.min.js'),
	    sourcemaps.init({ loadMaps: true }),
	    filtered,
	    uglify(),
	    filtered.restore,
	    concat('plugins.min.js', {newLine: '\r\n'}),
	    sourcemaps.write('./'),
	    gulp.dest('./public_html/js/')
	  );

		//return gulp.src(plugins)
		//	.pipe(filtered)
		//	.pipe(uglify())
		//	.pipe(filtered.restore)
		//	.pipe(concat('plugins.min.js'), {newLine: '\r\n'})
		//	.pipe(sourcemaps.init({ loadMaps: true }))
		//	.pipe(sourcemaps.write('./'))
		//  .pipe(gulp.dest('./public_html/js/'));
    
	cb();
}

exports.build_pluginsjs = build_pluginsjs;