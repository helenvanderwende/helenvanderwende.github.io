// Import fast-glob package
const fg = require("fast-glob");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// Run search for images in /gallery and /sponsors
const digitalImages = fg.sync(["src/assets/digital/*", "!**/_site"]);
const drawingImages = fg.sync(["src/assets/drawings/*", "!**/_site"]);
const paintingImages = fg.sync(["src/assets/paintings/*", "!**/_site"]);

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "/assets" });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addCollection("digitalImages", function (collection) {
    return digitalImages.map((image) => {
      return {
        url: "/" + image.split("/").slice(1).join("/"),
        alt: image.split("/").pop(),
      };
    });
  });

  eleventyConfig.addCollection("drawingImages", function (collection) {
    return drawingImages.map((image) => {
      return {
        url: "/" + image.split("/").slice(1).join("/"),
        alt: image.split("/").pop(),
      };
    });
  });

  eleventyConfig.addCollection("paintingImages", function (collection) {
    return paintingImages.map((image) => {
      return {
        url: "/" + image.split("/").slice(1).join("/"),
        alt: image.split("/").pop(),
      };
    });
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
