const Controller = require('egg').Controller;
const fs = require('fs')
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const path = require('path')

class fileController extends Controller {
    async test() {

        const { ctx } = this;
        try {




        } catch (e) {
            console.log(e)
            ctx.body = {
                err_code: -1,
                err_content: "接口异常"
            }
        }

    }

    async upload() {

        function randomString(length) {
            var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var result = '';
            for (var i = length; i > 0; --i)
                result += str[Math.floor(Math.random() * str.length)];
            return result;
        }

        const { ctx } = this;
        // 文件处理
        try {

            var type = ctx.request.body.type
            if (type != "ipone") {
                const stream = await ctx.getFileStream();
                let file_name = path.basename(stream.filename);
                var save_path;
                console.log(stream)
                if (stream.mimeType.includes("image") == 1) {
                    save_path = "/etc/nginx/xiaoyuan_server/image/user"
                    save_path = path.join(save_path, file_name)
                } else if (stream.mimeType.includes("video") == 1) {
                    save_path = "/etc/nginx/xiaoyuan_server/video/user"
                    save_path = path.join(save_path, file_name)
                } else {
                    save_path = "/etc/nginx/xiaoyuan_server/others/user"
                    save_path = path.join(save_path, file_name)
                }

                var writeStream = fs.createWriteStream(save_path)
                await awaitWriteStream(stream.pipe(writeStream));
                const headers = {
                    'Content-Type': 'text/xml',
                };
                ctx.set(headers);
                
                ctx.body = {
                    sus_code: 1,
                    sus_content: "成功上传",
                    fileURL: "https://www.xiaoyuan3000.com/image/user/" + file_name
                }
            } else {
                var base64_str = ctx.request.body.image
                base64_str = base64_str.replace(/^data:image\/\w+;base64,/, "")
                var buffer = Buffer.from(base64_str, 'base64')
                let file_name = randomString(20) + ".jpg"
                var file = "/etc/nginx/xiaoyuan_server/image/user/" + file_name
                fs.writeFileSync(file, buffer)
               
                ctx.body = {
                    sus_code: 1,
                    sus_content: "成功",
                    fileURL: "https://www.xiaoyuan3000.com/image/user/" + file_name
                }
            }
        } catch (err) {
            console.log(err)
            await sendToWormhole(stream);
            ctx.body = {
                err_code: -1,
                err_content: "接口异常"
            }
        }
    }




}

module.exports = fileController;