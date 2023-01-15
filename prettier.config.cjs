/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
};
