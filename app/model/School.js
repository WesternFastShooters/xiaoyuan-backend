module.exports = app => {
  const mongoose = app.mongoose;
  const SchoolSchema = new mongoose.Schema({
    schoolID: String,
    schoolName: String,
    schoolProperty: String,
    belongToProvince: String,
    schoolPhoneNumber: String,
    officialWebsiteURL: String,
    introduction: String,
    schoolLocation: Array,
    schoolBadgeIMG: String,
    schoolPhotoIMG: Array,
    classification:{
      academy_profession:Array,
      internationalExchanges:Array,
      consumptions:Array
    } 
  },{
    visionKey:false
});
  return mongoose.model('School', SchoolSchema, 'School');
};
