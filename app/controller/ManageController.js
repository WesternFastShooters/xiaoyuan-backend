const Controller = require('egg').Controller;
class ManageController extends Controller {
  
  //给用户授权学校
  async authorizeUserBelongToSchool(){
    const {service , ctx } = this
    var res = await service.manageService.authorizeUserBelongToSchool(ctx.request.body)
    ctx.body = {
      msg:res
    }
  }


  //查看待认证的用户
  async findUserNeedAuthorization(){
    const {service , ctx } = this
    var res = await service.manageService.findUserNeedAuthorization(ctx.request.body)
    ctx.body = {
      msg: res 
    }
  }

  

  //给用户发送系统消息
  async sendMessageToUser() {
    const { service, ctx } = this
    var res = await service.manageService.sendMessageToUser(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }

  //将用户拉入黑名单
  async freezeUser() {
    const { service, ctx } = this
    var res = await service.manageService.freezeUser(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }

  //删除discussion、post、comment
  async deleteVoice() {
    const { service, ctx } = this
    var res = await service.manageService.deleteVoice(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }


  //查看所有合作者
  async displayAllCooperationUnit() {
    const { service, ctx } = this
    let res = await service.manageService.displayAllCooperationUnit()
    ctx.body = {
      msg: res
    }
  }

  //删除合作者
  async deleteCooperationUnit() {
    const { service, ctx } = this
    let res = await service.manageService.deleteCooperationUnit(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }

  //查看所有招募者
  async displayAllRecruiter() {
    const { service, ctx } = this
    let res = await service.manageService.displayAllRecruiter()
    ctx.body = {
      msg: res
    }
  }

  //删除招募者
  async deleteRecruiter() {
    const { service, ctx } = this
    var res = await service.manageService.deleteRecruiter(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }

  async qualifyRecruiter(){
    const { service, ctx } = this
    var res = await service.manageService.qualifyRecruiter(ctx.request.body)
    ctx.body = {
      msg: res
    }
  }

}

module.exports = ManageController