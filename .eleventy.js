module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });

  // Watch CSS for changes (Tailwind builds it separately)
  eleventyConfig.addWatchTarget("./src/assets/css/");

  // Date formatting filter (e.g., "Nov 8, 2022")
  eleventyConfig.addFilter("formatDate", (date) => {
    return new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  });

  // ISO date filter for datetime attribute
  eleventyConfig.addFilter("isoDate", (date) => {
    return new Date(date).toISOString();
  });

  // Filter for published posts (not draft, date in past)
  eleventyConfig.addFilter("published", (posts) => {
    return posts.filter(post => {
      return !post.data.draft && new Date(post.data.publishDate) <= new Date();
    });
  });

  // Sort by date (newest first)
  eleventyConfig.addFilter("sortByDate", (posts) => {
    return [...posts].sort((a, b) => {
      return new Date(b.data.publishDate) - new Date(a.data.publishDate);
    });
  });

  // Sort by last name (alphabetical)
  eleventyConfig.addFilter("sortByLastName", (members) => {
    return [...members].sort((a, b) => {
      const lastA = a.data.name.split(" ").pop().toLowerCase();
      const lastB = b.data.name.split(" ").pop().toLowerCase();
      return lastA.localeCompare(lastB);
    });
  });

  // Blog collection
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md");
  });

  // Team collection
  eleventyConfig.addCollection("team", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/team/*.md");
  });

  // Return the first N items of an array
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array)) return [];
    return array.slice(0, n);
  });

  // Get current year for copyright
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
