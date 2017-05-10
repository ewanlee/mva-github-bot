var builder = require('botbuilder');
var restify = require('restify');
var dialog = require('./dialog');
var prompts = require('./prompts');

module.exports = {
    start: function() {
        // 服务器初始化
        var server = restify.createServer();
        server.listen(process.env.port || process.env.PORT || 3978, function() {
            console.log('listening');
        })

        // Connector初始化
        var connector = new builder.ChatConnector({
            // appId: process.env.MICROSOFT_APP_ID,
            // appPassword: process.env.MICROSOFT_APP_PASSWORD,
        });

        // bot 初始化
        var bot = new builder.UniversalBot(connector);

        server.use(restify.queryParser());

        server.post('/api/messages', connector.listen());

        server.get('/oauth', (req, res, next) => {
            res.send(200, 'Paste this code into the bot: ' + req.query.code);
        });
        
        bot.dialog('/', dialog);
    }
}