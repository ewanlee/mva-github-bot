var builder = require('botbuilder');
var http = require('http');
var querystring = require('querystring');
var restify = require('restify');
var dotenv = require('dotenv');

// 加载.env中的配置信息，主要是LUIS API接口以及Microsoft App的id
// 以及password信息
dotenv.load();

var ConnectorBot = require('./connector');

// 核心代码只有这一行
var connectorBot = ConnectorBot.start();