module.exports = {
    // Other webpack configuration...
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'], // Add postcss-loader
        },
      ],
    },
    plugins: [
      require('postcss-rtl')(), // Enable RTLCSS
      require('autoprefixer'), // Optional: Add vendor prefixes
    ],
  };
  