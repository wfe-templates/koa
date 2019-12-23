/**
 * Created by busyhe on 2019/12/23.
 * Email: 525118368@qq.com
 * Description:
 */
class Test {
    async create(ctx) {
        console.log(ctx.config('default'));
        ctx.body = '123';
    }
}

module.exports = new Test();
