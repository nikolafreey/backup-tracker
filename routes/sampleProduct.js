const express = require("express");

const {
  create,
  listAll,
  list,
  remove,
  read,
  update,
  productsCount,
  listRelated,
  searchFilters,
} = require("../controllers/sampleProduct");

const router = express.Router();

//routes
router.post("/product", create);
router.get("/products/total", productsCount);
router.put("/product/:slug", update);
router.get("/products/:count", listAll);
router.delete("/products/:slug", remove);
router.get("/product/:slug", read);
router.get("/product/related/:productId", listRelated);

router.post("/products", list);
router.post("/products/filters", searchFilters);

module.exports = router;
