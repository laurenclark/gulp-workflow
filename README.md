# 🛑 DEPRECATED
- NPM scripts for most projects are sufficient so I won't be updating this to work with the latest Gulp update but it should still work with older versions of Gulp (prior to 4) 


# Basic Gulp File
## Use Sass, Gridzilla, Autoprefix, CSS  JS and Image Minification with your project.
No bulky frameworks or templating engines, just simple stuff for small projects, or as a starting point for writing your own.


### Getting Started

You'll need to install Node.js, and then ```$ npm install gulp -g``` from the command line.

- Gulpfile.js -> Put this in your main directory
- Package.json -> Put this in your main directory too.
- Run ```$ npm install``` from your project directory using the command line. 
- This will install all the required gulp packages.

You can view the documentation for Gridzilla here https://teefouad.github.io/gridzilla/


### Commands

```
gulp
```

Default task will run the build.
Compiles all Sass, minifies Javascript, CSS and compresses images. 
Outputs to a 'dist' folder. 

```
gulp watch
```

Watches Sass files and JS files, compiles/compresses on the fly.


```
gulp image
```

Run imagemin and compress images. 
Outputs to a 'dist' folder.

```
gulp styles
```


