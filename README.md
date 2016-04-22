# CNN Logger

[ ![Codeship Status for jamsyoung/cnn-logger](https://codeship.com/projects/d62d3a00-a5c6-0133-99a9-1eb0603110e7/status?branch=master)](https://codeship.com/projects/129713)

**Contents**

- [Documentation](#documentation)
- [Local development](#local-development)
  - [Requirements](#requirements)
  - [Local install](#local-install)
  - [How to start it up](#how-to-start-it-up)
  - [Environment variables](#environment-variables)
- [Generate local docs](#generate-local-docs)
- [Contributing](#contributing)
- [Project Owner](#project-owner)
- [Current Project Team Members](#current-project-team-members)



## Documentation

- ESDoc documentation can be generated.  See below for details.


## Local development
CNN Logger can be added to projects as a dependency with full support for logging to the console and/or cloud based log management products.

Currently, the only cloud based log management product support is [Loggly](https://www.loggly.com/).

This logger is built on top of Winston and takes advantage of Transports to allow logging to multiple endpoints.

##Contents
[Example Usage]()
[Requirements]()
[Configuration]()
[How to:]()
	[Send all logs to loggly, tagged by environment]()
	[Only send production logs to Loggly]()
	[Add as a dependency]()
	[Contribute to this project]()

##Example Usage
###Just the logs:
```
let log = require('cnn-logger')({ loggly: {tag: 'my-unique-loggly-tag'} });

log.info('Did you know CNN Center started as an amusement park?');
log.silly('Knock Knock');
log.debug('Grabbing the Raid');
log.verbose('.......ibid.......');
log.warn('');
log.error('');
log.fatal('');
log.important('');
```

###Configuring custom functions/transports:
```
const log = require('cnn-logger')(config.get('logConfig'),
	fileTransport = require('cnn-logger').winston.transports.File;

require('winston-udp').UDP;

```


## Requirements

A current LTS or Stable version of [Node.js](https://nodejs.org).  We recommend
using [nvm](https://github.com/creationix/nvm#readme) to manage node versions.

## Installation
### Add to project:

1. Add to package.json:
	```
	"dependencies": {
		"cnn-logger": "git@github.com:cnnlabs/cnn-logger.git"
	}
	```

2. ```
	$ npm install


	```


### Local install:

Clone this repository, install the above requirements, then:

```shell
$ cd cnn-logger
$ nvm use
$ npm install
```


### How to start it up

This application runs off of project and environment configuration.  There are
a few environment variables required to start up the app.  See below for details
on all of the environment variables that can be set.  Here is the minimum
required to start the application up.  Defaults for the required ENVIRONMENT
variables are defined in the start script in package.json.

```shell
$ npm start
```


### Environment variables

- **ENVIRONMENT** - _REQUIRED_ - Should be `ref` or `prod`.  Anything
  passed in that does not match this list is treated as `ref`.  This sets the
  group of project configurations to use. (See [config.js](./config.js))

- **PORT** - _REQUIRED_ - The port that this application will run on.  `5000` is
  a common value, but you can use any valid port number that is available on
  your system.


## Generate Local Docs

```shell
$ npm run generate-docs
$ open docs/index.html
```


![node](https://img.shields.io/node/v/cnn-logger.svg?style=flat-square)
[![npm](https://img.shields.io/npm/v/cnn-logger.svg?style=flat-square)](https://www.npmjs.com/package/cnn-logger)
[![npm-downloads](https://img.shields.io/npm/dm/cnn-logger.svg?style=flat-square)](https://www.npmjs.com/package/cnn-logger)
[![dependency-status](https://gemnasium.com/cnnlabs/cnn-logger.svg)](https://gemnasium.com/cnnlabs/cnn-logger)



[nvm]: https://github.com/creationix/nvm
