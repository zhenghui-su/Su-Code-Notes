'use strict';

const request = require('request');
const config = require('./config');

exports.handler = (event, context, callback) => {
  if (event.triggerName === 'juejin') {
      request(config.check_url, {
        method: 'post',
        headers: {
          Referer: config.url,
          Cookie: config.cookie
        },
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      });
    callback(null, {
      'statusCode': 200,
      'message': {
        'message': '自动签到成功'
      }
    });
  }
};