//requires all your packages - you can install these with the package.json included. Just 'npm install' in your project directory.
var gulp	     = require('gulp'),
	postcss  	 = require('gulp-postcss'),
	uglify   	 = require('gulp-uglify'),
	livereload   = require('gulp-livereload'),
	imagemin 	 = require('gulp-imagemin'),
	plumber	     = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	sass         = require('gulp-sass'),
	sourcemaps   = require('gulp-sourcemaps'),
	gutil        = require('gulp-util'),
	gridzilla    = require('gridzilla');


//Change these to match your setup or create your own
var outputDir = 'dist/';
var sourceDir = 'src/';

var path = {
	styles: sourceDir + 'sass/**/*.scss',
	stylesOutput: outputDir + 'css',
	js: sourceDir + 'js/*.js',
	jsOutput: outputDir + 'js',
	img : sourceDir + 'image/*',
	imgOutput : outputDir + 'image'
};

function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

//Scripts Tasks

//Uglify
gulp.task('scripts', function () {
	gulp.src(path.js) //.src allows command to be run on directory. Wildcard any .js file.
		.pipe(uglify()) //.pipe passes the output to the function or method
		.on('error', errorLog)
		.pipe(gulp.dest((path.jsOutput))); //where the output goes. For smaller projects the same folder is fine.			
});

//Styles Tasks

//Compass Compiler (optional, you'll need to require this in package.json and in vars here)
// gulp.task('styles', function(){
// 	gulp.src('scss/**/*.scss')
// 	.pipe(plumber())
// 	.pipe(compass({ //add your config.rb settings here.
// 		config_file: 'config.rb',
// 		css: 'css',
// 		sass: 'scss'
// 	}))
// 	.pipe(gulp.dest('css/'))//saves to /css folder
// 	.pipe(livereload()); 
// })

gulp.task('styles', function () {
	return gulp.src(path.styles)
	.pipe(plumber(function(error) {
		gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
		this.emit('end');
	  }))
	.pipe(sass({
		importer: gridzilla,
		includePaths: 'node_modules/gridzilla'
	  })) 
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.stylesOutput))
	.pipe(livereload());
  });
   

//Prefix
gulp.task('prefixify', function () {
	return gulp.src(path.styles)
		.pipe(plumber())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(path.stylesOutput));
});


//PostCSS
gulp.task('postcss', function () {
	return gulp.src(path.styles)
		.pipe(plumber())
		.pipe(postcss({
			html: ['index.html'] //add all .html files in 'array', here
		}))
		.pipe(gulp.dest(path.stylesOutput));
});
//You can then do per-page css and reduce load times, or just scrap extra boilerplate you wrote and didn't use. 

//Images Tasks
gulp.task('image', function () {
	gulp.src(path.img)
		.pipe(imagemin())
		.pipe(gulp.dest(path.imgOutput));
});

//Watch the html of the page you're on
gulp.task('html', function() {
	return gulp.src('*.html')
		.pipe(plumber())
        .pipe(gulp.dest(''))
        .pipe(livereload())
});

//Default Tasks

//Watch Tasks
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(path.js, ['scripts']); //string or directory of the files (or **/*.js to pick up all files)
	gulp.watch(path.styles, ['styles']); //watch all the files specified and then execute the function
	gulp.watch('index.html', ['html']);
});

///Default dist build Task
gulp.task('default', ['scripts', 'styles', 'image', 'prefixify']);
//You can add the watcher command to the default task,
//this isn't recommended for ALL things, you may want to just uglify JS on production.
