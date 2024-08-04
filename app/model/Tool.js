module.exports = app => {
  const mongoose = app.mongoose;
  const ToolSchema = new mongoose.Schema({
    实用工具: Array,
    学习精选: Array,
    兴趣精选: Array,
    优质机构: Array
  }, {
    visionKey: false
  });
  return mongoose.model('Tool', ToolSchema, 'Tool');
};
