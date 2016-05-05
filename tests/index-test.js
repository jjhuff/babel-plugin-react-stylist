import getCode from './get-code';
import test from 'tape';

const CODE_STRING = '<div style="anything" foo="bar"/>';
test(CODE_STRING, t => {
  const code = getCode(CODE_STRING);
  // Shouldn't be wrapped
  t.ok(code.indexOf('style: "anything"') !== -1);
  t.end();
});

const CODE = [
  // inline style
  '<div style={{alignItems: "center", display: "flex", width: 100}} />',

  // variable outside
  `const style={alignItems: "center", display: "flex", width: 100};
  <div style={style} />`,

  // variable outside, key in object
  `const style={stuff: {alignItems: "center", display: "flex", width: 100}};
  <div style={style.stuff} />`,

  // object shorthand
  `const display = "flex";
  const style={alignItems: "center", display, width: 100};
  <div style={style} />`,

  // object spread
  `const style={alignItems: "center", display: "flex"};
  const finalStyle={...style, width: 100};
  <div style={finalStyle} />`,

  // array
  `const styleA={alignItems: "center", display: "flex"};
  const styleB={width: 100};
  <div style={[styleA, styleB]} />`,

  // array w/ objects
  `const styleA={alignItems: "center", display: "flex"};
  <div style={[{width: 100}, styleA]} />`,

  // _default in use
  `const _default=1;
  <div style={{alignItems: "center", display: "flex", width: 100}} />`,

];

CODE.forEach(src => {
  test(src, t => {
    const code = getCode(src);
    console.log(code);
    console.log("------------");
    t.ok(code.match(/import [^\s]* from "react-prefixer";/), "import");
    t.ok(code.match(/style: [^\(]*\(/), "wrapper");
    t.end();
  })
});
