const eleventySass = require("eleventy-sass");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/scripts/*.js");
  eleventyConfig.addPassthroughCopy("src/images/*.png");

  eleventyConfig.addPlugin(eleventySass);

  return { dir: { input: "src", output: "dist" } };
};
