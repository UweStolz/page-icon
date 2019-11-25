#!/usr/bin/env node

const pageIcon = require('../src/index.js');

const args = process.argv.slice(2, 4);

const pageUrl = args[0];
const extension = args[1];

pageIcon.default(pageUrl, extension);