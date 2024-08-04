/* eslint valid-jsdoc: "off" */


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cluster = {
		listen: {
			hostname: '0.0.0.0' // 也就是 "localhost" 
		}
	}

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  exports.multipart = {
    mode: 'stream',
    fileSize:'1024mb'
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1617062353863_6695';
  config.jwt = {
    secret: 'wxnlylcx_jwt',	// 自定义token的加密条件字符串，可按各自的需求填写
    
  };
  // add your middleware config here
  config.middleware = [];

  config.privateKey = `-----BEGIN PRIVATE KEY-----
  MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDoMTNaQx6CaoSt
  dmi9ap90p/e3AO5hnAT6z634TnyeJ2v96oEWT1J8et3kLB84V7IMd2yIlE2Eu4VB
  xi8KCUZIF97w9bH4FKFp72KnAPA2MFAB5MihzBqAVQHynCRs7VIWR+GZYAHT0aAO
  fh/GW1HvOwxMv+VfIVaMljtKV1G+b1ZBjbON6JQ7DAGjuSiIqV/Oe/FRaSP6GeAb
  2VIgKTDzT2gXth+TXmIK0J2P0vBo/zgrcq0buC9yl+Nz8oKaPe+si4T4Xzlm3uTm
  /gjXRc6qyOt/SscA5U+yvk7n07yeCSf5YvStUuUMsyDzS/XuAdx9QnQ9Al2fmZ6s
  gfMhxkITAgMBAAECggEBALu9PGZZKswMUGbo/Nta4L80KMjhid2Gh0g8r8+7tmsy
  ONE/0Uw2qt1Xgx5AxqWJ0r7duPXd46fU73Q1SEd3JEqacnqmTlXmaHT9R+j8iz1l
  ZuuBDvAz1aG6Gi8OLS2d3eeCC1k2FYQtVJsjQ5HguKkUN2e/KTj3/cECn8IGRGQS
  myfzJfEQBrzatfBrZA8CpT/p6dk1iUvgOJTImMp1EWkP6Zq3TNi/Tvhng+ITYDZF
  kxWgOcHkJq/oKCPAz09n7t4/oG7O/k+j+QpzZxpmDkT3Grd5mc+JtgkcD6lrV6ta
  OGaw37WTs/z1gyVg/cT02q5ZImXy9vli9nFy9+2bXEECgYEA/sqMCv4Ej2t8lR4v
  iLQm6/aE/SEd6uLPtNmhqYXagHoy/alih9J9+q0NlE/DSrdKt4JzG89poxIaGNHk
  1BRCuApB4JpxkizV9B1RvN5xnPWIsqrtnVINtDX9gtnsspjUA8F2VZvBwKrYKn4Y
  +p/SOp9Q9AugZho0o4rSo3N4OvECgYEA6Us0zQ4go/FmYnyfZBY4A3+eF30o3J3s
  1u6JfWXhhsU5MjuJorXLFKZIs5265hDA0LmZ7xG0vh4eHb9pi3fFmbbMUe1KBzLC
  BsHw7fWxVuIbF3kLgFjwGmV3fHqbaGgyhjLME79G3vJMR88pyZCNfh7kwLFIyGCj
  xsUnGzFqJUMCgYAUgwHbMK/1S9Xvu0pgWwB3JpV2O2BJNJE8IfkdyKTaivvn5+cC
  wDNcJupc8j7qmO7u7xWNO5lpg1+Od/dQC4GDh2/eQRC7j9h5mpKl/dJvrGSg3Znb
  fGuWAnKyQhEIH72Rv9Vi9vMWK6rTYOtp4cvu5DyEKRt0nM94CwkCF52qQQKBgQDT
  xKLfaG2Uo/KOgBWnosuh0VxOchx/dxOgXtOLcsnvrmOnB4h+nIsF6ZOhCBK5+Icu
  cOwcqXPqCCjKVBCYu1YxnE+IJt/F/PtHaxEq0JX0CjcRbZ1VGmaJb4WxBxK/Caaj
  TsUVP9IzWrqHjLOf9omZ7K01hThOO/su2ZQQCSETRQKBgGeYwAjHPcen+LUaB1LN
  2XKS3qu4xyAzlz4DoweNgt1HJ143NNzp89fpVV2yTNx8Q7ON4C5qaKNTFgadwS4y
  kCSNp/g6OJRFeUyB4EzB6TcgbmNwBLf+KeLsp0bDxx+cS+lf4DIgh95omqnilq88
  hyy3YSHz5sLTDNo3N7OBwfij
  -----END PRIVATE KEY-----
  `

  config.mongoose = {
    url: 'mongodb://whfzgyx:ilikexiaoyuan999@127.0.0.1:27017/xiaoyuan',
    option: {
      useUnifiedTopology: true,
      useCreateIndex: true
    },
  };



  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
