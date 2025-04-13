const { client } = require("./utils/sanity");
const { formatBody } = require("./utils/format");

module.exports = async function () {
  const pages = await client.fetch(`*[_type == "page"]{
    title,
    body[],
    slug
  }`);
  //pages.forEach((p) => p.body.forEach(console.log));
  return pages
    .map((page) => ({
      ...page,
      body: formatBody(page.body),
    }))
    .reduce((acc, curr) => {
      return { ...acc, [curr.slug.current]: curr };
    }, {});
};
