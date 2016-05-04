import getCode from './get-code';
import test from 'tape';

const CODE_STRING = '<div style="anything" />';
test(CODE_STRING, t => {
  const code = getCode(CODE_STRING);
  console.log(code);
  t.ok(code.indexOf('style: "anything"') !== -1);
  t.end();
});

