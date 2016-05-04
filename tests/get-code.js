import { transform } from 'babel-core';

export default function getCode(code) {
  return transform(code, {
    plugins: ['react-stylist'],
    presets: ['stage-0', 'react'],
  }).code;
}
