'use strict';

require('gh-pages').publish('./docs/_book', {
  branch: 'gh-pages',
  repo: 'https://github.com/stringparser/mase.git'
}, console.error.bind(console));
