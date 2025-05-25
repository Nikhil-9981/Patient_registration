// postcss.config.cjs
module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(),   // ← new PostCSS adapter
    require('autoprefixer')(),
  ],
};
