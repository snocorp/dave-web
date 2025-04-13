const sanity = require("@sanity/client");

const client = sanity.createClient({
  projectId: "gjs6ssl8",
  dataset: "production",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2025-02-06",
});

module.exports = {
  client,
};
