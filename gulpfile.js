import gulp from 'gulp';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import replace from 'gulp-replace';
import terser from 'gulp-terser';
import pimport from 'postcss-import';
import minmax from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import svgmin from 'gulp-svgmin';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';
import sync from 'browser-sync';
import ghpages from 'gh-pages';

// Sprite

export const sprite = () => {
    return gulp.src('src/images/icons/*.svg')
        .pipe(svgmin({
            plugins: [{
                cleanupNumericValues: {
                    floatPrecision: 1
                },
            },
            {
                convertPathData: {
                    floatPrecision: 1
                },
            },
            {
                removeAttrs: {
                    attrs: [
                        "fill",
                        "class",
                        "stroke",
                        "version",
                        "fill-rule",
                        "clip-rule"
                    ]
                }
            }]
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest('dist/images'))
        .pipe(sync.stream());
};

// HTML

export const html = () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

// Styles

export const styles = () => {
    return gulp.src('src/styles/index.css')
        .pipe(postcss([
            pimport,
            minmax,
            autoprefixer,
            csso,
        ]))
        .pipe(gulp.dest('dist/styles'))
        .pipe(sync.stream());
};

// Scripts

export const scripts = () => {
    return gulp.src('src/scripts/index.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist/js'))
        .pipe(sync.stream());
};

// Copy

export const copy = () => {
    return gulp.src([
            'src/fonts/**/*',
            'src/images/**/*',
            '!src/images/icons/*',
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream({
            once: true
        }));
};

// Server

export const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });
};

// Watch

export const watch = () => {
    gulp.watch('src/*.html', gulp.series(html));
    gulp.watch('src/styles/**/*.css', gulp.series(styles));
    gulp.watch('src/scripts/**/*.js', gulp.series(scripts));
    gulp.watch([
        'src/fonts/**/*',
        'src/images/**/*',
    ], gulp.series(copy));
};

// Default

export default gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        copy,
        sprite,
    ),
    gulp.parallel(
        watch,
        server,
    ),
);

ghpages.publish('gulp');