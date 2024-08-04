const Controller = require('egg').Controller;

class DisplayController extends Controller {

  // 根据学校ID,返回学校基本信息
  async displaySchoolInformation() {
    const { service, ctx } = this
    var msg = await service.displayService.displaySchoolInformation(ctx.request.body)
    ctx.body = {
      msg: msg
    }
  }

  // 返回所有 "工具"
  async displayToolList() {
    const { service, ctx } = this
    var msg = await service.displayService.displayToolList()
    ctx.body = {
      msg: msg
    }
  }

  // 返回用户的信息
  async displayUserInformation() {
    const { service, ctx } = this
    var msg = await service.displayService.displayUserInformation(ctx.request.body)
    ctx.body = {
      msg: msg
    }
  }

  //展示关注的学校
  async displayAttentionSchool() {
    const { service, ctx } = this
    var msg = await service.displayService.displayAttentionSchool(ctx.request.body)
    console.log(msg)
    ctx.body = {
      msg: msg
    }
  }

  //展示关注的用户
  async displayAttentionUser() {
    const { service, ctx } = this
    var msg = await service.displayService.displayAttentionUser(ctx.request.body)
    ctx.body = {
      msg: msg
    }
  }

  //展示我的粉丝
  async displayUserfans(){
    const {service,ctx} = this
    var msg = await service.displayService.displayUserfans(ctx.request.body)
    ctx.body = {
      msg:msg
    }
  }

  //展示指定discussion
  async displayTargetDiscussion(){
    const {service,ctx} = this
    var msg = await service.displayService.displayTargetDiscussion(ctx.request.body)
    ctx.body = {
      msg:msg
    }
  }

  //显示收藏的楼
  async displayCollectedDiscussion() {
    const { service, ctx } = this
    var msg = await service.displayService.displayCollectedDiscussion(ctx.request.body)
    ctx.body = {
      msg: msg
    }
  }

  //展示指定用户的帖子
  async displayTargetUserPost(){
    const { service,ctx} = this
    var msg = await service.displayService.displayTargetUserPost(ctx.request.body)
    ctx.body = {
      msg:msg
    }
  }

  //显示收藏的帖子
  async displayCollectedPost() {
    const { service, ctx } = this
    var msg = await service.displayService.displayCollectedPost(ctx.request.body)
    ctx.body = {
      msg: msg
    }
  }


  //按分类和学校ID返回帖子信息 以及推荐展示
  async displaySchoolDiscussion() {
    const { service, ctx } = this
    var msg = await service.displayService.displaySchoolDiscussion(ctx.request.body)
    ctx.body = {
      msg: msg
    }
  }

  //发现 (折叠discussion)
  async discover(){
    const { service , ctx} = this
    var msg = await service.displayService.dicover(ctx.request.body)
    ctx.body = {
      msg: msg
    }
  }


  //显示系统信息
  async displaySystemMessage() {
    const { service, ctx } = this
    var msg = await service.displayService.displaySystemMessage(ctx.request.body)
    ctx.body = {
      msg: msg
    }
  }

}





module.exports = DisplayController