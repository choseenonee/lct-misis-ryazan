const path = require('path');

module.exports = {
  // Your webpack configuration settings go here
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      // Other rules for handling different file types
    ],
  },
};