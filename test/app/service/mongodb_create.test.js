const { app } = require('egg-mock/bootstrap');

describe('', () => {
    it('should get exists school', async () => {
        const ctx = app.mockContext();
        let user = await ctx.model.User.create({
            openid: "openid",
            frozen: 0,
            userID: "userID",
            userAvatar: "userAvatar",
            userName: "userName",
            sex: " ",
            contactWay: [],
            belongToSchool: " ",
            introduction: "暂无介绍",
            attentionSchoolID: [],
            attentionUserID: [],
            collectedPostID: [],
            collectedDiscussionID: [],
            favourPostID: [],
            disfavourPostID: [],
            favourConsumptionID: [],
            disfavourConsumptionID: [],
            systemMessage: []
          })
        console.log(JSON.stringify(user))
    });
})