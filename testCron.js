const cron = require("node-cron");

const cronJobsToRun = [
  {
    name: "Job 1",
    cron: "* * * * *",
    active: true,
    consoleLogText: () => {
      console.log("CRON RAN IN JOB 1" + new Date().toLocaleString());
      logger.info(
        "Winston: " + "CRON RAN IN JOB 1" + new Date().toLocaleString()
      );
    },
  },
  {
    name: "Job 2",
    cron: "*/2 * * * *",
    active: true,
    consoleLogText: () => {
      console.log("CRON RAN IN JOB 2" + new Date().toLocaleString());
      logger.info(
        "Winston: " + "CRON RAN IN JOB 2" + new Date().toLocaleString()
      );
    },
  },
  {
    name: "Job 3",
    cron: "*/3 * * * *",
    active: false,
    consoleLogText: () => {
      console.log("CRON RAN IN JOB 3" + new Date().toLocaleString());
      logger.info(
        "Winston: " + "CRON RAN IN JOB 3" + new Date().toLocaleString()
      );
    },
  },
];

let cronNames = cronJobsToRun.map((job) => job.name.replace(/ +/g, ""));
cronNames.forEach((name) => (global[name] = undefined));

// All in One
cronJobsToRun
  .map((job) => job.name.replace(/ +/g, ""))
  .forEach((name) => (global[name] = undefined)); //Kako pravimo varijablu iz niza stringova i inicijalizujemo je na undefined

// global[cronNames[index]]; // Kako pristupamo varijabli

cron.schedule("* * * * *", () => {
  console.log("RUN WHOLE GENERATED " + new Date().toLocaleString());
  cronJobsToRun.forEach((job, index) => {
    if (global[cronNames[index]]) {
      global[cronNames[index]].stop();
    }

    if (job.active) {
      global[cronNames[index]] = cron.schedule(job.cron, () => {
        job.consoleLogText.call();
      });
    }
  });
});
