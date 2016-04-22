'use strict';

const winston = require('winston'),
    transports = require('./transports');

let Logger,
    consoleLoggerLevel;

require('winston-udp');

class Logger {
    constructor() {
        this.logger = new (winston.Logger)();
    }

    addTransport(level, transport, opts) {
        this.logger.add(
            transport,
            Object.assign({}, {
                level: level || 'info'
            }, opts)
        );
    }

    addHTTP(level, opts) {
        if (this.logger.transports.http) {
            return;
        }

        this.logger.add(
            winston.transports.Http,
            Object.assign({}, {
                level: level || 'info'
            }, opts)
        );
    }

    addUDP(level, opts) {
        if (this.logger.transports.http) {
            return;
        }

        this.logger.add(
            winston.transports.UDP,
            Object.assign({}, {
                level: level || 'info'
            }, opts)
        );
    }

    removeUDP() {
        if (!this.logger.transports.udp) {
            return;
        }

        this.logger.remove('udp');
    }

    removeHTTP() {
        if (!this.logger.transports.http) {
            return;
        }

        this.logger.remove('http');
    }

    addConsole(level, opts) {
        if (this.logger.transports.console) {
            return;
        }

        this.logger.add(
            winston.transports.Console,
            Object.assign({}, {
                level: level || 'info'
            }, opts)
        );
    }

    removeConsole() {
        if (!this.logger.transports.console) {
            return;
        }

        this.logger.remove('console');
    }

    clearLoggers() {
        Object.keys(this.logger.transports).forEach((logger) => this.logger.remove(logger));
    }

    transports() {
        return transports;
    }
}


if (process.env.NODE_ENV === 'test') {
    consoleLoggerLevel = 'error';
} else {
    consoleLoggerLevel = process.env.CONSOLE_LOGGER_LEVEL || 'silly';
}

Logger = new Logger; //changed to Logger from logger when added logger() from mss-logger

Logger.addConsole(consoleLoggerLevel);



//added from mss-logger
function logger(config) {
    var winston = require('winston'),
        Logger,
        Loggly,
        logLevel;

    config = config || {};
    config.console = config.console || {};
    config.loggly = config.loggly || {};

    logLevel = process.env.LOGLEVEL || config.defaultLogLevel || 'warn';
    Loggly = require('winston-loggly').Loggly;


    Logger = new winston.Logger({
        levels: {
            silly: 0,
            debug: 10,
            verbose: 20,
            info: 30,
            warn: 40,
            error: 50,
            fatal: 60,
            important: 70
        },

        colors: {
            silly: 'grey',
            debug: 'blue',
            verbose: 'cyan',
            info: 'green',
            warn: 'yellow',
            error: 'red',
            fatal: 'magenta',
            important: 'green'
        },

        transports: [
            new winston.transports.Console({
                colorize: config.console.colorize || true,
                timestamp: true,
                level: process.env.CONSOLE_LOGLEVEL || config.console.level || logLevel
            })
        ]
    });

    if (typeof config.loggly.tag !== 'undefined') {
        Logger.add(winston.transports.Loggly,
            {
                inputToken: config.loggly.inputToken || '95046b00-1712-4c94-ac16-0fc74a29a399',
                json: config.loggly.json || true,
                level: process.env.LOGGLY_LOGLEVEL || config.loggly.level || logLevel,
                stripColors: config.loggly.stripColors || true,
                subdomain: config.loggly.subdomain || 'mssturnerapps',
                tags: [config.loggly.tag]
            }
        );
    }

    if (config.prependString) {
        Object.keys(Logger.levels).forEach(function (level) {
            Logger[level] = function (msg) {
                arguments[0] = config.prependString + msg;
                var args = [level].concat(Array.prototype.slice.call(arguments));
                Logger.log.apply(Logger, args);
            };
        });
    }

    return Logger;
}


module.exports = logger;
module.exports = Logger;
module.exports.winston = winston;
