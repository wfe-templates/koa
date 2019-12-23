/**
 * Created by busyhe on 2019/12/23.
 * Email: 525118368@qq.com
 * Description:
 */
const fs = require('fs');

module.exports = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return;
        const route = require(`./${file}`);
        app.use(route.routes()).use(route.allowedMethods());
    });
};
