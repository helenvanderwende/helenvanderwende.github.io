const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const gallery = require("./src/js/gallery");
const images = require("./src/js/images");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Passthrough files
  eleventyConfig.addPassthroughCopy({ "src/public": "/public" });

  // Collections
  eleventyConfig.addCollection("images", function (_collection) {
    return images;
  });

  // Shortcodes
  eleventyConfig.addPairedShortcode("gallery", gallery.shortcode);
  eleventyConfig.addShortcode("galleryImage", gallery.imageShortcode);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
