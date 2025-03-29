const h = require("hyperscript");
const blocksToHtml = require("@sanity/block-content-to-html");
const sanity = require("@sanity/client");

const client = sanity.createClient({
  projectId: "gjs6ssl8",
  dataset: "production",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2025-02-06",
});

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
    body: blocksToHtml({
      blocks: post.body,
      serializers: {
        types: {
          block: (props) => {
            const style = props.node.style || "normal";

            if (/^h\d/.test(style)) {
              const level = style.replace(/[^\d]/g, "");
              return h(
                style,
                { className: `is-size-${level}` },
                props.children
              );
            }

            return h("p", { className: "block" }, props.children);
          },
          code: (props) =>
            h(
              "pre",
              { className: `${props.node.language} block` },
              h("code", props.node.code)
            ),
        },
      },
    }),
  }));
};
