# rve.com-docker

## Install
- Install BrowserSync in your browser.
- Download this repo to a location on your C:/ drive
- Download and install [Docker Toolbox](http://www.docker.com/products/docker-toolbox)
- Run the Docker Quickstart Terminal (a shortcut will have been created by Docker Toolbox)
- Browse to your repo folder
- Run `docker-compose build`
  - Docker will download the docker container, which is ~900MB in size, and then run automatic installations of gems and npm modules. It will never need to do this again unless you delete the rhianvanesch.com image.


## Basic workflow
- Run the Docker Quickstart Terminal (a shortcut will have been created by Docker Toolbox). This will give you the IP address that you will use in your browser for local development.
- In the terminal, browse to your repo folder
- Run `docker-compose up`
  - This command starts a docker container and runs the gulp tasks to build and serve a **development** build of your Jekyll site. (Ignore the IP address given here.)
  - To quit, press `CTRL-C`.
- Go to the IP address in your browser at port 9999 (usually this is `192.168.99.100:9999`).
- Open your project folder in your text editor of choice
- Edit files in the `jekyll-app` directory (usually `jekyll-app/_posts` and `jekyll-app/_projects`). Your browser will refresh when changes are saved.

## Build the production version of site
- If docker-compose is running, `CTRL-C` to quit it, then run `docker-compose run -d gulp gulp publish`
- In your repo folder, browse to `build/production` for the compiled site. You can now either manually upload this via FTP or use the deploy command, listed below.

## Deploy site
- After building the production version of the site, run `docker-compose run -d gulp gulp deploy`

## Useful Docker commands

### Rebuild container

`docker-compose build`

Do this if you make any changes to the following configuration files:
- Gemfile
- Gemfile.lock
- package.json
- gulpfile.js
- _config.yml
- _config.build.yml
- .scss-lint.yml

### Containers

- List all running docker containers: `docker ps`
- List all docker containers: `docker ps -a`

### Images

- List all docker images: `docker images`
- The only images you need to keep are `node` and `wilcofoliodocker_gulp`. When you run `docker images` it should look like this:
  ```
  $ docker images
  REPOSITORY              TAG        IMAGE ID        CREATED         SIZE
  wilcofoliodocker_gulp   latest     eeba12a3557f    19 hours ago    916.6 MB
  node                    latest     72d4ec634f1f    5 weeks ago     649.7 MB
  ```

### Clean-up procedure
To get rid of any extra containers or images (and save disk space) you can periodically run the following (in order):
1. Delete all unused containers: `docker rm $( docker ps -q -f status=exited)`
  - If there are no eligible containers for deletion, you will get the error `"rm" requires a minimum of 1 argument.`
2. Delete all unused images: `docker rmi $( docker images -q -f dangling=true)`
  - If there are no eligible images for deletion, you will get the error `"rmi" requires a minimum of 1 argument.`
