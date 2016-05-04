
const isStyle = node => node.name.name === 'style';

export default function ({ types: t }) {

  function wrapStyle(path) {
    //path.replaceWith(path);
    console.log(path);
  }

  return {
    visitor: {
      JSXAttribute(path) {
        if (isStyle(path.node)) {
          wrapStyle(path.get('value.expression'));
        }
      }
    }
  };
}
