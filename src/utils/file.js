/**
 * Created by busyhe on 2019/12/23.
 * Email: 525118368@qq.com
 * Description:
 */

/**
 * 是否是文件夹
 * @param args
 * @returns {boolean}
 */
const path = require('path');
const fs = require('fs');
const is = require('@lvchengbin/is');

exports.isDir = (...args) => {
    const file = path.resolve(...args);
    try {
        const lstat = fs.lstatSync(file);
        return lstat.isDirectory();
    } catch (e) {
        return false;
    }
};

exports.files = (dir, filter) => {
    if (!this.isDir(dir)) {
        throw new Error(`"${dir}" is not a dir`);
    }

    const res = {};
    const list = fs.readdirSync(dir);

    for (const name of list) {

        // skip ., .. and hidden files
        if (name.charAt(0) === '.') continue;

        // skip files start with underscore
        if (name.charAt(0) === '_') continue;

        const ext = path.extname(name);

        // skip files which are not .js file or .json file
        if (['.js', '.json'].indexOf(ext) < 0) continue;

        const fp = path.join(dir, name);

        // skip sub directories
        if (this.isDir(fp)) continue;

        const base = path.basename(name, ext);

        if (is.function(filter) && filter(fp, name, base, ext) === false) continue;

        res[base] = require(fp);
    }
    return res;
};

exports.loadFiles = (dir, filter) => {
    if (!this.isDir(dir)) return false;
    try {
        return this.files(dir, filter);
    } catch (e) {
        throw e;
    }
};
