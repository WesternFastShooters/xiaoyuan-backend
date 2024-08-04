module.exports = app => {
  const mongoose = app.mongoose;
  const CooperationUnitSchema = new mongoose.Schema({
    cooperationUnitID:String,
    cooperationUnitName: String,
    cooperationUnitClassification: String,
    negotiatorName: String,
    negotiatorContactWay: Array,
    cooperativePurpose: String,
    officialCooperationTime: Date,
  }, {
    visionKey: false
  });
  return mongoose.model('CooperationUnit', CooperationUnitSchema, 'CooperationUnit');
};
