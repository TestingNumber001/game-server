import * as nodemon from 'nodemon';

// Watch for changes in the built file.
const build = nodemon({
    script: './build/index.bundle.js',
    watch: ['build/**/*']
});

// Start the dev
build.on('start', function () {
    console.log('Watching for changes...');
});

// Error handling
build.on('error', function (err) {
    console.error(err);
});

// Watch for changes
build.on('change', function (path) {
    console.log(path);
    console.log('Watching for changes...');
});