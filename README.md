# Basic Gulp File 
## Use Sass, Gridzilla, PostCss, Uglify, Livereload and Imagemin with your project.
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
Compiles all Sass, Compresses/Uglifies Javascript and compresses images. 
Outputs to a 'dist' folder. 

```
gulp watch
```

Watches Sass files and JS files, compiles/compresses on the fly.

Auto-reloads browser.

```
gulp image
```

Run imagemin and compress images. 
Outputs to a 'dist' folder.

```
gulp styles
```


### Livereload on Watch and Styles tasks 
Will auto reload with Livereload. If there are issues check for port conflicts.
You must have the livereload browser extension installed for this. 

[Live Reload Chrome Browser Extestion](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

[Live Reload Firefox Browser Extestion](http://download.livereload.com/2.0.8/LiveReload-2.0.8.xpi)

[Live Reload Safari Browser Extestion](http://download.livereload.com/2.0.9/LiveReload-2.0.9.safariextz)
