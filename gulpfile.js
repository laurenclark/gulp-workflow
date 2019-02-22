//requires all your packages - you can install these with the package.json included. Just 'npm i' in your project directory.
const   gulp = require('gulp'),
		pump = require('pump'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		plumber = require('gulp-plumber'),
		autoprefixer = require('gulp-autoprefixer'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		cleanCSS = require('gulp-clean-css'),
		gridzilla = require('gridzilla');


//Change these to match your setup or create your own
const outputDir = 'dist/';
const sourceDir = 'src/';

let path = {
	sassfileSrc: sourceDir + 'sass/app.scss',
	sassfileDist: outputDir + 'sass/app.scss',
	styles: sourceDir + 'sass/**/*.scss',
	stylesOutput: outputDir + 'css',
	stylefile: outputDir + 'app.css',
	js: sourceDir + 'js/*.js',
	jsOutput: outputDir + 'js',
	img: sourceDir + 'image/*',
	imgOutput: outputDir + 'image',
};

function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

/*******************
 * Scripts Tasks
 ********************/

//Uglify
gulp.task('scripts', function (cb) {
	pump([
		gulp.src(path.js),
		uglify(),
		gulp.dest((path.jsOutput))
	],cb);	
});

/*******************
 * Styles Tasks
 ********************/

//Styles Task
gulp.task('styles', function () {
	return gulp.src(path.sassfileSrc)
		.pipe(sourcemaps.init())
		.pipe(plumber(function (error) {
			this.emit('end');
		}))
		.pipe(sass({
			importer: gridzilla,
			outputStyle: 'compact',
			includePaths: 'node_modules/gridzilla'
		}).on('error', sass.logError))

		.pipe(plumber())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.stylesOutput))
});

/*******************
 * Images Tasks
 ********************/

//Image Optimisation
gulp.task('image', function () {
	gulp.src(path.img)
		.pipe(imagemin())
		.pipe(gulp.dest(path.imgOutput));
});


/*******************
 * Default Tasks
 ********************/

//Watch Tasks
gulp.task('watch', function () {
	gulp.watch(path.js, ['scripts']); //string or directory of the files (or **/*.js to pick up all files)
	gulp.watch(path.styles, ['styles']); //watch all the files specified and then execute the function
});

///Default dist build Task
gulp.task('default', ['scripts', 'styles', 'image']);
//You can add the watcher command to the default task,
//this isn't recommended for ALL things, you may want to just uglify JS on production.
