const TelegramBot = require('node-telegram-bot-api');
const token = '778380485:AAG2l0PSSdWpeXKWJ2rrppcEVU9Fp5BslQc';
const bot = new TelegramBot(token, {polling: true});
var parseModule = require('./parse');
var urlUSD = "https://finance.i.ua/market/kiev/usd/?type=2";
var urlEUR = "https://finance.i.ua/market/kiev/eur/?type=2";
var urlRUB = "https://finance.i.ua/market/kiev/rub/?type=2";
var url = urlUSD;
const fs = require("fs");


bot.onText(/\/curse/, (msg, match) => {

const chatId = msg.chat.id;

bot.sendMessage(chatId, 'Выберите какой курс вас интересует', {
 reply_markup: {
   inline_keyboard: [
     [
       {
         text: 'Продажа',
         callback_data: 'SOLD'
       }, {
         text: 'Покупка',
         callback_data: 'BUY'
       }
     ]
   ]
 }
});

if (query.data = 'SOLD'){

  bot.sendMessage(chatId, 'Выберите какая валюта вас интересует', {
   reply_markup: {
     inline_keyboard: [
       [
         {
           text: '€ - EUR',
           callback_data: 'EUR'
         }, {
           text: '$ - USD',
           callback_data: 'USD'
         }, {
           text: '₽ - RUB',
           callback_data: 'RUB'
         }, {
           text: '₿ - BTC',
           callback_data: 'BTC'
         }
       ]
     ]
   }
 });
};
});



bot.on('callback_query', query => {
  const id = query.message.chat.id;
  var currency = query.data;
  if(currency === 'EUR') {
	  url = urlEUR;
  } else if(currency === 'USD') {
      url = urlUSD;
  } else {
      url = urlRUB;
  }
  parseModule.parseSite(url, bot, id, currency);
});
