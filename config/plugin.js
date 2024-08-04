

/** @type Egg.EggPlugin */
module.exports = {
  static: {
    enable: true,
    package: 'egg-mongoose',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  axios:{
    enable:true,
    package:'axios'
  },
'node-rsa':{
    enable:true,
    package:'node-rsa'
  }
};
