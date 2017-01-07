---
title: "Create React App with Sass and concurrently"
date: 2016-11-27
---

### Introduction

[Create React App](https://github.com/facebookincubator/create-react-app) is a starter kit for building a React app. There's no build configuration, and everything is simplified down to a few commands, so it's quick and easy to get up and running. It uses Webpack, Babel and ESLint, and you don't need to mess with any of them to start building your app. When you do want to start fiddling around under the hood, you can eject out of Create React App and it will put all the scripts, dependencies and config back in front of you. So, really appealing if you're just starting to learn React.

However... no build configuration means *no build configuration*, so unless you want to eject out early, how do you add in things like Sass? For some of us, CSS compilers are an important part of our development process. I found some discussion about optional Sass support (see [this GitHub issue thread](https://github.com/facebookincubator/create-react-app/issues/78)) and some good ideas of how to add it in yourself. I based this solution on some of the ideas in the thread.

#### Caveats and requirements

- I'm on a Windows machine
- I want to be able to type one command and have everything just work
- I don't want to open multiple CLI windows

Luckily, Create React App is set up to refresh the browser whenever the index.css file is changed (located at `src/index.css`). We can run Sass ourselves and get it to compile to index.css. Using a watch command will ensure that whenever we save an .scss file, our index.css file will be updated, and in turn that will trigger the automatic refresh of the page by Create React App.

So, we just need to run a Sass watch command and our default Create React App command at the same time. I considered using Gulp, but came across [concurrently](https://github.com/kimmobrunfeldt/concurrently), which works on Windows (and other platforms) and ensures all the processes end correctly.

#### Which Sass?

There are a couple of flavours of Sass we can use on Windows. [Ruby Sass](http://sass-lang.com/install) requires Ruby to be installed, and [node-sass](https://github.com/sass/node-sass) requires Microsoft Visual Studio 2013 WD, although it seems to be running ok for me with Visual Studio Express 2012. If you have trouble getting one to work, try the other. I'll provide instructions for both.

#### What we're going to use:

- [Create React App](https://github.com/facebookincubator/create-react-app)
- [node-sass](https://github.com/sass/node-sass) or [Ruby Sass](http://sass-lang.com/install)
- [concurrently](https://github.com/kimmobrunfeldt/concurrently)
- a few custom scripts in the package.json for our app

### 1. Installation

Install [Create React App](https://github.com/facebookincubator/create-react-app) globally, create a project and open the project folder:

```
npm install -g create-react-app

create-react-app my-project
cd my-project
```

Install concurrently:

```
npm install concurrently --save-dev
```

Install either node-sass or Ruby Sass:

#### A: node-sass

```
npm install node-sass --save-dev
```
and you may need Microsoft Visual Studio 2013 WD as detailed on [the official node-sass page](https://github.com/sass/node-sass#install).

#### B: Ruby Sass

1. Install Ruby with the Windows [Ruby Installer](http://rubyinstaller.org/)
2. On the command line, run `gem install sass`
3. Confirm it's installed correctly by running `sass -v`

### 2. Sass files

In the root of our project folder, create a /scss folder and an index.scss file inside that. Your project structure will look like this:

```
/node_modules
/public
/scss
  index.scss
/src
  App files, including index.css
.gitignore
package.json
README.md
```

**N.B.** You can name `index.scss` something else, but then you would need to specify the input and output files in your Sass commands as (for example) `main.scss` and `index.css`, rather than just the input and output directories as I've done.

### 3. Scripts

We need a Sass watch script to run alongside our Create React App script. We'll put these in the `package.json` that Create React App created when we ran it earlier. It is located in the root of your project's directory, e.g. `my-project/package.json`.

#### A: node-sass

When we run a `node-sass --watch` command, it doesn't compile the files as soon as it's run, but only when the files change. If you make any changes to your .scss files before you start watching them, the changes won't be picked up.

To avoid this, we need to run an extra non-watch node-sass command first, then after that run the watch command alongside the Create React App command.

We'll add two new scripts to our `package.json`, `sass-compile` and `sass-watch`:

```
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject",
  "sass-compile": "node-sass --recursive scss -o src",
  "sass-watch": "node-sass --watch --recursive scss -o src"
}
```

These commands take the `/scss` folder as the input directory, and output to the `/src` folder.

We will then change the `start` script to:

1. Run the `sass-compile` command
2. Run the `sass-watch` command together with the default start command, `react-scripts start`. We'll use `concurrently` to do this.

The updated scripts section:

```
"scripts": {
  "start": "npm run sass-compile && concurrently --kill-others \"npm run sass-watch\" \"react-scripts start\"",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject",
  "sass-compile": "node-sass --recursive scss -o src",
  "sass-watch": "node-sass --watch --recursive scss -o src"
}
```

**N.B.** We use the `--kill-others` flag with `concurrently` to kill all commands if one exits or dies.

#### B: Ruby Sass

Ruby Sass is more straight-forward in that we don't need to compile our Sass files before we watch them; we can do it on one command.

We'll add one new script to our `package.json`: `sass-watch`:

```
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject",
  "sass-watch": "sass --watch scss:src"
}
```

This command takes the `/scss` folder as the input directory, and output to the `/src` folder.

We will then change the `start` script to run the `sass-watch` command together with the default start command, `react-scripts start`. We'll use `concurrently` to do this.

The updated scripts section:

```
"scripts": {
  "start": "concurrently --kill-others \"npm run sass-watch\" \"react-scripts start\"",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject",
  "sass-watch": "sass --watch scss:src"
}
```

**N.B.** As with node-sass, we use the `--kill-others` flag with `concurrently` to kill all commands if one exits or dies.

### Conclusion

The result is that we only need to run `npm run start` in the terminal and:

- our Sass will be compiled and watched
- our React app will start up in the browser
- every time we save a change to a .scss file the browser will reload and show the changes
