module.exports = app => {
    const mongoose = app.mongoose;
    const RecruiterSchema = new mongoose.Schema({
        userID:String,
        recruiterID:String,
        recruiterName: String,
        contactWay: Array,
        province: String,
        GaoZhongName: String,
        GAOKAOscore: String,
        GAOKAOscoreIMG: String,
        GAOKAOscoreRANK: String
    }, {
        visionKey: false
    });
    return mongoose.model('Recruiter',RecruiterSchema, 'Recruiter');
};
