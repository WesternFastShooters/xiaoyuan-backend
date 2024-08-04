const Controller = require('egg').Controller;
class UserActionController extends Controller {


  

  //修改个人信息
  async updateUserInformation() {
    const { service, ctx } = this
    console.log(ctx.request.body)
    var res = await service.userActionService.updateUserInformation(ctx.request.body)
    ctx.body = {
      msg: res
    }

  }

  // 认证大学
  async updateBelongToSchool() {
    const { service, ctx } = this
    var res = await service.userActionService.updateBelongToSchool(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }


  //关注学校
  async updateAttentionSchoolID() {
    const { service, ctx } = this
    var res = await service.userActionService.updateAttentionSchoolID(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }

  //关注用户
  async updateAttentionUserID() {
    const { service, ctx } = this
    var res = await service.userActionService.updateAttentionUserID(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }



    //创建discussion
    async publishDiscussion() {
      const { service, ctx } = this
      var res = await service.userActionService.publishDiscussion(ctx.request.body)
      ctx.body = {
        msg: res
      }
    }
    
  //创建post
  async publishPost() {
    const { service, ctx } = this
    var res = await service.userActionService.publishPost(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }

    //创建comment
    async publishComment() {
      const { service, ctx } = this
      var res = await service.userActionService.publishComment(ctx.request.body)
      ctx.body = {
        msg: res
      }
    }


   //收藏帖子
   async collectedPost() {
    const { service, ctx } = this
    var res = await service.userActionService.collectedPost(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }

  //点赞或者踩帖子店铺 或者 取消点赞或者踩帖子店铺
  async favourornor() {
    const { service, ctx } = this
    var res = await service.userActionService.favourornor(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }







  // 删除系统发来的消息
  async removeSystemMessage() {
    const { service, ctx } = this
    var res = await service.userActionService.removeSystemMessage(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }


  //录入合作者信息
  async insertCooperationUnit() {
    const { service, ctx } = this
    var res = await service.userActionService.insertCooperationUnit(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }

  //录入招募者信息
  async insertRecruiter() {
    const { service, ctx } = this
    var res = await service.userActionService.insertRecruiter(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }


}

module.exports = UserActionController;
