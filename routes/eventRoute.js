const express = require("express");

const {} = require("../controllers/eventController");

const router = express.Router();

//routes
router.post("/event", create);
router.get("/event/:slug", read);
router.post("/events", list);
router.get("/events/:count", listAll);
router.get("/events/total", eventsCount);
router.put("/event/:slug", update);
router.delete("/events/:slug", remove);

module.exports = router;
