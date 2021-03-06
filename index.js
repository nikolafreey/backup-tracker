const cron = require("node-cron");
const express = require("express");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const mongoose = require("mongoose");
const winston = require("winston"); //Logging Enterprise base with multiple Sinks
const { readdirSync } = require("fs");
require("dotenv").config();
require("winston-mongodb");

const logConfiguration = {
  transports: [
    new winston.transports.Console({
      level: "info",
      colorize: true,
    }),
    new winston.transports.File({
      level: "info",
      // Create the log directory if it does not exist
      filename: "logs/example.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.label({
      label: `Label🏷️`,
    }),
    winston.format.align(),
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
    )
  ),
};

const logger = winston.createLogger(logConfiguration);

const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => console.log("DB Connection Error: ", err.message));

app.use(helmet());

// Create mail transporter.
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nikolav54@gmail.com",
    pass: "nmtwxbrirmbqirbr",
  },
});

let messageOptionsSVN = (props = {
  from: "it_admin@payspot.co.rs",
  to: "it_admin@payspot.co.rs",
  subject: "Podsjetnik za Backup SVN-a",
  text: "Podsjetnik za Backup SVN-a",
});

let messageOptionsAsterisk = (props = {
  from: "it_admin@payspot.co.rs",
  to: "nikola.vukovic@payspot.co.rs",
  subject: "Podsjetnik za Backup SVN-a",
  text: "Podsjetnik za Backup SVN-a",
});

//   * * * * * *
//   | | | | | |
//   | | | | | day of week
//   | | | | month
//   | | | day of month
//   | | hour
//   | minute
//   second ( optional )

cron.schedule("0 12 1 * *", () => {
  console.log("-----------------------------");
  console.log("Pokretanje CRON-a Svakog Prvog u Mjesecu(Asterisk)");
  logger.info("Winston: Pokretanje CRON-a Svakog Prvog u Mjesecu(Asterisk)");

  transporter.sendMail(messageOptionsAsterisk, (error, info) => {
    if (error) {
      return res.status(500).send({
        data: {
          status: 500,
          message: error.toString(),
        },
      });
    }
  });
});

cron.schedule("0 0 * * 1", () => {
  console.log("-----------------------------");
  console.log("Pokretanje CRON-a za svaki Ponedeljak(SVN)");
  logger.info("Winston: Pokretanje CRON-a za svaki Ponedeljak(SVN)");

  transporter.sendMail(messageOptionsSVN, (error, info) => {
    if (error) {
      return res.status(500).send({
        data: {
          status: 500,
          message: error.toString(),
        },
      });
    }
  });
});

const cronJobsToRun = [
  {
    name: "Job 1",
    cron: "*/5 * * * *",
    consoleLogText: () => {
      console.log("CRON RAN IN JOB 1" + new Date().toLocaleString());
      logger.info(
        "Winston: " + "CRON RAN IN JOB 1" + new Date().toLocaleString()
      );
    },
  },
  {
    name: "Job 2",
    cron: "*/10 * * * *",
    consoleLogText: () => {
      console.log("CRON RAN IN JOB 2" + new Date().toLocaleString());
      logger.info(
        "Winston: " + "CRON RAN IN JOB 2" + new Date().toLocaleString()
      );
    },
  },
  {
    name: "Job 3",
    cron: "*/15 * * * *",
    consoleLogText: () => {
      console.log("CRON RAN IN JOB 3" + new Date().toLocaleString());
      logger.info(
        "Winston: " + "CRON RAN IN JOB 3" + new Date().toLocaleString()
      );
    },
  },
];

cron.schedule("*/3 * * * *", () => {
  console.log("-----------------------------");
  console.log("Pokretanje CRON-a za TESTIRANJE" + new Date().toLocaleString());

  cronJobsToRun.map((job) => {
    cron.schedule(job.cron, () => {
      job.consoleLogText.call();
    });
  });
});

// All in One
cronJobsToRun
  .map((job) => job.name.replace(/ +/g, ""))
  .forEach((name) => eval(name + " = " + undefined)); //Kako pravimo varijablu iz niza stringova i inicijalizujemo je na undefined

cron.schedule("*/3 * * * *", () => {
  console.log("RUN WHOLE GENERATED" + new Date().toLocaleString());
  logger.info("Winston: " + "CRON RAN IN JOB 2" + new Date().toLocaleString());
  if (cronNames[0]) eval(varString + " = " + newValue).stop();
});

//Routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(process.env.PORT || 4000, () => {
  console.log("App is listening on port " + process.env.PORT || 4000);
  logger.info(
    "App is listening on port " + process.env.PORT ||
      4000 + new Date().toLocaleString()
  );
});
