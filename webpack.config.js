const path = require('path');

module.exports = {
  entry: './src/syncfusion/users/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src', 'public', 'js', 'syncfusion'),
  },
  watch: true,
};
