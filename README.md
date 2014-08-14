##Basic Gulp Package file.

Put these both in your directory, install the dependency gulp packages with 'npm install'.

Use Sass, Compass, Uncss, Uglify, Livereload, Imagemin and Livereload with your project.
No frameworks or templating engines, just simple stuff for small projects :)

###Commands

```
gulp
```

- Default task will run the build.
Compiles all Sass, Compresses/Uglifies Javascript and compresses images. Outputs to a 'build' folder.

```
gulp watch
```

Watches Sass files and JS files, compiles/compresses on the fly.
Run this like you would ```compass watch```
Auto-reloads browser.

```
gulp image
```

Run imagemin and compress images. Outputs to a 'build' folder.

```
gulp styles
```

Builds using compass or sass, compass set as default for now.
When using compass, you can use this instead of your config.rb just set your Compass options and requires in the compass() pipe. Using it with config .rb is recommended for the http path.

Make sure your css: and sass: directories are correct :) 


###Livereload on Watch and Styles tasks 
Will auto reload with Livereload. If there are issues check for port conflicts.
You must have the livereload browser extension installed for this. 

[Live Reload Chrome Browser Extestion](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

[Live Reload Safari Browser Extestion](http://download.livereload.com/2.0.8/LiveReload-2.0.8.xpi)

[Live Reload Firefox Browser Extestion](http://download.livereload.com/2.0.9/LiveReload-2.0.9.safariextz)
