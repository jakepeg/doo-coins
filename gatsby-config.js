const path = require("path");
module.exports = {
  siteMetadata: {
    title: "DooCoins",
  },
  plugins: ["gatsby-plugin-styled-components"],
  proxy: {
    prefix: "/api",
    url: "http://localhost:8000",
  },
};