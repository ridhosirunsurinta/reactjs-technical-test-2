if (process.env.NODE_ENV === "production") {
  // This will triggered when npm run build:prod
  module.exports = {
    plugins: {
      autoprefixer: {},
      cssnano: {},
    },
  };
} else {
  module.exports = {
    plugins: {
      autoprefixer: {},
    },
  };
}
