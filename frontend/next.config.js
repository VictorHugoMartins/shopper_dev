const withImages = require('next-images')

module.exports = withTM({
  ...withImages(),
  images: {
    domains: [],
    disableStaticImages: true
  },
  trailingSlash: true,
  future: {
    webpack5: true
  }
});