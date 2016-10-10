FROM node

EXPOSE 9999

RUN apt-get update && apt-get install -y \
    build-essential \
    ruby \
    ruby-dev

RUN gem install bundler
RUN mkdir /rve-docker

WORKDIR /rve-docker

COPY .scss-lint.yml .scss-lint.yml
COPY gulpfile.js gulpfile.js
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
COPY package.json package.json

RUN bundle install
RUN npm install gulp -g
RUN npm install

CMD gulp
