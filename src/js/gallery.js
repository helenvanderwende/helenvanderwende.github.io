const sharp = require("sharp");
const Image = require("@11ty/eleventy-img");

const GALLERY_IMAGE_WIDTH = 350;
const LANDSCAPE_LIGHTBOX_IMAGE_WIDTH = 2000;
const PORTRAIT_LIGHTBOX_IMAGE_WIDTH = 720;

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

async function galleryImageShortcode(src) {
  const alt = src.split("/").pop();
  const metadata = await sharp(src).metadata();

  let lightboxImageWidth = LANDSCAPE_LIGHTBOX_IMAGE_WIDTH;
  if (metadata.height > metadata.width) {
    lightboxImageWidth = PORTRAIT_LIGHTBOX_IMAGE_WIDTH;
  }
  if (metadata.width < lightboxImageWidth) {
    lightboxImageWidth = metadata.width;
  }

  const options = {
    formats: ["jpeg"],
    widths: [GALLERY_IMAGE_WIDTH, lightboxImageWidth],
    urlPath: "/public/images/",
    outputDir: "./dist/public/images",
  };

  const genMetadata = await Image(src, options);
  return `
        <a
          href="${genMetadata.jpeg[1].url}"
          data-pswp-width="${genMetadata.jpeg[1].width}"
          data-pswp-height="${genMetadata.jpeg[1].height}"
          target="_blank"
          >
            <img src="${genMetadata.jpeg[0].url}" alt="${alt}" class="aspect-square object-cover" />
        </a>
    `.replace(/(\r\n|\n|\r)/gm, "");
}

module.exports = {
  shortcode: galleryShortcode,
  imageShortcode: galleryImageShortcode,
};
