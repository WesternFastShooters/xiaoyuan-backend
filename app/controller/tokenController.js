const Controller = require('egg').Controller;
var axios = require('axios')
var NodeRSA = require('node-rsa');

async function request(js_code) {
    let res = await axios({
        timeout: 5000,
        url: "https://api.weixin.qq.com/sns/jscode2session",
        method: "get",
        params: {
            js_code: js_code,
            appid: "wxf982800c0f5738ce",
            secret: "484cb69c2bfc9779fe1a7723c33d3ebe",
            grant_type: "authorization_code"
        }
    })
    return res
}

class tokenController extends Controller {

    async grantVisitorToken() {
        const { ctx, app } = this
        try {
            let res = await request(ctx.request.body.js_code)
            let openid = res.data.openid
            if (openid != null) {
                let token = app.jwt.sign(
                    {
                        openid: openid,
                        certification: "游客"
                    },
                    app.config.jwt.secret,
                    {
                        expiresIn: "24h",
                    }
                )
                ctx.body = {
                    msg: {
                        token: token
                    }
                }
            } else {
                ctx.body = {
                    err_code: 8,
                    err_content: "使用该js_code无法获得openid"
                }
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                err_code: 9,
                err_content: "js_code请求验证异常"
            }
        }
    }

    async grantUserToken() {
        const { ctx, app } = this
        try {
            let res = await request(ctx.request.body.js_code)
            let openid = res.data.openid
            if (openid != null) {
                let user = await ctx.model.User.findOne(
                    { openid: openid },
                    { "_id": 0 },
                    function (err, doc) {
                        if (err) {
                            console.log(err)
                        }
                        console.log(doc)
                    }
                );
                if (user != null) {
                    await ctx.model.User.updateOne(
                        { openid: openid },
                        {
                            $set: {
                                userAvatar: ctx.request.body.userAvatar,
                                userName: ctx.request.body.userName,
                            }
                        }, function (err, doc) {
                            if (err) {
                                console.log(err)
                            }
                            console.log(doc)
                        }
                    )

                    ctx.body = {
                        msg: {
                            token: app.jwt.sign(
                                {
                                    userID: user.userID,
                                    certification: "用户"
                                },
                                app.config.jwt.secret,
                                {
                                    expiresIn: "24h"
                                }
                            ),
                            user: user
                        }
                    }
                } else {
                    console.log("新用户")
                    let userID = (
                        function () {
                            let d = new Date().getTime();
                            let userID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                                let r = (d + Math.random() * 16) % 16 | 0;
                                d = Math.floor(d / 16);
                                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                            });
                            return userID;
                        }
                    )()

                    let user = await ctx.model.User.create({
                        openid: openid,
                        frozen: 0,
                        userID: userID,
                        userAvatar: ctx.request.body.userAvatar,
                        userName: ctx.request.body.userName,
                        sex: " ",
                        contactWay: {
                            contactWayContent:"",
                            scope:"仅自己可见"
                        },
                        belongToSchool: "",
                        introduction: "暂无介绍",
                        attentionSchoolID: [],
                        attentionUserID: [],
                        collectedPostID: [],
                        user_attribute:[],
                        systemMessage: []
                    })
                    console.log(user)
                    //签发token
                    ctx.body = {
                        msg: {
                            token: app.jwt.sign(
                                {
                                    userID: userID,
                                    certification: "用户"
                                },
                                app.config.jwt.secret,
                                {
                                    expiresIn: "24h"
                                }
                            ),
                            user: user
                        }
                    }
                }
            } else {
                ctx.body = {
                    err_code: 8,
                    err_content: "使用该js_code无法获得openid"
                }
            }
        } catch (e) {
            ctx.body = {
                err_code: 9,
                err_content: "js_code请求验证异常"
            }
        }
    }

    async grantAdministratorToken() {
        const { ctx, app } = this
        var { administratorID, administratorPassword } = ctx.request.body
        try{
            const prikey = new NodeRSA(app.config.privateKey, 'pkcs8-private')
            var decrypt_administratorPassword = prikey.decrypt(administratorPassword, 'utf8')
        }catch(e){
            ctx.body = {
                err_code: 14,
                err_content: "密码解析错误"
            }
        }
        console.log(decrypt_administratorPassword)
        var res = await ctx.model.Administrator.findOne(
            {
                administratorID: administratorID,
                administratorPassword: decrypt_administratorPassword 
            }
        )
        if (res != null) {
            let token = app.jwt.sign(
                {
                    administratorID: administratorID,
                    administratorPassword: administratorPassword,
                    certification: "管理员"
                },
                app.config.jwt.secret,
                {
                    expiresIn: '24h'
                }
            )
            ctx.body = {
                msg: {
                    token: token
                }
            }
        } else {
            ctx.body = {
                err_code: 13,
                err_content: "非管理员"
            }
        }
    }
}

module.exports = tokenController