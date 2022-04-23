const {src, dest,watch} = require("gulp");
const pug = require("gulp-pug");
const sass = require('gulp-sass')(require('sass'));

function html(){
    return src("frontend/pug/*.pug")
    .pipe(pug({pretty:true}))
    .pipe(dest("frontend/html"))
   
}

function css(){
    return src("frontend/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("frontend/css"))
    
}


exports.html = html;
exports.css = css;
exports.watch = () =>{
    watch("frontend/pug/*.pug",html);
    watch("frontend/sass/*.scss",css);
}