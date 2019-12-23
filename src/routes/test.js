/**
 * Created by busyhe on 2019/12/23.
 * Email: 525118368@qq.com
 * Description:
 */
const Router = require('koa-router');
const router = new Router();
const testController = require('../controller/test');

router.get('/test', testController.create);

module.exports = router;
