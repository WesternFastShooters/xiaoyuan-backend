

const Service = require('egg').Service;

class DisplayService extends Service {

    // 根据学校ID,返回学校基本信息
    async displaySchoolInformation({ schoolID, userID } /* 学校ID */) {
        try {
            var res = await this.ctx.model.School.findOne(
                { schoolID: schoolID },
                { _id: 0 },
                function (err, doc) {
                    if (err) {
                        console.log("失败" + err);
                    }
                    console.log("成功 " + doc)
                }
            )

            res = JSON.stringify(res)
            res = JSON.parse(res)


            res.consumptions = this.consumptionOperate(userID, res.classification.consumptions)
            return res;


        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }

    // 返回用户的信息
    async displayUserInformation({ userID,targetUserID }) {
        var that = this
        var strategy = {
            "公开":async function(user_information){
                console.log(user_information)
                return user_information
            },
            "仅自己可见":async function(user_information){
                console.log("仅自己可见")
                delete user_information.contactWay
                console.log("返回数据"+user_information)
                return user_information
            },
            "相互关注才可见":async function(user_information,userID,targetUserID){
                console.log("相互关注才可见")
                console.log("返回数据"+user_information)
                let I_have_attent_targetUser = await that.ctx.model.User.findOne(
                    {
                        "userID":userID,
                        "attentionUserID":targetUserID
                    },
                    {
                        "attentionUserID.$":1
                    }
                )
                
                let targetUser_have_attent_me = await that.ctx.model.User.findOne(
                    {
                        "userID":targetUserID,
                        "attentionUserID":userID
                    },
                    {
                        "attentionUserID.$":1
                    }
                )
                if(I_have_attent_targetUser != null && targetUser_have_attent_me != null){
                    console.log("返回数据"+user_information)
                    return user_information
                }
            }
        }
        try {
            if(userID == targetUserID){
                var user_information = await this.ctx.model.User.findOne(
                    {
                        "userID":targetUserID
                    },
                    {
                        "_id":0,
                        "__v":0
                    }
                )
                if(user_information == null){
                    return {
                        err_content:"无法查询到该对象"
                    }
                }else{
                    return user_information
                }
            }else{
                var user_information = await this.ctx.model.User.findOne(
                    { "userID": targetUserID },
                    {
                        "belongToSchool":1,
                        "introduction":1,
                        "sex":1,
                        "userID":1,
                        "userAvatar":1,
                        "userName":1,
                        "contactWay":1,
                        "frozen":1
                    }
                )
                if(user_information == null){
                    return {
                        err_content:"无法查询到该对象"
                    }
                }else{
                    switch(user_information.contactWay.scope){
                        case "公开":
                            user_information = await strategy["公开"](user_information);
                            break;
                        case "仅自己可见":
                            user_information =  await strategy["仅自己可见"](user_information);
                            break;
                        case "相互关注才可见":
                            user_information = await strategy["相互关注才可见"](user_information,userID,targetUserID);
                            break;
                        default:
                            break;
                    }
                    return user_information
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

    //展示指定用户所关注的学校
    async displayAttentionSchool({ targetUserID }) {
        try {
            var attentionSchools = await this.ctx.model.User.aggregate(
                [
                    { $match: { "userID": targetUserID } },
                    { $unwind: "$attentionSchoolID" },
                    {
                        $lookup: {
                            from: "School",
                            localField: "attentionSchoolID",
                            foreignField: "schoolID",
                            as: "attentionSchool"
                        }
                    },
                    {
                        $project: {
                            "attentionSchool": {
                                "schoolID": 1,
                                "schoolName": 1,
                                "schoolBadgeIMG": 1
                            },
                        }
                    }
                ]
            )
            let attentionSchool_list = []
            for (var i = 0; i < attentionSchools.length; i++) {
                attentionSchool_list[i] = attentionSchools[i].attentionSchool[0]
            }
            if (attentionSchool_list.length == 0) {
                return {
                    err_code: 6,
                    err_content: "暂无数据"
                }
            }
            return attentionSchool_list
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }

    //展示指定用户所关注的用户
    async displayAttentionUser({ targetUserID }) {
        try {
            var attentionUsers = await this.ctx.model.User.aggregate(
                [
                    { $match: { "userID": targetUserID } },
                    { $unwind: "$attentionUserID" },
                    {
                        $lookup: {
                            from: "User",
                            localField: "attentionUserID",
                            foreignField: "userID",
                            as: "attentionUser"
                        }
                    },
                    {
                        $project: {
                            "attentionUser": {
                                "userID": 1,
                                "userAvatar": 1,
                                "userName": 1
                            },
                            '_id': 0
                        }
                    }
                ]
            )
           
            for (var i = 0; i < attentionUsers.length; i++) {
                if (attentionUsers[i].attentionUser.length == 0) {
                    attentionUsers.splice(i, 1)
                    i = i - 1
                }
            }
            if (attentionUsers.length == 0) {
                return {
                    err_code: 6,
                    err_content: "暂无数据"
                }
            }

            var attentionUser_list = attentionUsers.map(
                function (item) {
                    var item_ = (item.attentionUser[0])
                    return item_
                }
            )
            return attentionUser_list
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }

    //查看我的粉丝（关注我的人）   
    async displayUserfans({ targetUserID }) {
        try {
            var myfans = await this.ctx.model.User.find(
                {
                    "attentionUserID": targetUserID
                },
                {
                    "userID": 1,
                    "userAvatar": 1,
                    "userName": 1,
                    "_id": 0
                }
            )
            if (myfans.length != 0) {
                console.log(myfans)
                return myfans
            } else {
                return {
                    err_code: 6,
                    err_content: "暂无数据"
                }
            }
        } catch (e) {
            console.log(e)
            return {
                err_code: -1,
                err_content: "接口异常"
            }
        }
    }

    //对帖子操作 (在点赞 收藏方面上)
    async discussionOperate(userID, discussionContent) {
        for (let i = 0; i < discussionContent.length; i++) {
            var res = await this.ctx.model.User.findOne(
                {
                    "userID": userID,
                    "user_attribute.target": discussionContent[i].postID
                },
                {
                    "user_attribute.$": 1,
                    "_id": 0
                }
            )

            res = JSON.stringify(res)
            res = JSON.parse(res)


            if (res != null) {
                discussionContent[i].user_attribute = res.user_attribute[0].attribute /* 1 赞 -1 踩 */
            } else {
                discussionContent[i].user_attribute = 0
            }

            let collected = await this.ctx.model.User.findOne(
                {
                    "userID": userID,
                    "collectedPostID": discussionContent[i].postID
                },
                {
                    "collectedPostID.$": 1
                }
            )
            if (collected != null) {
                discussionContent[i].collected = 1
            } else {
                discussionContent[i].collected = 0
            }
        }
        return discussionContent
    }

    //对商铺操作
    async consumptionOperate(userID, consumptions) {
        for (let i = 0; i < consumptions.length; i++) {
            var res = await this.ctx.model.User.findOne(
                {
                    "userID": userID,
                    "user_attribute.target": consumptions[i].consumptionID
                },
                {
                    "user_attribute.$": 1,
                    "_id": 0
                }
            )
            res = JSON.stringify(res)
            res = JSON.parse(res)

            if (res != null) {
                consumptions[i].user_attribute = res.user_attribute[0].attribute /* 1 赞 -1 踩 */
            } else {
                consumptions[i].user_attribute = 0
            }
        }
    }

    //查看指定discussion
    async displayTargetDiscussion({ targetDiscussionID, userID }) {
        try {
            var res = await this.ctx.model.Discussion.findOne(
                {
                    "discussionID": targetDiscussionID
                },
                {
                    "_id": 0
                }
            )
            if (userID != null) {
                res.discussionContent = await this.discussionOperate(userID, res.discussionContent)
                return res
            } else {
                return res
            }

        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }

    //"发现" （折叠discussion）
    async dicover({ discussion_max_id, discussion_min_id, userID }) {
        try {
            if (discussion_max_id == 0 && discussion_min_id == 0) {
                let discussion_list = await this.ctx.model.Discussion.find(
                    {},
                    {
                        "discussionContent": { $slice: 1 }
                    }/* ,
                    function (err, doc) {
                        if (err) {
                            console.log(err)
                        }
                        console.log(doc)
                    } */
                ).sort({ "_id": -1 }).limit(20)
                if (discussion_list.length != 0) {
                    for (let i = 0; i < discussion_list.length; i++) {
                        discussion_list[i] = await this.discussionOperate(userID, discussion_list[i])
                    }
                    console.log("最晚是：     "+discussion_list[0]._id + "    "+"最早是     "+discussion_list[discussion_list.length - 1]._id)
                    return {
                        discussion_list: discussion_list,
                        discussion_max_id: discussion_list[0]._id,
                        discussion_min_id: discussion_list[discussion_list.length - 1]._id
                    }

                } else {
                    return {
                        err_code: 6,
                        err_content: "暂无数据"
                    }
                }
            } else if (discussion_max_id != 0 && discussion_min_id != 0) {
                let discussion_list = await this.ctx.model.Discussion.find(
                    {
                        $or: [
                            {
                                "_id": { $lt: discussion_min_id }
                            },
                            {
                                "_id": { $gt: discussion_max_id }
                            }
                        ],
                    },
                    {
                        "discussionContent": { $slice: 1 }
                    }
                   /*  , function (err, doc) {
                        if (err) {
                            console.log(err)
                        }
                        console.log(doc)
                    } */
                ).sort({ "_id": -1 }).limit(20)
                if (discussion_list.length != 0) {
                    for (let i = 0; i < discussion_list.length; i++) {
                        discussion_list[i] = await this.discussionOperate(userID, discussion_list[i])
                    }
                    return {
                        discussion_list: discussion_list,
                        discussion_max_id: ( discussion_list[0]._id > discussion_max_id?discussion_list[0]._id : discussion_max_id ),
                        discussion_min_id: ( discussion_list[discussion_list.length - 1]._id<discussion_min_id ? discussion_list[discussion_list.length - 1]._id : discussion_min_id )
                    }
                } else {
                    return {
                        err_code: 6,
                        err_content: "暂无数据"
                    }
                }
            } else {
                return {
                    err_code: 33,
                    err_content: "参数有误"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }
    }

    //按分类和学校ID返回discussion
    async displaySchoolDiscussion({ belongToSchoolID, belongToClassification, discussion_max_id, discussion_min_id, userID }) {
        try {
            if (discussion_max_id == 0 && discussion_min_id == 0) {
                let discussion_list = await this.ctx.model.Discussion.find(
                    {
                        "belongToSchoolID": belongToSchoolID,
                        "belongToClassification": belongToClassification,
                    }, {
                    "discussionContent": { $slice: 1 }
                }, function (err, doc) {
                    if (err) {
                        console.log(err)
                    }
                    console.log(doc)
                }
                ).sort({ "_id": -1 }).limit(20)
                if (discussion_list.length != 0) {
                    for (let i = 0; i < discussion_list.length; i++) {
                        discussion_list[i] = await this.discussionOperate(userID, discussion_list[i])
                    }

                    return {
                        discussion_list: discussion_list,
                        discussion_max_id: discussion_list[0]._id,
                        discussion_min_id: discussion_list[discussion_list.length - 1]._id
                    }
                } else {
                    return {
                        err_code: 6,
                        err_content: "暂无数据"
                    }
                }
            } else if (discussion_max_id != 0 && discussion_min_id != 0) {
                let discussion_list = await this.ctx.model.Discussion.find(
                    {
                        "belongToSchoolID": belongToSchoolID,
                        "belongToClassification": belongToClassification,
                        $or: [
                            {
                                "_id": { $lt: discussion_min_id }
                            },
                            {
                                "_id": { $gt: discussion_max_id }
                            }
                        ]
                    },
                    {
                        "discussionContent": { $slice: 1 }
                    }, function (err, doc) {
                        if (err) {
                            console.log(err)
                        }
                        console.log(doc)
                    }
                ).sort({ "_id": -1 }).limit(20)
                if (discussion_list.length != 0) {
                    for (let i = 0; i < discussion_list.length; i++) {
                        discussion_list[i] = await this.discussionOperate(userID, discussion_list[i])
                    }

                    return {
                        discussion_list: discussion_list,
                        discussion_max_id: ( discussion_list[0]._id > discussion_max_id?discussion_list[0]._id : discussion_max_id ),
                        discussion_min_id: ( discussion_list[discussion_list.length - 1]._id<discussion_min_id ? discussion_list[discussion_list.length - 1]._id : discussion_min_id )
                    }
                } else {
                    return {
                        err_code: 6,
                        err_content: "暂无数据"
                    }
                }
            } else {
                return {
                    err_code: 33,
                    err_content: "参数有误"
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

    //查看指定用户的帖子
    async displayTargetUserPost({ targetUserID, anchor }) {
        try {
            var res = await this.ctx.model.Discussion.find(
                {
                    "discussionContent.postUserID": targetUserID
                }
            ).skip(anchor).sort({ "post_publishTime": -1 }).limit(10)
            if (res != null) {
                var discussionList = []
                for (let i = 0; i < res.length; i++) {
                    
                    var mainPost = []
                    var ownPost = []
                    var discussion = {
                        discussionContent:[],
                        discussionID:null,
                        belongToSchoolID:null,
                        belongToClassification:null
                    }

                    for (let j = 0; j < res[i].discussionContent.length; j++) {
                        if (j != 1 && res[i].discussionContent[j].postUserID == targetUserID) {
                            ownPost.push(res[i].discussionContent[j])
                        }
                    }
                    if (ownPost.length > 0) {
                        discussion.discussionID = res[i].discussionID
                        discussion.belongToClassification=res[i].belongToClassification
                        discussion.belongToSchoolID = res[i].belongToSchoolID

                        mainPost.push(res[i].discussionContent[0]) 
                        mainPost.concat(ownPost)
                        discussion.discussionContent=mainPost

                        discussionList.push(discussion)


                    }
                }
                return {
                    targetUserPosts:discussionList,
                    anchor:anchor+10
                }
            } else {
                return {
                    err_code: 6,
                    err_content: "暂无数据"
                }
            }

        } catch (e) {
            console.log(e)
            return {
                err_code: -1,
                err_content: "接口异常"
            }
        }
    }

    //显示指定对象所收藏的帖子
    async displayCollectedPost({ targetUserID, anchor }) {
        try {
            var collectedDiscussionList = await this.ctx.model.User.aggregate(
                [
                    { $match: { userID: targetUserID } },
                    { $unwind: "$collectedPostID" },
                    {
                        $lookup: {
                            from: "Discussion",
                            localField: "collectedPostID",
                            foreignField: "discussionContent.postID",
                            as: "collectedDiscussion"
                        }
                    },
                    {
                        $project: {
                            "collectedPostID": 1,
                            "collectedDiscussion": 1,
                            "_id": 0
                        }
                    }
                ]
            ).skip(anchor).sort({ "post_publishTime": -1 }).limit(10)
            if (collectedDiscussionList.length != 0) {

                var collectedDiscussions = []

                for(let i = 0; i < collectedDiscussionList.length; i++){

                    var collectedDiscussionUnit = {
                        discussionID:null,
                        belongToSchoolID:null,
                        belongToClassification:null,
                        discussionContent:[]
                    } 

                    var collectedMainPost=[]
                    var collectedaffiliatedPost = []

                    collectedDiscussionUnit.discussionID = collectedDiscussionList[i].collectedDiscussion[0].discussionID
                    collectedDiscussionUnit.belongToClassification = collectedDiscussionList[i].collectedDiscussion[0].belongToClassification
                    collectedDiscussionUnit.belongToSchoolID = collectedDiscussionList[i].collectedDiscussion[0].belongToSchoolID

                    collectedMainPost.push(collectedDiscussionList[i].collectedDiscussion[0].discussionContent[0])
                    for(let j = 1 ; j<collectedDiscussionList[i].collectedDiscussion[0].discussionContent.length;j++){
                        if(collectedDiscussionList[i].collectedDiscussion[0].discussionContent[j].postID == collectedDiscussionList[i].collectedPostID){
                            collectedaffiliatedPost.push(collectedDiscussionList[i].collectedDiscussion[0].discussionContent[j])
                        }
                    }
                    collectedMainPost.concat(collectedaffiliatedPost)
                    collectedDiscussionUnit.discussionContent = collectedMainPost

                    collectedDiscussions.push(collectedDiscussionUnit)

                }

                return {
                    collectedDiscussionList: collectedDiscussions,
                    anchor: anchor + 10
                }
            } else {
                return {
                    err_code: 6,
                    err_content: "暂无数据"
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


    //显示系统消息
    async displaySystemMessage({ userID }) {
        try {
            let systemMessageList = await this.ctx.model.User.findOne(
                { "userID": userID },
                { "systemMessage": 1, "_id": 0 }
            )
            if (systemMessageList.length == 0) {
                return {
                    err_code: 6,
                    err_content: "暂无数据"
                }
            }
            return systemMessageList
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }


    // 返回所有 "工具"
    async displayToolList() {
        try {
            let res = await this.ctx.model.Tool.find(
                {},
                { "_id": 0 }
            )
            if (res.length != 0) {
                return res
            } else {
                return {
                    err_code: 6,
                    err_content: "暂无数据"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }
    }



}

module.exports = DisplayService;
