module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  proseWrap: 'never',
  endOfLine: 'lf',
  plugins: [
    require('prettier-plugin-packagejson'),
    require('prettier-plugin-tailwindcss'),
  ],
};
