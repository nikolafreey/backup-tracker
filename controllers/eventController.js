const Event = require("../models/eventModel");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const newEvent = await new Event(req.body).save();
    res.json(newEvent);
  } catch (e) {
    res.status(400).send("Create Event failed with Error: " + e.message);
  }
};

exports.listAll = async (req, res) => {
  let events = await Event.find({})
    .limit(+req.params.count || 0)
    .sort([["executionDate", "desc"]])
    .exec();
  res.json(events);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Event.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Event delete failed");
  }
};

exports.read = async (req, res) => {
  let event = await Event.findOne({ slug: req.params.slug }).exec();
  res.json(event);
};

exports.update = async (req, res) => {
  try {
    //updating slug along with the updated title
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Event.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true } //This is required for MongoDB to return newly updated Product in the response instead of the old Product with values before the update
    ).exec();
    res.json(updated);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Event update failed");
  }
};

// Without Pagination
// exports.list = async (req, res) => {
//   try {
//     // sort is createdAt/updatedAt    while order is desc/asc and limit will be a number that limits the number
//     const { sort, order, limit } = req.body;
//     const events = await Event.find({})
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(events);
//   } catch (e) {
//     console.log(e);
//   }
// };

// With Pagination
exports.list = async (req, res) => {
  try {
    // sort is createdAt/updatedAt    while order is desc/asc and limit will be a number that limits the number
    const { sort, order, page, stars } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const events = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(15)
      .exec();
    res.json(events);
  } catch (e) {
    console.log(e);
  }
};

exports.eventsCount = async (req, res) => {
  let total = await Event.find({}).estimatedDocumentCount().exec();
  res.json(total);
};
