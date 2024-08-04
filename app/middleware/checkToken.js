
function checkToken() {
    return async function (ctx, next) {
        try{
            // console.log(ctx.request.header.token)
            var decode_token = ctx.app.jwt.verify(ctx.request.header.token, ctx.app.config.jwt.secret)
            if(decode_token.certification == "游客"){
                if(ctx.request.url.includes("display") == 1 ){
                    await next()  
                }else{
                    ctx.body = {
                        msg: {
                          err_code:17,
                          err_content:"无权限"
                        }
                    }
                }
            }
            else if(decode_token.certification == "用户"){
                if(ctx.request.url.includes("user") == 1 || ctx.request.url.includes("display") == 1){
                    ctx.request.body.userID = decode_token.userID
                    await next()
                }else{
                    ctx.body = {
                        msg: {
                          err_code:17,
                          err_content:"无权限"
                        }
                    } 
                }
            }
            else if(decode_token.certification == "管理员"){
                if(ctx.request.url.includes("administrator") == 1 || ctx.request.url.includes("display") == 1){
                    await next()  
                }else{
                    ctx.body = {
                        msg: {
                          err_code:17,
                          err_content:"无权限"
                        }
                    }
                }
            }
            else{
                ctx.body = {
                    msg: {
                      err_code:19,
                      err_content:"无法验证访问权限"
                    }
                }
            }
        }catch(e){
            console.log(e)
            ctx.body = {
                msg: {
                  err_code:20,
                  err_content:"token解析错误"
                }
            }
        }

        
    }
}

module.exports = checkToken