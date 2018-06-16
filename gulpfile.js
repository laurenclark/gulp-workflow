//requires all your packages - you can install these with the package.json included. Just 'npm install' in your project directory.
var gulp	     = require('gulp'),
	postcss  	 = require('gulp-postcss'),
	uglify   	 = require('gulp-uglify'),
	livereload   = require('gulp-livereload'),
	imagemin 	 = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	sass         = require('gulp-sass'),
	sourcemaps   = require('gulp-sourcemaps'),
	gridzilla    = require('gridzilla');

function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

//Scripts Tasks

//Uglify
gulp.task('scripts', function () {
	gulp.src('src/js/*.js') //.src allows command to be run on directory. Wildcard any .js file.
		.pipe(uglify()) //.pipe passes the output to the function or method
		.on('error', errorLog)
		.pipe(gulp.dest('dist/js')); //where the output goes. For smaller projects the same folder is fine.			
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
	return gulp.src('src/sass/**/*.scss')
	  .pipe(sass({
		importer: gridzilla,
		includePaths: 'node_modules/gridzilla'
	  }))
	  .pipe(sourcemaps.init())
	  .pipe(sass().on('error', sass.logError))
	  .pipe(sourcemaps.write())
	  .pipe(gulp.dest('dist/css'))
	  .pipe(livereload());
  });
   

//Prefix
gulp.task('prefixify', function () {
	return gulp.src('css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist/css'));
});


//PostCSS
gulp.task('postcss', function () {
	return gulp.src('/dist/css/*.css')
		.pipe(postcss({
			html: ['index.html'] //add all .html files in 'array', here
		}))
		.pipe(gulp.dest('dist/css'));
});
//You can then do per-page css and reduce load times, or just scrap extra boilerplate you wrote and didn't use. 

//Images Tasks
gulp.task('image', function () {
	gulp.src('src/image/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/image'));
});


//Default Tasks

//Watch Tasks
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('src/js/*.js', ['scripts']); //string or directory of the files (or **/*.js to pick up all files)
	gulp.watch('src/sass/**/*.scss', ['styles']); //watch all the files specified and then execute the function
});

///Default dist build Task
gulp.task('default', ['scripts', 'styles', 'image', 'prefixify']);
//You can add the watcher command to the default task,
//this isn't recommended for ALL things, you may want to just uglify JS on production.
