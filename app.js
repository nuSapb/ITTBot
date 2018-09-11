// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    console.log("#################################################")
    console.log(JSON.stringify(req.body))
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)

})
app.listen(port)

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer kAv4TQLDciligtODSyE0l/rPvWeUsbyS7OtzAkDwM+s1HqsWEegj1mjArt5MN1+gCCtZhYjmdIqz77Oe0Zq6WZh6ionl/G58OItmvf5+B1Ax0aKul3ObS2e3U/a08PhWTPkqqNWco+7KwYHLb9ZcMAdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
                type: 'text',
                text: 'Hello'
            },
            {
                type: 'text',
                text: 'World'
            },
            {
                type: 'text',
                text: 'test bot'
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}