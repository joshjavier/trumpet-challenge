import path from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

const format = (filenames) =>
  `prettier --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

const formatAll = (filenames) =>
  `prettier --write --ignore-unknown ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

/** @type {import('lint-staged').Configuration} */
const config = {
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': [buildEslintCommand, format],
  '!(*.{js,mjs,cjs,jsx,ts,mts,cts,tsx})': [formatAll],
};

export default config;
