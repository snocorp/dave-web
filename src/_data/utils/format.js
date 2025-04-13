const h = require("hyperscript");
const blocksToHtml = require("@sanity/block-content-to-html");

function formatBody(body) {
  return blocksToHtml({
    blocks: body,
    serializers: {
      types: {
        block: (props) => {
          const style = props.node.style || "normal";

          if (/^h\d/.test(style)) {
            const level = style.replace(/[^\d]/g, "");
            return h(style, { className: `is-size-${level}` }, props.children);
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
  });
}

module.exports = {
  formatBody,
};
