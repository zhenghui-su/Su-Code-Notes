import schedule from 'node-schedule'
import request from 'request'
import config from './config.js'
schedule.scheduleJob('* * * * * *', () => {
    request(config.check_url, {
        method: 'post',
        headers: {
            Referer: config.url,
            Cookie: config.cookie
        },
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    })
})