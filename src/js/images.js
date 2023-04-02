const fg = require("fast-glob");

// Run search for images in /gallery and /sponsors
const digital = fg.sync("**/images/digital/*");
const drawings = fg.sync("**/images/drawings/*");
const paintings = fg.sync("**/images/paintings/*");

module.exports = {
  digital,
  drawings,
  paintings,
};
