const parseModule = require("./parse");
const needle = require("needle");
const cheerio = require("cheerio");

var urlUSD = "https://finance.i.ua/market/kiev/usd/?type=1";
var urlEUR = "https://finance.i.ua/market/kiev/eur/?type=1";
var urlRUB = "https://finance.i.ua/market/kiev/rub/?type=1";
var urlUSDb = "https://finance.i.ua/market/kiev/usd/?type=2";
var urlEURb = "https://finance.i.ua/market/kiev/eur/?type=2";
var urlRUBb = "https://finance.i.ua/market/kiev/rub/?type=2";

const TelegramBot = require("node-telegram-bot-api");
const token = "778380485:AAG2l0PSSdWpeXKWJ2rrppcEVU9Fp5BslQc";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/curse/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Выберите какой курс вас интересует", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Покупка - ↓",
            callback_data: "S"
          },
          {
            text: "Продажа - ↑",
            callback_data: "B"
          }
        ]
      ]
    }
  });

  bot.on("callback_query", query => {
    const id = query.message.chat.id;
    if (query.data === "S") {
      bot.sendMessage(id, "Выберите валюту", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "€ - EUR",
                callback_data: "EUR"
              },
              {
                text: "$ - USD",
                callback_data: "USD"
              },
              {
                text: "₽ - RUB",
                callback_data: "RUB"
              }
            ]
          ]
        }
      });
    } else if (query.data === "B") {
      bot.sendMessage(id, "Выберите валюту", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "€ - EUR",
                callback_data: "EURb"
              },
              {
                text: "$ - USD",
                callback_data: "USDb"
              },
              {
                text: "₽ - RUB",
                callback_data: "RUBb"
              }
            ]
          ]
        }
      });
    }
    query.data = "";
  });
});

bot.on("callback_query", query => {
  const id = query.message.chat.id;
  var currency = query.data;
  if (currency.length >= 2) {
    switch (currency) {
      case "EUR":
        url = urlEUR;
        break;
      case "USD":
        url = urlUSD;
        break;
      case "RUB":
        url = urlRUB;
        break;
      case "USDb":
        url = urlUSDb;
        break;
      case "EURb":
        url = urlEURb;
        break;
      case "RUBb":
        url = urlRUBb;
        break;
    }
    parseModule.parseSite(url, bot, id, currency);
  }
});
