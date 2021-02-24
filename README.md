
    shell$ mkdir dip
    shell$ cd dip/
    shell$ git init .
    shell$ echo ".idea" >> .gitignore
    shell$ echo "node_modules" >> .gitignore
    shell$ git add .
    shell$ git commit -a -m "added gitignore"
    shell$ docker run --rm -it -v `pwd`:/dip node:14.15.4 bash
    container$ npm init
    container$ npm install bootstrap@4.6
    container$ mkdir -p src/{js,css,scss,images,fonts}
    container$ touch src/index.html
    container$ touch src/scss/style.scss
    container$ npm install gulp browser-sync gulp-sass --save-dev


 # https://coursetro.com/posts/design/72/Installing-Bootstrap-4-Tutorial
