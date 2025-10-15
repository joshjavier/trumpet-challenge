/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  singleQuote: true,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '',
    '^react$',
    '^next$',
    '^next/.*$',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^@/.*$',
    '^(?!.*[.]css$)[./].*$',
    '[.]css$',
  ],
  importOrderTypeScriptVersion: '5.0.0',
  tailwindStylesheet: './app/globals.css',
  tailwindFunctions: ['cn'],
};

export default config;
