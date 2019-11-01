⚠⚠⚠ **This project is now archived. I no longer build my website using Jekyll and the dependencies are very out-of-date - proceed with caution!** ⚠⚠⚠

# rhianvanesch.com

## Install
- Download this repo to a location on your computer
- Download and install [Ruby](https://www.ruby-lang.org/). I recommend using [RubyInstaller](http://rubyinstaller.org/) on Windows (make sure to add Ruby executables to your PATH)
- Install [Node.js](https://nodejs.org/), again adding to PATH on Windows.

## Check it's working:

Open a new command line windows and enter the following:

```
ruby -v
node -v
npm -v
```

If Ruby, Node and the node package manager are installed correctly, you'll get version numbers for each.

## Open a command line and run these:
On Windows, do this as an administrator. I also recommend [ConEmu](https://conemu.github.io/) as a much-improved upgrade from the built-in cmd.

- `gem install bundler` - installs [Bundler](http://bundler.io/), which lets you manage Ruby gems
- `bundle install` - uses Bundler to quickly install all of the Ruby dependencies as defined in the Gemfile
- `npm install gulp -g` - uses the node package manager to globally install gulp on your machine - a requirement for running gulp locally
- `npm install` - uses the node package manager to install all of our gulp project dependencies, as defined in package.json

## Run the main gulp task

`gulp` is the default development task. It will do the following:
- delete the existing build/assets directory
- start watching files in jekyll and asset directories for changes
- start BrowserSync
- compile the jekyll site
- compile Sass into css and generate a source map, and lint
- concatenate JavaScript files into scripts.js and generate a source map, and lint
- copy the jekyll site and all assets into the `build/development` and `build/assets` directories (we take the assets out of the jekyll directory in development because jekyll deletes and rebuilds its containing directory on every site rebuild - a frequent occurrence in the development phase)

Now that it's watching your jekyll and asset directories, any changes will automatically reload your browser window, which is ideal for efficient development.

## Publishing the site

`gulp publish` will get the site ready for deployment:
- compile jekyll site
- compile Sass into css and minify
- concatenate JavaScript files and minify
- optimise all images
- revision assets
- use an additional jekyll `_config.build.yml` file to overwrite any development settings from `_config.yml`, e.g. the `site.url` variable

You now have a ready-to-go site in `build/production`.
