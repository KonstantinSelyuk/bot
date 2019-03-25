var needle = require("needle");
var cheerio = require("cheerio");

var parseSite = function(url, bot, id, currency) {
  needle.get(url, function(err, res) {
    if (err) throw err;
    var $ = cheerio.load(res.body);
    var rows = $("tr");
    var result = []; // out result array
    rows.each(function(j, cell) {
      var isExpired = $(cell).attr("class");
      if (!isExpired && $(cell).attr("data-amount")) {
        var count = $(cell).attr("data-amount");
        var ratio = $(cell).attr("data-ratio");
        var time = $(cell).find("time").text().trim();
        var v = "🕒" + time + "  💱" + (ratio * 1).toFixed(2) + "  💰" + count.slice(0, -2);
        result.push(v);
      }
    });

    result.sort;
    result.slice(0, 10);

    function valute(val) {
      switch (val) {
        case val:
          "USD";
          val = "🇺🇸";
          break;
        case val:
          "EUR";
          val = "🇪🇺";
          break;
        case val:
          "RUR";
          val = "🇷🇺";
          break;
      }
      return val;
    }

    if (currency.length === 4) {
      var resultString =
        "Курс продажи 🇺🇦 ➜ " + valute(currency.slice(0, -1)) +
        "\n\n" + result.join("\n");
    } else {
      var resultString = "Курс покупки " + valute(currency) +" ➜ 🇺🇦" +
        "\n\n" + result.join("\n");
    }
    if (result.length === 0) {
      resultString = "Сейчас нет данных для: " + currency;
    }
    bot.sendMessage(id, resultString);
  });
};

module.exports.parseSite = parseSite;
