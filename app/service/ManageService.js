

const Service = require('egg').Service;

class ManageService extends Service {


    async authorizeUserBelongToSchool({userID,belongToSchool}){
        try{
            var res = await this.ctx.model.User.updateOne(
                {
                    "userID":userID
                },
                {
                    "belongToSchool":belongToSchool
                }
            )
            if(res.nModified == 1){
                return {
                    sus_code:1,
                    sus_content:"成功"
                }
            }else{
                return {
                    err_code:0,
                    err_content:"失败"
                }
            }
        }catch(e){
            return {
                err_code:-1,
                err_content:"接口异常"
            }
        }
    }

    //查看待认证用户
    async findUserNeedAuthorization(){
        try{
            var res = await this.ctx.model.Certification.find(
                {},
                {
                    "_id":0
                }
            )
            if(res.length != null){
                return res
            }else {
                return {
                    err_code:6,
                    err_content:"暂无数据"
                }
            }
        }catch(e){
            return {
                err_code:-1,
                err_content:"接口异常"
            }
        }
    }

    //给用户发送系统消息
    async sendMessageToUser({ targetUserID, message }) {
        try {
            let res = await this.ctx.model.User.updateOne(
                { "userID": targetUserID },
                {
                    $push: {
                        "systemMessage": message
                    }
                },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                    }
                    console.log(doc)
                }
            )
            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功给用户发送系统消息"
                }
            } else {
                return {
                    err_code: 0,
                    err_content: "失败于给用户发送系统消息"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }
    }

    //将用户拉入黑名单
    async freezeUser({ targetUserID, option }) {
        try {
            let res;
            await this.ctx.model.User.updateOne(
                { userID: targetUserID },
                {
                    $set: {
                        frozen: option
                    }
                },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                        res = err
                    }
                    console.log(doc)
                    res = doc
                }
            )
            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功将用户拉入黑名单"
                }
            }
            else if (res.nModified == 0) {
                return {
                    err_code: 2,
                    err_content: "已经将用户拉入黑名单"
                }
            }
            else {
                return {
                    err_code: 0,
                    err_content: "失败于将用户拉入黑名单"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }

    }

    //删除discussion、post、comment
    async deleteVoice({ targetID,option }) {
        try {
            switch (option) {
                case "discussion": {
                    let res;
                    await this.ctx.model.Discussion.deleteOne(
                        { discussionID: targetID },
                        function (err, doc) {
                            if (err) {
                                console.log(err)
                                res = err
                            }
                            console.log(doc)
                            res = doc
                        }
                    )
                    if (res.nModified == 1) {
                        return {
                            sus_code: 1,
                            sus_content: "成功删除对象"
                        }
                    }
                    else if (res.nModified == 0) {
                        return {
                            err_code: 2,
                            err_content: "已经删除对象"
                        }
                    }
                    else {
                        return {
                            err_code: 0,
                            err_content: "失败于删除对象"
                        }
                    }
                }
                case "post": {
                    let res;
                    await this.ctx.model.Discussion.updateOne(
                        { "discussionContent.postID": targetID },
                        { $pull: { "discussionContent": { "postID": targetID } } },
                        function (err, doc) {
                            if (err) {
                                console.log(err)
                                res = err
                            }
                            console.log(doc)
                            res = doc
                        }
                    )
                    if (res.nModified == 1) {
                        return {
                            sus_code: 1,
                            sus_content: "成功删除对象"
                        }
                    }
                    else if (res.nModified == 0) {
                        return {
                            err_code: 2,
                            err_content: "已经删除对象"
                        }
                    }
                    else {
                        return {
                            err_code: 0,
                            err_content: "失败于删除对象"
                        }
                    }
                }
                case "comment": {
                    let res;
                    await this.ctx.model.Discussion.updateOne(
                        { "discussionContent.comments.commentID": targetID },
                        {
                            $pull: {
                                "discussionContent.$[].comments": {
                                    "commentID": targetID
                                }
                            }
                        },
                        function (err, doc) {
                            if (err) {
                                console.log(err)
                                res = err
                            }
                            console.log(doc)
                            res = doc
                        }
                    )
                    if (res.nModified == 1) {
                        return {
                            sus_code: 1,
                            sus_content: "成功删除对象"
                        }
                    }
                    else if (res.nModified == 0) {
                        return {
                            err_code: 2,
                            err_content: "已经删除对象"
                        }
                    }
                    else {
                        return {
                            err_code: 0,
                            err_content: "失败于删除对象"
                        }
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


    //查看所有合作者
    async displayAllCooperationUnit() {
        try {
            let res = await this.ctx.model.CooperationUnit.find(
                {},
                { "_id": 0 },
                function (err, doc) {
                    if (err, doc) {
                        console.log(err)
                    }
                    console.log(doc)
                }
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

    //删除合作者
    async deleteCooperationUnit({ cooperationUnitID }) {
        try {
            let res;
            await this.ctx.model.CooperationUnit.deleteOne(
                { cooperationUnitID: cooperationUnitID },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                        res = err
                    }
                    console.log(doc)
                    res = doc
                }
            )
            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功删除合作者"
                }
            }
            else if (res.nModified == 0) {
                return {
                    err_code: 2,
                    err_content: "已经删除合作者"
                }
            }
            else {
                return {
                    err_code: 0,
                    err_content: "失败于删除合作者"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }
    }

    //查看所有招募者
    async displayAllRecruiter() {
        try {
            let res = await this.ctx.model.Recruiter.find(
                {},
                { "_id": 0 },
                function (err, doc) {
                    if (err, doc) {
                        console.log(err)
                    }
                    console.log(doc)
                }
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

    //删除招募者
    async deleteRecruiter({ recruiterID,option }) {
        try {
            let res;
            await this.ctx.model.Recruiter.deleteOne(
                { recruiterID: recruiterID },
                function (err, doc) {
                    if (err) {
                        res = err
                        console.log(err)
                    }
                    res = doc
                    console.log(doc)
                }
            )
            if (res.nModified == 1) {
                return {
                    sus_code: 1,
                    sus_content: "成功删除招募者"
                }
            }
            else if (res.nModified == 0) {
                return {
                    err_code: 2,
                    err_content: "已经删除招募者"
                }
            }
            else {
                return {
                    err_code: 0,
                    err_content: "失败于删除招募者"
                }
            }
        } catch (e) {
            return {
                err_code: -1,
                err_content: "该接口异常"
            }
        }
    }



    async qualifyRecruiter({recruiterID}){
        try{
            var res = await this.ctx.model.updateOne(
                {
                    "recruiterID":recruiterID
                },
                {
                    $set:{
                        "qualified":option
                    }
                }
            )
            if(res.nModified == 1){
                return {
                    sus_code:1,
                    sus_content:"成功"
                }
            }else {
                return {
                    err_code:0,
                    err_content:"失败"
                }
            }
        }catch(e){
            return {
                err_code:-1,
                err_content:"该接口异常"
            }
        }
        
    }




}

module.exports = ManageService;
