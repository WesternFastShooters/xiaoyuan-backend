

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {


  // 按分类和学校ID返回帖子信息 以及推荐展示
// it('should get exists school', async () => {
//     // 创建 ctx
//     const ctx = app.mockContext();
//     const res = await ctx.service.displayService.displayPost({belongToSchoolID:"10259"});
//     console.log(res);
//   });

//展示关注的学校
// it('should get exists school', async () => {
//     // 创建 ctx
//     const ctx = app.mockContext();
//     const res = await ctx.service.displayService.displayAttentionSchool('小红');
//     console.log(res);
//   });


  //展示关注的用户
// it('should get exists school', async () => {
//     // 创建 ctx
//     const ctx = app.mockContext();
//     const res = await ctx.service.displayService.displayAttentionUser('小红');
//     console.log(res);
//   });

  //展示收藏的楼
// it('should get exists school', async () => {
//     // 创建 ctx
//     const ctx = app.mockContext();
//     const res = await ctx.service.displayService.displayCollectedDiscussion('小红');
//     console.log(res);
//   });


//显示收藏的帖子
// it('should get exists school', async () => {
//     // 创建 ctx
//     const ctx = app.mockContext();
//     const res = await ctx.service.displayService.displayCollectedPost('小红');
//     console.log(res);
//   });



  //测试查学校基本信息
  it('should get exists school', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    const res = await ctx.service.displayService.displaySchoolInformation('10259');
    console.log(res);
  });

  //展示工具
  // it('',async()=>{
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.displayService.displayToolList()
  //   console.log(res)
  // })


  //显示用户信息
  // it('',async()=>{
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.displayService.displayUserInformation("1","2")
  //   console.log(res)
  // })

  // 返回帖子
  // it('',async()=>{
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.displayService.displayPost({SchoolID:"1",classification:"1",seenNUM:0})
  //   console.log(res)
  // })

  // 录入合作者信息
  // it('', async () => {
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.userActionService.insertCooperationUnit(
  //     {
  //       CooperationUnitID: 312321,
  //     }
  //   )
  // })

  // 录入招募者信息
  // it('', async () => {
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.userActionService.insertRecruitor(
  //     {
  //       recruitorName: 312321,
  //     }
  //   )
  // })

  //添加用户
  // it('', async () => {
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.userActionService.insertUser(
  //     {
  //       UserName: 312321,
  //     }
  //   )
  // })

  //修改用户信息
  // it('', async () => {
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.userActionService.updateUserInformation(
  //     {
  //       UserID:"1",
  //       UserAvatar:"头像",
  //       UserName:"名字",
  //       sex:"双性人",
  //       birthday:null,
  //       contactWay:[],
  //       introduction:"好耶"
  //     }
  //   )
  // })

  //添加关注的学校
  // it('', async () => {
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.userActionService.updateAttentionSchoolID("1","数组元素")
  //   console.log(res)
  // })

  //认证学校
  // it('', async () => {
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.userActionService.updateBelongToWhich("1","中学")
  // })

  // 展示关注的学校
  // it('', async () => {
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.displayService.displayAttentionSchool("小红")
  //   console.log(res)
  // })

  // it('', async () => {
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.userActionService.updatePostFavour({hostPostID:null,replyPostID:"0"})
  //   console.log(res)
  // })



  //  it('', async () => {
  //   const ctx = app.mockContext();
  //   const res = await ctx.service.userActionService.updateCollectedHostPost("1",2)
  // })


});
