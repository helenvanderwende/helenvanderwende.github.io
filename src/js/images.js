const fg = require("fast-glob");

// Run search for images in /gallery and /sponsors
const digital = fg.sync("**/images/digital/*.jpg");
const drawings = fg.sync("**/images/drawings/*.jpg");
const paintings = fg.sync("**/images/paintings/*.jpg");

module.exports = {
  digital,
  drawings,
  paintings,
};
