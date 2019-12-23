/**
 * Created by busyhe on 2019/11/13.
 * Email: 525118368@qq.com
 * Description:
 */
const startTime = new Date;
const path = require('path');
const os = require('os');
const argv = require('yargs').argv;
const chalk = require('chalk');
const koa = require('koa');
const app = new koa();
const body = require('koa-body');
const routes = require('./routes');
const pluginConfig = require('./plugin/plugin-config');
const package = require('../package');

pluginConfig(app, path.join(os.homedir(), '.app-config/test'));
routes(app);
app.use(body());

const port = argv.port || app.context.config('default.port');
const server = app.listen(port);

console.log(chalk.cyan(Array(60).join('-')));
console.log(chalk.cyan('Server starting'));
console.log(chalk.cyan('Port: ') + chalk.white(server.address().port) + ` - http://127.0.0.1:${server.address().port}`);
console.log(chalk.cyan('Time: ') + chalk.white((new Date - startTime) + 'ms'));
console.log(chalk.cyan('Memory: ') + chalk.white(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb`));
console.log(chalk.cyan('Version: ') + chalk.white(package.version));
console.log(chalk.cyan('Date: ') + chalk.white(new Date));
console.log(chalk.cyan(Array(60).join('-')));

