module.exports = app => {
    const mongoose = app.mongoose;
    const CertificationSchema = new mongoose.Schema({
        userID:String,
        certification:String
    }, {
      visionKey: false
    });
    return mongoose.model('Certification', CertificationSchema, 'Certification');
  };
  