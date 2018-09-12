// Reply with two static messages

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const router = new Router()
const app = new Koa()
const port = process.env.PORT || 4000


router.post('/webhook', (ctx) => {
    console.log("#################################################")
    ctx.req.body
    reply(reply_token)
    ctx.status(200)

})



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

    router.get("/ping", ctx => {
        console.log("object");
        ctx.body = 'ping'
    });

    router.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (ctx) => {
        console.log('status = ' + ctx.status);
    });
}

app.use(router.routes())
app.listen(port, () => {
    console.log('server start on port %s', port);
})