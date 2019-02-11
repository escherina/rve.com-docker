var src = "jekyll-app";
var build = "build";
var development = "build/development";
var production = "build/production";
var srcAssets = "jekyll-app/assets";
var developmentAssets = "build/assets";
var productionAssets = "build/production/assets";

/*
Since Jekyll wipes all files on rebuild, build/development holds the files
created by Jekyll - this speeds up the watch process. Assets are in another
folder so Jekyll can't erase them. srcAssets is for source maps.

BrowserSync only watches these asset files (developmentAssets).
*/
module.exports = {
  browsersync: {
    development: {
      server: {
        baseDir: [development, build, src]
      },
      port: 9999,
      files: [
        developmentAssets + "/css/*.css",
        developmentAssets + "/js/*.js",
        developmentAssets + "/images/**",
        developmentAssets + "/fonts/*"
      ]
    }
  },
  delete: {
    development: {
      src: [developmentAssets]
    },
    production: {
      src: [developmentAssets, productionAssets]
    }
  },
  jekyll: {
    development: {
      src: src,
      dest: development,
      config: src + "/_config.yml"
    },
    production: {
      src: src,
      dest: production,
      config: "jekyll-app/_config.yml,jekyll-app/_config_build.yml"
    }
  },
  sass: {
    src: srcAssets + "/scss/*.{sass,scss}",
    dest: developmentAssets + "/css",
    options: {
      sourcemap: true,
      bundleExec: true
    }
  },
  autoprefixer: {
    browsers: ["last 2 versions", "ie 8", "ie 9"],
    cascade: true
  },
  scripts: {
    src: [srcAssets + "/js/*.js", "!" + srcAssets + "/js/noconcat/*.js"],
    dest: developmentAssets + "/js"
  },
  scripts_noconcat: {
    src: [srcAssets + "/js/noconcat/*.js"],
    dest: developmentAssets + "/js"
  },
  images: {
    src: development + "/assets/images/**/*.*",
    dest: developmentAssets + "/images"
  },
  copyfonts: {
    development: {
      src: srcAssets + "/fonts/*",
      dest: developmentAssets + "/fonts"
    },
    production: {
      src: developmentAssets + "/fonts/*",
      dest: productionAssets + "/fonts"
    }
  },
  watch: {
    jekyll: [
      "_config.yml",
      "_config_build.yml",
      src + "/_data/**/*.{json,yml,csv}",
      src + "/_includes/**/*.{html,xml}",
      src + "/_layouts/*.html",
      src + "/_plugins/*.rb",
      src + "/_posts/*.{markdown,md}",
      src + "/**/*.{html,markdown,md,yml,json,xml}",
      src + "/*"
    ],
    sass: srcAssets + "/scss/**/*.{sass,scss}",
    scripts: srcAssets + "/js/*.js",
    scripts_noconcat: srcAssets + "/js/noconcat/*.js",
    images: srcAssets + "/images/**/*"
  },
  scsslint: {
    src: [
      srcAssets + "/scss/**/*.{sass,scss}",
      "!" + srcAssets + "/scss/_syntax-highlighting.scss",
      "!" + srcAssets + "/scss/_generic.normalize.scss"
    ],
    options: {
      bundleExec: true
    }
  },
  jshint: {
    src: srcAssets + "/js/*.js"
  },
  optimize: {
    css: {
      src: developmentAssets + "/css/*.css",
      dest: productionAssets + "/css/",
      options: {
        discardComments: true,
        discardEmpty: true,
        mergeLonghand: true,
        safe: true
      }
    },
    js: {
      src: developmentAssets + "/js/*.js",
      dest: productionAssets + "/js/",
      options: {}
    },
    images: {
      src: developmentAssets + "/images/**/**/*.{jpg,jpeg,png,gif}",
      dest: productionAssets + "/images/"
    }
  },
  revision: {
    src: {
      assets: [
        productionAssets + "/css/*.css",
        productionAssets + "/js/*.js",
        productionAssets + "/images/**/*"
      ],
      base: production
    },
    dest: {
      assets: production,
      manifest: {
        name: "manifest.json",
        path: productionAssets
      }
    }
  },
  revdel: {
    src: productionAssets + "/**/*.*",
    dest: productionAssets
  },
  collect: {
    src: [
      productionAssets + "/manifest.json",
      production + "/**/*.{html,xml,txt,json,css,js}",
      "!" + production + "/feed.xml"
    ],
    dest: production
  },
  rsync: {
    src: production + "/**",
    options: "-rtvhcz --delete --progress --chmod=a=r,u+w,D+x -p"
  }
};
