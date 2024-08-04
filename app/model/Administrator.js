module.exports = app => {
    const mongoose = app.mongoose;
    const AdministratorSchema = new mongoose.Schema({
      administratorID:String,
      administratorPassword:String
    }, {
      visionKey: false
    });
    return mongoose.model('Administrator', AdministratorSchema, 'Administrator');
  };
  