# rhianvanesch.com

## Option 1: launch with gulp

### Install
- Download this repo to a location on your computer
- Download and install [Ruby](https://www.ruby-lang.org/). I recommend using [RubyInstaller](http://rubyinstaller.org/) on Windows (make sure to add Ruby executables to your PATH)
- Install [Node.js](https://nodejs.org/), again adding to PATH on Windows.

### Check it's working:

Open a new command line windows and enter the following:

```
ruby -v
node -v
npm -v
```

If Ruby, Node and the node package manager are installed correctly, you'll get version numbers for each.

### Open a command line and run these:
On Windows, do this as an administrator. I also recommend [ConEmu](https://conemu.github.io/) as a much-improved upgrade from the built-in cmd.

- `gem install bundler` - installs [Bundler](http://bundler.io/), which lets you manage Ruby gems
- `bundle install` - uses Bundler to quickly install all of the Ruby dependencies as defined in the Gemfile
- `npm install gulp -g` - uses the node package manager to globally install gulp on your machine - a requirement for running gulp locally
- `npm install` - uses the node package manager to install all of our gulp project dependencies, as defined in package.json

### Run the main gulp task

`gulp` is the default development task. It will do the following:
- delete the existing build/assets directory
- start watching files in jekyll and asset directories for changes
- start BrowserSync
- compile the jekyll site
- compile Sass into css and generate a source map, and lint
- concatenate JavaScript files into scripts.js and generate a source map, and lint
- copy the jekyll site and all assets into the `build/development` and `build/assets` directories (we take the assets out of the jekyll directory in development because jekyll deletes and rebuilds its containing directory on every site rebuild - a frequent occurrence in the development phase)

Now that it's watching your jekyll and asset directories, any changes will automatically reload your browser window, which is ideal for efficient development.

### Publishing the site

`gulp publish` will get the site ready for deployment:
- compile jekyll site
- compile Sass into css and minify
- concatenate JavaScript files and minify
- optimise all images
- revision assets
- use an additional jekyll `_config.build.yml` file to overwrite any development settings from `_config.yml`, e.g. the `site.url` variable

You now have a ready-to-go site in `build/production`.

## Option 2: launch with Docker

On some computers I've had some issues with the `mini_magick` gem not running correctly, so I've created a Docker container build for this repo.

### Install
- Download this repo to a location on your C:/ drive
- Download and install [Docker Toolbox](http://www.docker.com/products/docker-toolbox)
- Run the Docker Quickstart Terminal (a shortcut will have been created by Docker Toolbox)
- Browse to your repo folder
- Run `docker-compose build`
  - Docker will download the docker container, which is ~900MB in size, and then run automatic installations of gems and npm modules. It will never need to do this again unless you delete the rhianvanesch.com image.


### Basic workflow
- Run the Docker Quickstart Terminal (a shortcut will have been created by Docker Toolbox). This will give you the IP address that you will use in your browser for local development.
- In the terminal, browse to your repo folder
- Run `docker-compose up`
  - This command starts a docker container and runs the gulp tasks to build and serve a **development** build of your Jekyll site. (Ignore the IP address given here.)
  - To quit, press `CTRL-C`.
- Go to the IP address in your browser at port 9999 (usually this is `192.168.99.100:9999`).
- Open your project folder in your text editor of choice
- Edit files in the `jekyll-app` directory (usually `jekyll-app/_posts` and `jekyll-app/_projects`). Your browser will refresh when changes are saved.

### Build the production version of site
- If docker-compose is running, `CTRL-C` to quit it, then run `docker-compose run -d gulp gulp publish`
- In your repo folder, browse to `build/production` for the compiled site. You can now either manually upload this via FTP or use the deploy command, listed below.

### Deploy site
- After building the production version of the site, run `docker-compose run -d gulp gulp deploy`

### Useful Docker commands

#### Rebuild container

`docker-compose build`

Do this if you make any changes to the following configuration files:
- Gemfile
- Gemfile.lock
- package.json
- gulpfile.js
- _config.yml
- _config.build.yml
- .scss-lint.yml

#### Containers

- List all running docker containers: `docker ps`
- List all docker containers: `docker ps -a`

#### Images

- List all docker images: `docker images`
- The only images you need to keep are `node` and `rvedocker_gulp`. When you run `docker images` it should look like this:

  ```
  $ docker images
  REPOSITORY              TAG        IMAGE ID        CREATED         SIZE
  rvedocker_gulp          latest     eeba12a3557f    19 hours ago    916.6 MB
  node                    latest     72d4ec634f1f    5 weeks ago     649.7 MB
  ```

#### Clean-up procedure
To get rid of any extra containers or images (and save disk space) you can periodically run the following (in order):

1. Delete all unused containers: `docker rm $( docker ps -q -f status=exited)`
  - If there are no eligible containers for deletion, you will get the error `"rm" requires a minimum of 1 argument.`
2. Delete all unused images: `docker rmi $( docker images -q -f dangling=true)`
  - If there are no eligible images for deletion, you will get the error `"rmi" requires a minimum of 1 argument.`
