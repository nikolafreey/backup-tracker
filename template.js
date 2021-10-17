const cron = require("node-cron");
var a;
var b;
var hr;
var min;
var sec;
cron.schedule("*/3 * * * *", function () {
  console.log("RUN WHOLE " + new Date().toLocaleString());
  min = 30;
  hr = 8;
  sec = "0" + " " + min + " " + hr + " " + "* * *";
  if (a) {
    a.stop();
  }
  a = cron.schedule("*/2 * * * *", function () {
    console.log("RUN A " + new Date().toLocaleString());
  });
  min = 30;
  hr = 16;
  sec = "0" + " " + min + " " + hr + " " + "* * *";
  if (b) {
    b.stop();
  }
  b = cron.schedule("*/2 * * * *", function () {
    console.log("RUN B " + new Date().toLocaleString());
  });
});
