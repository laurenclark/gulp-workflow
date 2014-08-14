var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    uncss = require('gulp-uncss'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin');
    
    
    // sass = require('gulp-ruby-sass');
// Uncomment if not using compass -> replace this with gulp-libsass for speed! 


//requires all your packages - you can install these with the package.json included. Just 'npm install' in your project directory.




/////////////////
//Scripts Tasks
////////////////

//Uglify
gulp.task('scripts', function(){
		gulp.src('js/*.js')//.src allows command to be run on directory. Wildcard any .js file.
		.pipe(plumber())
	.pipe(uglify()) 	//.pipe passes the output to the function or method
	.pipe(gulp.dest('build/js'));//where the output goes. For smaller projects the same folder is fine.								
})

//////////////
//Styles Tasks
/////////////


//Sass compiler
// gulp.task('styles', function(){
// 	gulp.src('scss/**/*.scss')
//  .pipe(plumber())
// 	.pipe(sass)({
// 		style: 'compressed'
// 	}))
// .pipe(gulp.dest('css/')); //sasves to /css folder
// })

//Compass Compiler
gulp.task('styles', function(){
	gulp.src('scss/**/*.scss')
	.pipe(plumber())
	.pipe(compass({ //add your config.rb settings here.
		config_file: 'config.rb',
		css: 'css',
		sass: 'scss'
	}))
	.pipe(gulp.dest('css/'))//saves to /css folder
	.pipe(livereload()); 
})


//Uncss 
gulp.task('uncss', function(){
	return gulp.src('css/*.css')
	.pipe(uncss({
		html: ['index.html'] //add all .html files in 'array', here
	}))
	.pipe(gulp.dest('./build/css'));
});

//You can then do per-page css and reduce load times, or just scrap extra boilerplate or crap you wrote and didn't use.


////////////////
///Images Tasks
///////////////

//Compress

gulp.task('image', function(){
	gulp.src('img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('build/img'));
});

////////////////
///Default Tasks
///////////////

//Watch Tasks
gulp.task('watch', function() {
	var server = livereload();
	gulp.watch('js/*.js', ['scripts']); //string or directory of the files (or **/*.js to pick up all files)
	gulp.watch('scss/**/*.scss', ['styles']); //watch all the files specified and then execute the function
});

///Default Build Task
gulp.task('default', ['scripts', 'styles', 'image']);
//You can add the watcher command to the default task,
//this isn't recommended for ALL things, you may want to just uglify JS on production.
