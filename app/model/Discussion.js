module.exports = app => {
    const mongoose = app.mongoose;
    const DiscussionSchema = new mongoose.Schema({
        belongToSchoolID:String,
        belongToClassification:String,
        discussionID:String,
        discussionContent:Array
    }, {
        visionKey: false
    }
    );
    return mongoose.model('Discussion', DiscussionSchema, 'Discussion');
};
