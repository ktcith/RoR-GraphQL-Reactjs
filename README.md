Challenge
=========

* [Setting Up](https://www.screencast.com/t/fOR1EPHKVCD) - 4 Minute Video Explaining how to setup

* [Backend Tips and Hints](https://www.screencast.com/t/RVqdkOHDB) - 5 Minute video introducing how to directly query the graph api served by Rails and where/how to update it.

* [Frontend Tips and Hints](https://www.screencast.com/t/9nQmgeWE) - 5 Minute video introducing Relay containers, showing where to find the form to update, and how to use `this.props.relay.setVariables({...})` to change the arguments used by the containers GraphQL

* [Testing the API with rspec request tests](https://www.screencast.com/t/6jBlr23b)

* [Testing the Front-End with rspec feature tests](https://www.screencast.com/t/rL6cwI5iqH4)

Install Node & Dependencies
-------

```
nvm install 6.9.1
nvm use 6.9.1
npm install yarn -g
yarn
```

Install Ruby and Dependencies
-----
```
rvm install 2.3.1
rvm use 2.3.1
gem install bundler
brew install libgraphqlparser
bundle install
rake db:create
rake db:migrate
rake developers:seed
```

Install Web Drivers
-----
```
brew install chromedriver
brew services start chromedriver
```

Developing
------

Running rails is the same as usual, but the javascript bundle isn't checked into source so you need to build
it first.

1) yarn run webpack

2) yarn run watch

3) yarn run rails

4) open http://localhost:3000

Running Tests
------

1) brew install chromedriver

2) brew services start chromedriver

3) rspec

Username Password
------

* jeff@example.com

* 1234567


Running GraphQL
------

* http://localhost:3000/graphiql

* jeff@example.com

* 1234567
