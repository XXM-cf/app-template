// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-pxtorem": {
      rootValue: 20,
      propList: ['*']
    },
    "postcss-theme-variables": {
      vars: {
        red: '#F60',
        gray: '#CCC',
        blue: '#03A9F4'
      },
      prefix: '$'
    }
  }
}
