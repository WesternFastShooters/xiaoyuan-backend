module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        openid: String,
        frozen: Number,
        userID: String,
        userAvatar: String,
        userName: String,
        sex: {type:String,default:" "},
        contactWay: {
            contactWayContent:String,
            scope:String
        },
        belongToSchool: {type:String,default:" "},
        introduction: {type:String,default:"暂无介绍"},
        attentionSchoolID: {type:Array,default:[]},//关注的学校
        attentionUserID: {type:Array,default:[]},//关注的用户
        collectedPostID: {type:Array,default:[]},//收藏的帖子
        collectedDiscussionID: {type:Array,default:[]},//收藏的楼
        user_attribute:{type:Array},//点赞点踩帖子和店铺
        systemMessage: {type:Array,default:[]},//系统消息
    }, {
        visionKey: false
    });
    return mongoose.model('User', UserSchema, 'User');
};

