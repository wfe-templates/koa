/**
 * Created by busyhe on 2019/12/23.
 * Email: 525118368@qq.com
 * Description: config 配置文件 argConfigPath > optConfigPath > appConfig
 */
const Config = require('@lvchengbin/config');
const is = require('@lvchengbin/is');
const {loadFiles} = require('../utils/file');
const path = require('path');
const argv = require('yargs').argv;
const CONFIG_PATH = path.resolve(__dirname, '../config');

module.exports = (app, configDir) => {
    const argConfigPath = argv.configDir;
    const optConfigPath = configDir;

    let configs = [];

    if (argConfigPath) {
        const config = loadFiles(argConfigPath);
        config && configs.push(new Config(config));
    }

    if (optConfigPath) {
        const config = loadFiles(optConfigPath);
        config && configs.push(new Config(config));
    }

    configs.push(new Config(loadFiles(CONFIG_PATH)));

    for (const config of configs) {
        for (const prop in config.config) {
            const item = config.config[prop];
            is.function(item) && (config.config[prop] = item(this));
        }
    }

    app.context.config = (path, defaultValue) => {
        let res;
        for (const config of configs) {
            res = config.get(path);
            if (!is.undefined(res)) return res;
        }
        return is.undefined(res) ? defaultValue : res;
    };
};
