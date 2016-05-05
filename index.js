export default function ({ types: t }) {
  return {
    visitor: {
      JSXAttribute(path) {
        let { node } = path;
        // Only work on style attributes
        if (!t.isJSXIdentifier(node.name, { name: "style" })) {
          return;
        }

        // Prevent from visiting multiple times
        if (path.getData('_stylistVisited')) return;
        path.setData('_stylistVisited', true);

        // Process the value
        let value = node.value;
        if (t.isStringLiteral(value)) {
            // Strings don't get wrapped
            return;
        } else if (t.isJSXExpressionContainer(value)) {
            // Unwrap JSXExpressionContainer
            value = value.expression;
        }

        if (t.isArrayExpression(value)) {
          // Merge arrays before prefixing
          var helper = this.addHelper("extends");

          var args = value.elements;
          // If the first item isn't an object, add an
          // empty object to the front of the args
          if (!t.isObjectExpression(args[0])) {
            args.unshift(t.objectExpression([]));
          }

          value = t.callExpression(helper, args);
        }

        const wrapper = this.addImport("react-prefixer", "default");

        path.replaceWith(
          t.JSXAttribute(
            node.name,
            t.JSXExpressionContainer(
              t.callExpression(wrapper, [ value ])
            )
          )
        );
      }
    }
  };
}
