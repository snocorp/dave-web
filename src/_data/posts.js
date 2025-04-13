const { client } = require("./utils/sanity");
const { formatBody } = require("./utils/format");

module.exports = async function () {
  const posts = await client.fetch(`*[_type == "post"]{
    title,
    body[]{
      ...,
      asset->{
        ...,
        "_key": _id
      }
    },
    slug
  }`);
  //posts.forEach((p) => p.body.forEach(console.log));
  return posts.map((post) => ({
    ...post,
    body: formatBody(post.body),
  }));
};
