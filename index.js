// https://pomb.us/build-your-own-react/
// これやる

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  element.props.children.forEach((child) => render(child, dom));

  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  container.appendChild(dom);
}

const MiniReact = {
  createElement,
  render,
};

const element = MiniReact.createElement(
  "div",
  { id: "foo" },
  MiniReact.createElement("a", null, "bar"),
  MiniReact.createElement("b")
);

/** @jsx √.createElement */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// );

const container = document.getElementById("root");
MiniReact.render(element, container);
