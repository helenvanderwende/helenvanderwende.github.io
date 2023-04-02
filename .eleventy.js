// Import fast-glob package
const fg = require("fast-glob");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const sharp = require("sharp");
const Image = require("@11ty/eleventy-img");

const GALLERY_IMAGE_WIDTH = 350;

function galleryShortcode(content, name) {
  return `
        <div>
            <div class="gallery grid min-[380px]:grid-cols-2 sm:grid-cols-3 gap-5" id="gallery-${name}">
                ${content}
            </div>
            <script type="module">
                import PhotoSwipeLightbox from '/js/photoswipe-lightbox.esm.js';
                const lightbox = new PhotoSwipeLightbox({
                gallery: '#gallery-${name}',
                  children: 'a',
                  pswpModule: () => import('/js/photoswipe.esm.js'),
                  preload: [1, 1]
                });
                lightbox.init();
            </script>
        </div>
    `.replace(/(\r\n|\n|\r)/gm, "");
}

async function galleryImageShortcode(src, alt) {
  const metadata = await sharp(src).metadata();

  const options = {
    formats: ["jpeg"],
    widths: [GALLERY_IMAGE_WIDTH],
    urlPath: "/assets/gen/",
    outputDir: "./dist/assets/gen/",
  };

  const genMetadata = await Image(src, options);

  const url = "/" + src.split("/").slice(1).join("/");
  return `
        <a
          href="${url}"
          data-pswp-width="${metadata.width}"
          data-pswp-height="${metadata.height}"
          target="_blank"
          >
            <img src="${genMetadata.jpeg[0].url}" alt="${alt}" class="aspect-square object-cover" />
        </a>
    `.replace(/(\r\n|\n|\r)/gm, "");
}
// Run search for images in /gallery and /sponsors
const digitalImages = fg.sync(["src/assets/digital/*", "!**/_site"]);
const drawingImages = fg.sync(["src/assets/drawings/*", "!**/_site"]);
const paintingImages = fg.sync(["src/assets/paintings/*", "!**/_site"]);

module.exports = function (eleventyConfig) {
  eleventyConfig.addPairedShortcode("gallery", galleryShortcode);
  eleventyConfig.addShortcode("galleryImage", galleryImageShortcode);

  eleventyConfig.addPassthroughCopy({ "src/assets": "/assets" });
  eleventyConfig.addPassthroughCopy({ "src/styles/photoswipe.css": "/assets" });

  eleventyConfig.addPassthroughCopy({ "src/js": "/js" });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addCollection("digitalImages", function (collection) {
    return digitalImages.map((image) => {
      return {
        url: image,
        alt: image.split("/").pop(),
      };
    });
  });

  eleventyConfig.addCollection("drawingImages", function (collection) {
    return drawingImages.map((image) => {
      return {
        url: image,
        alt: image.split("/").pop(),
      };
    });
  });

  eleventyConfig.addCollection("paintingImages", function (collection) {
    return paintingImages.map((image) => {
      return {
        url: image,
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
