
const axios = require('axios')
const Service = require('egg').Service;

class UserActionService extends Service {

    //修改个人信息
    async updateUserInformation(user_information) {
        try {
            
            var res = await this.ctx.model.User.updateOne(
                { userID: user_information.userID },
                {
                    $set: {
                        userAvatar: user_information.userAvatar,
                        userName: user_information.userName,
                        sex: user_information.sex,
                        birthday: user_information.birthday,
                        contactWay: user_information.contactWay,
                        introduction: user_information.introduction
                    }
                }
            )
            
            if (res.ok == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功修改用户信息"
                }
            } else {
                return {
                    err_code: 0,
                    sus_content: "失败于修改用户信息"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }


    // 用户认证大学
    async updateBelongToSchool(info) {

        var that = this

        function request(config) {
            const instance = axios.create({
                timeout: 5000,
            });
            return instance(config);
        }

        async function SITcertification(code, pwd, userID) {
            var res = await request({
                method: 'post',
                url: 'http://210.35.96.114/report/report/ssoCheckUser',
                data: {
                    code: code,
                    pwd: pwd
                }
            })
            if (res.data.data != false) {
                res = await that.ctx.model.User.updateOne(
                    { "userID": userID },
                    {
                        $set: { "belongToSchool": "上海应用技术大学" }
                    }
                )
                if (res.nModified == 1) {
                    return {
                        sus_code: 1,
                        sus_content: "成功"
                    }
                }
                else {
                    return {
                        err_code: 0,
                        sus_content: "失败"
                    }
                }
            } else {
                return {
                    err_code: 12,
                    err_content: "账号或者密码错误"
                }
            }
        }
        async function foreign_certification(userID,certification) {
            var res = await that.ctx.model.Certification.create(/* info */
                {
                    "userID": userID,
                    "certification": certification
                }
            )
            if (res.userID == userID && certification == info.certification) {
                return {
                    sus_code: 1,
                    sus_content: "成功"
                }
            } else {
                return {
                    err_code: 0,
                    err_content: "失败"
                }
            }
        }
        try {
           
            var student = await this.ctx.model.User.findOne(
                {
                    "userID": info.userID
                },
                {
                    "belongToSchool": 1,
                    "_id": 0
                }
            )
            if(student == null){
                return "查无此人"
            }else{
                if(student.belongToSchool.length != 0){
                    return "已经认证过了"
                }else/* 要进行认证 */{
                    if(info.type == "上海应用技术大学"){
                        return await SITcertification(info.code,info.pwd,info.userID)
                    }else{
                        return await foreign_certification(info.userID,info.certification)
                    }
                }
            }
        } catch (e) {
            console.log(e)
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }
    }

    //关注学校
    async updateAttentionSchoolID({ userID, attentionSchoolID, action }) {
        try {
            var if_exise = await this.ctx.model.User.findOne(
                {
                    userID: userID,
                    attentionSchoolID: attentionSchoolID
                },
                {
                    attentionSchoolID: 1,
                    "_id": 0
                }
            )

            if (if_exise == null) {
                if (action) {
                    var res = await this.ctx.model.User.updateOne(
                        { userID: userID },
                        {
                            $addToSet: { attentionSchoolID: attentionSchoolID }
                        }
                    )
                } else {
                    var res = await this.ctx.model.User.updateOne(
                        { userID: userID },
                        {
                            $pull: { attentionSchoolID: attentionSchoolID }
                        }
                    )
                }

                if (res.nModified == 1) {
                    return {
                        err_code: 1,
                        err_content: "成功关注学校"
                    }
                } else {
                    return {
                        err_code: 0,
                        sus_content: "失败于关注学校"
                    }
                }
            } else {
                return {
                    err_code: 2,
                    err_content: "已经关注"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }
    }


    //关注用户
    async updateAttentionUserID({ userID, attentionUserID, action }) {
        var that = this
        async function isNull(userID, attentionUserID) {
            var res = await that.ctx.model.User.findOne(
                {
                    userID: userID,
                    attentionUserID: attentionUserID
                },
                {
                    attentionUserID: 1,
                    "_id": 0
                }
            )
            if (res == null) {
                return "关注列表还没有要关注的对象"
            } else {
                return "关注列表已经有所关注的对象"
            }
        }
        async function attention(userID, attentionUserID) {
            var res = await that.ctx.model.User.updateOne(
                { userID: userID },
                {
                    $addToSet: { attentionUserID: attentionUserID }
                }
            )
            console.log(res)
            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功"
                }
            } else {
                return {
                    err_code: 0,
                    err_content: "失败"
                }
            }
        }

        async function cancelAttention(userID, attentionUserID) {
            var res = await that.ctx.model.User.updateOne(
                { userID: userID },
                {
                    $pull: { attentionUserID: attentionUserID }
                }
            )
            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功"
                }
            } else {
                return {
                    err_code: 0,
                    err_content: "失败"
                }
            }
        }

        try {

            if (userID == attentionUserID) {
                return {
                    err_code: 77,
                    err_content: "不能关注自己"
                }
            }

            if (action) {
                if (await isNull(userID, attentionUserID) == "关注列表还没有要关注的对象") {
                    return await attention(userID, attentionUserID)
                } else {
                    return {
                        err_code: 2,
                        err_content: "关注过了"
                    }
                }
            } else {
                if(await isNull(userID, attentionUserID) == "关注列表已经有所关注的对象"){
                    return await cancelAttention(userID, attentionUserID)
                }else{
                    return {
                        err_code:0,
                        err_content:"无法取消关注"
                    }
                }
                
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }



    //创建discussion
    async publishDiscussion({ discussion }) {
        try {
            let res = await this.ctx.model.Discussion.create(discussion)
            if (res.discussionContent) {
                return {
                    sus_code: 1,
                    sus_content: "成功创建discussion"
                }
            } else {
                return {
                    err_code: 0,
                    err_content: "失败于创建discussion"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }


    //创建post
    async publishPost({ post, discussionID }) {
        try {
            var res = await this.ctx.model.Discussion.updateOne(
                {
                    "discussionID": discussionID
                },
                {
                    $addToSet: { "discussionContent": post }
                }
            )
            console.log(res)
            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功发布post"
                }
            } else {
                return {
                    err_code: 0,
                    err_content: "失败于发布post"
                }
            }
        } catch (e) {
            console.log(e)
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }
    }

    //创建comment
    async publishComment({ postID, comment }) {
        try {
            var res = await this.ctx.model.Discussion.updateOne(
                { "discussionContent.postID": postID },
                {
                    $addToSet: {
                        "discussionContent.$.comments": comment
                    }
                }
            )
            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功发布comment"
                }
            } else {
                return {
                    err_code: 0,
                    err_content: "失败于发布comment"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }
    }


    //收藏帖子
    async collectedPost({ userID, postID, action }) {
        var that = this
        async function isNull(userID, postID) {
            let res = await that.ctx.model.User.findOne(
                {
                    userID: userID,
                    collectedPostID: postID
                },
                {
                    collectedPostID: 1,
                    "_id": 0
                }
            )
            if (res == null) {
                return true
            } else {
                return false
            }
        }

        async function collect(userID, postID) {
            let res = await that.ctx.model.User.updateOne(
                { userID: userID },
                { $addToSet: { collectedPostID: postID } }
            )
            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功"
                }
            } else {
                return {
                    err_code: 0,
                    err_content: "失败"
                }
            }
        }

        async function cancelCollect(userID, postID) {
            let res = await that.ctx.model.User.updateOne(
                { userID: userID },
                { $pull: { collectedPostID: postID } }
            )
            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功"
                }
            } else {
                return {
                    err_code: 0,
                    err_content: "失败"
                }
            }
        }

        try {

            if (action) {
                if (await isNull(userID, postID)) {
                    return await collect(userID, postID)
                } else {
                    return {
                        err_code: 2,
                        err_content: "已经收藏过了"
                    }
                }
            } else {
                return await cancelCollect(userID, postID)
            }

        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }



    //点赞或者踩帖子

    async favourornor({ userID, targetID, attribute, type }) {
        var that = this

        async function changeNum/* 改变数量 */(action, attribute, targetID, type) {
            console.log("增减：" + action + " " + "态度：" + attribute)
            if (type == "post") {
                //改变帖子的赞数或者踩数
                if (attribute == 1) {
                    let res = await that.ctx.model.Discussion.updateOne(
                        {
                            "discussionContent.postID": targetID
                        }, {
                        $inc: { "discussionContent.$.postFavourNUM": action }
                    }
                    )
                    return res
                } else if (attribute == -1) {
                    let res = await that.ctx.model.Discussion.updateOne(
                        {
                            "discussionContent.postID": targetID
                        }, {
                        $inc: { "discussionContent.$.postDisfavourNum": action }
                    }
                    )
                    return res
                } else { }
            } else {
                //改变店铺的赞数或者踩数
                if (attribute) {
                    let res = await that.ctx.model.School.updateOne(
                        {
                            "consumptions.consumptionID": targetID
                        }, {
                        $inc: { "consumptions.$.consumptionFavourNUM": action }
                    }
                    )
                    return res
                } else {
                    let res = await that.ctx.model.School.updateOne(
                        {
                            "consumptions.consumptionID": targetID
                        }, {
                        $inc: { "consumptions.$.consumptionDisfavourNUM": action }
                    }
                    )
                    return res
                }
            }
        }
        async function if_exisePreviousAttribute/* 检查是否有原来的态度 */(userID, targetID) {
            let res = await that.ctx.model.User.findOne(
                {
                    "userID": userID,
                    "user_attribute.target": targetID
                },
                {
                    "user_attribute.$.attribute": 1
                }
            )
            if (res != null) {
                return res.user_attribute[0].attribute
            } else {
                return null
            }

        }
        async function restore/* 还原 */(userID, targetID, previousAttribute, type) {

            let res = await Promise.all([
                that.ctx.model.User.updateOne(
                    {
                        "userID": userID,
                        "user_attribute.target": targetID
                    },
                    {
                        $pull: {
                            "user_attribute": {
                                "target": targetID
                            }
                        }
                    }
                ), await changeNum(-1, previousAttribute, targetID, type)
            ])
            if (res[0].nModified == 1 && res[1].nModified == 1) {
                return true
            } else {
                return false
            }
        }
        async function give_a_attribute(userID, targetID, attribute, type) {
            let res = await Promise.all([
                //点赞 点踩
                that.ctx.model.User.updateOne(
                    {
                        "userID": userID
                    },
                    {
                        $addToSet: {
                            "user_attribute": {
                                "target": targetID,
                                "attribute": attribute
                            }
                        }
                    }
                ), await changeNum/* 改变数量 */(1, attribute, targetID, type)
            ])
            if (res[0].nModified == 1 && res[1].nModified == 1) {
                return true
            } else {
                return false
            }
        }

        try {
            //先找有没有原来的态度
            var previousAttribute = await if_exisePreviousAttribute(userID, targetID)
            if (previousAttribute != null) {
                if (attribute == previousAttribute) {
                    return {
                        err_code: 2,
                        err_content: "重复操作"
                    }
                } else {
                    if (attribute != 0) {
                        let res_restore = await restore/* 还原 */(userID, targetID, previousAttribute, type)
                        let res_give_a_attribute = await give_a_attribute/* 点赞或者点踩 */(userID, targetID, attribute, type)
                        if (res_restore && res_give_a_attribute) {
                            return {
                                sus_code: 1,
                                sus_content: "成功"
                            }
                        } else {
                            return {
                                err_code: 0,
                                err_content: "失败"
                            }
                        }
                    } else {
                        let res_restore = await restore/* 还原 */(userID, targetID, previousAttribute, type)
                        if (res_restore) {
                            return {
                                sus_code: 1,
                                sus_content: "成功"
                            }
                        } else {
                            return {
                                err_code: 0,
                                err_content: "失败"
                            }
                        }
                    }
                }
            } else {
                let res_give_a_attribute = await give_a_attribute/* 点赞或者点踩 */(userID, targetID, attribute, type)
                if (res_give_a_attribute) {
                    return {
                        sus_code: 1,
                        sus_content: "成功"
                    }
                } else {
                    return {
                        err_code: 0,
                        err_content: "失败"
                    }
                }
            }
        } catch (e) {
            console.log(e)
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }




    // 删除系统发来的消息
    async removeSystemMessage({ userID, messageID }) {
        try {

            var res = await this.ctx.model.User.updateOne(
                { "userID": userID },
                {
                    $pull: {
                        "systemMessage": {
                            "messageID": messageID
                        }
                    }
                }
            )

            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功删除系统消息"
                }
            } else {
                return {
                    err_code: 0,
                    err_content: "失败于删除系统消息"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }


    //录入合作者信息
    async insertCooperationUnit(cooperationUnit) {
        try {
            let res = await this.ctx.model.CooperationUnit.find(
                {
                    $or: [
                        {
                            "cooperationUnitName": cooperationUnit.cooperationUnitName,
                        },
                        {
                            "negotiatorName": cooperationUnit.negotiatorName
                        }
                    ]
                }
            )
            if (!res) {
                let res = await this.ctx.model.CooperationUnit.create(cooperationUnit)
                if (res.cooperationUnitID) {
                    return {
                        sus_code: 1,
                        sus_content: "成功录入合作者信息"
                    }
                } else {
                    return {
                        err_code: 0,
                        err_content: "失败于录入合作者信息"
                    }
                }
            } else {
                return {
                    err_code: 2,
                    err_content: "已经录入合作者信息"
                }
            }
        } catch (err) {
            console.log(err)
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }
    }

    //录入招募者信息
    async insertRecruiter({ recruiter }) {
        try {
            let res = await this.ctx.model.Recruiter.findOne(
                {
                    userID: recruiter.userID
                },
                {
                    userID: 1,
                    "_id": 0
                }
            )

            if (!res) {
                let res = await this.ctx.model.Recruiter.create(recruiter)
                if (res.recruiterID) {
                    return {
                        sus_code: 1,
                        sus_content: "成功录入招募者信息"
                    }
                } else {
                    return {
                        err_code: 0,
                        err_content: "失败于录入招募者信息"
                    }
                }
            } else {
                return {
                    err_code: 2,
                    err_content: "已经录入招募者信息"
                }
            }
        } catch (err) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }
}

module.exports = UserActionService;
